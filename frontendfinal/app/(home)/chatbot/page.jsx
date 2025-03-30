"use client"
import React, { useState } from 'react';
import axios from 'axios';
import { useUser } from '@clerk/nextjs';

const RAGApplication = () => {
  const [files, setFiles] = useState([]);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();
  const username = user ? user.username : 'Guest'

  const handleFileUpload = (e) => {
    const newFiles = Array.from(e.target.files);
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const removeFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || files.length === 0) return;
    
    // Add user message to chat
    const userMessage = { sender: 'user', content: inputValue };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    
    // Simulate AI response
    setIsLoading(true);
    
    // In a real app, you would send the query to your backend here
    setTimeout(() => {
      const botMessage = { 
        sender: 'bot', 
        content: `I've analyzed your documents and found information related to: "${inputValue}"`,
        sources: [{ fileName: files[0].name, relevance: 'high' }]
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setIsLoading(false);
    }, 1500);
    
    // const sendQuery = async (inputValue, user = username, files) => {
    //   try {
    //     const response = await axios.post('http://localhost:8003/', {
    //       query: inputValue,
    //       user: user
    //     }, {
    //       headers: {
    //         'Content-Type': 'application/json'
    //       }
    //     });

    //     const botMessage = { 
    //       sender: 'bot', 
    //       content: `I've analyzed your documents and found information related to: "${inputValue}"`,
    //       sources: [{ fileName: files?.[0]?.name || 'unknown', relevance: 'high' }]
    //     };

    //     return botMessage;

    //   } catch (error) {
    //     console.error('Error sending query:', error);
    //     return { sender: 'bot', content: 'An error occurred while processing your request.' };
    //   }
    // };
    
    setInputValue('');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md p-4 flex flex-col">
        <h2 className="text-xl font-bold mb-4">Documents</h2>
        
        {/* File Upload Button */}
        <label className="mb-4 flex items-center justify-center p-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600">
          <span>Upload Files</span>
          <input 
            type="file" 
            multiple 
            onChange={handleFileUpload} 
            className="hidden" 
          />
        </label>
        
        {/* File List */}
        <div className="flex-1 overflow-y-auto">
          {files.length === 0 ? (
            <p className="text-gray-500 text-sm text-center">No files uploaded yet</p>
          ) : (
            <ul className="space-y-2">
              {files.map((file, index) => (
                <li key={index} className="p-2 bg-gray-100 rounded flex justify-between items-center">
                  <span className="text-sm truncate">{file.name}</span>
                  <button 
                    onClick={() => removeFile(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Chat Area */}
        <div className="flex-1 p-4 overflow-y-auto">
          {messages.length === 0 ? (
            <div className="h-screen flex items-center justify-center">
              <div className="text-center text-gray-500">
                <h2 className="text-xl font-bold mb-2">Document Q&A</h2>
                <p>Upload documents and ask questions about their content</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div 
                  key={index}
                  className={`p-3 rounded-lg ${
                    message.sender === 'user' 
                      ? 'bg-blue-500 text-white ml-12' 
                      : 'bg-gray-200 mr-12'
                  }`}
                >
                  <p>{message.content}</p>
                  {message.sources && (
                    <div className="mt-2 pt-2 border-t border-gray-300 text-sm">
                      <p className="font-semibold">Sources:</p>
                      {message.sources.map((source, idx) => (
                        <p key={idx} className="text-xs">
                          {source.fileName} (Relevance: {source.relevance})
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="bg-gray-200 p-3 rounded-lg mr-12 animate-pulse">
                  Thinking...
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Input Area */}
        <div className="p-4 border-t">
          <div className="flex space-x-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask a question about your documents..."
              className="flex-1 p-2 border rounded"
              disabled={files.length === 0}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || files.length === 0 || isLoading}
              className={`px-4 py-2 rounded ${
                !inputValue.trim() || files.length === 0 || isLoading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
            >
              Send
            </button>
          </div>
          {files.length === 0 && (
            <p className="text-sm text-red-500 mt-1">
              Please upload at least one document first
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
export default RAGApplication