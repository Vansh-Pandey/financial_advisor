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
  const username = user ? user.username : 'Guest';

  const handleFileUpload = async (e) => {
    const newFiles = Array.from(e.target.files);
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);

    const formData = new FormData();
    newFiles.forEach((file) => {
      formData.append('files', file);
    });

    try {
      const response = await axios.post('http://localhost:8000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Files uploaded successfully:', response.data);
    } catch (error) {
      console.error('Error uploading files:', error);
    }
  };

  const removeFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const messageHandler = async () => {
    if (!inputValue.trim() || files.length === 0) return;
    const botMessage = "Based on the information provided, you have spent 250 dollars on Starbucks using your credit card and received 115 dollars from your parents. This means you currently have 115 dollars in your account. \n\nConsidering that buying a coffee at Starbucks typically costs around 5 dollars, it is advisable not to buy.";
    setIsLoading(true);
    
    console.log("This function is working fine");
    const userMessage = { sender: 'user', content: inputValue };
    setMessages(prevMessages => [...prevMessages, userMessage, botMessage]);

    setIsLoading(false);
  
  };
  

  const handleSendMessage = async () => {
    console.log("function callled")
    if (!inputValue.trim() || files.length === 0) return;

    const userMessage = { sender: 'user', content: inputValue };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:8000/send_prompt', {
        query: inputValue,
        user: username
      });
      console.log(inputValue, username)

      const botMessage = {
        sender: 'bot',
        content: response.data.response,
        sources: response.data.sources || [],
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error sending query:', error);
      const errorMessage = { sender: 'bot', content: 'An error occurred while processing your request.' };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }

    setIsLoading(false);
    setInputValue('');
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-full lg:w-72 bg-blue-900 text-black p-6 shadow-lg">
        <h2 className="text-xl text-white font-bold mb-6">Documents</h2>
        <label className="mb-4 flex items-center justify-center p-3 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 text-white rounded cursor-pointer hover:bg-gradient-to-l">
          <span>Upload Files</span>
          <input type="file" multiple onChange={handleFileUpload} className="hidden" />
        </label>
        <div className="flex-1 overflow-y-auto">
          {files.length === 0 ? (
            <p className="text-white text-sm text-center">No files uploaded yet</p>
          ) : (
            <ul className="space-y-2">
              {files.map((file, index) => (
                <li key={index} className="p-2 bg-gray-100 rounded flex justify-between items-center">
                  <span className="text-sm truncate">{file.name}</span>
                  <button onClick={() => removeFile(index)} className="text-red-400 hover:text-red-600">×</button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 p-6 overflow-y-auto">
          {messages.length === 0 ? (
            <div className="h-screen flex items-center justify-center">
              <div className="text-center text-gray-500">
                <h2 className="text-2xl font-bold mb-2">Document Q&A</h2>
                <p>Upload documents and ask questions about their content</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div key={index} className={`p-3 rounded-lg ${message.sender === 'user' ? 'bg-gradient-to-r from-blue-500 to-blue-700 text-white ml-12' : 'bg-gray-200 mr-12'}`}>
                  <p>{message.content}</p>
                  {/* {message.sources && (
                    <div className="mt-2 pt-2 border-t border-gray-300 text-sm">
                      <p className="font-semibold">Sources:</p>
                      {message.sources.map((source, idx) => (
                        <p key={idx} className="text-xs">{source.fileName} (Relevance: {source.relevance})</p>
                      ))}
                    </div>
                  )} */}
                </div>
              ))}
              {isLoading && (
                <div className="bg-gray-200 p-3 rounded-lg mr-12 animate-pulse">Thinking...</div>
              )}
            </div>
          )}
        </div>

        {/* Input and Send Button */}
        <div className="p-6 border-t bg-white">
          <div className="flex space-x-3">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask a question about your documents..."
              className="flex-1 text-black p-3 border rounded-lg shadow-sm"
              disabled={files.length === 0}
            />
            <button
              onClick={messageHandler}
              disabled={!inputValue.trim() || files.length === 0 || isLoading}
              className={`px-5 py-3 rounded-lg ${!inputValue.trim() || files.length === 0 || isLoading ? 'bg-gray-300 cursor-not-allowed' : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white'}`}
            >
              Send
            </button>
          </div>
          {files.length === 0 && (
            <p className="text-sm text-red-500 mt-2">Please upload at least one document first</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RAGApplication;