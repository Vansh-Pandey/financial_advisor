import { useState } from 'react';
import { FiTrendingUp, FiDollarSign, FiPieChart, FiClock, FiGlobe, FiPlus, FiMessageSquare, FiUpload } from 'react-icons/fi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Home = () => {
  // State for all data
    // State for tabs
    const [activeTab, setActiveTab] = useState('dashboard'); // Initialize with default tab
    
    // State for file uploads
    const [isUploading, setIsUploading] = useState(false);
    const [files, setFiles] = useState([]);
  
    // Other existing states...
    const [transactions, setTransactions] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [formData, setFormData] = useState({
      action: 'Bought',
      asset: '',
      amount: '',
      value: ''
    });
    const [questionInput, setQuestionInput] = useState('');
    
    // Rest of your code...
  
  const [selectedFile, setSelectedFile] = useState(null);
  // Sample market data (would be API fetched in real app)
  const [marketData, setMarketData] = useState({
    sp500: { value: '4,567.23', change: '+23.45 (0.52%)', isPositive: true },
    nasdaq: { value: '14,210.67', change: '+45.32 (0.32%)', isPositive: true },
    dowjones: { value: '34,567.89', change: '-123.45 (0.36%)', isPositive: false }
  });

  // Sample portfolio data
  const portfolio = {
    value: '125,430.87',
    dailyChange: '+1,245.32 (1.12%)',
    isPositive: true,
    investments: [
      { name: 'Stocks', value: '$85,430', change: '+2.3%', isPositive: true },
      { name: 'Cash', value: '$12,450', change: '+0.5%', isPositive: true },
      { name: 'Retirement', value: '$27,550', change: '-0.8%', isPositive: false }
    ]
  };

  // Handle form submissions
  const handleTransactionSubmit = (e) => {
    e.preventDefault();
    const newTransaction = {
      id: Date.now(),
      ...formData,
      date: new Date().toLocaleString()
    };
    setTransactions([newTransaction, ...transactions]);
    setFormData({ action: 'Bought', asset: '', amount: '', value: '' });
    toast.success('Transaction added successfully!');
  };

  const handleQuestionSubmit = (e) => {
    e.preventDefault();
    const newQuestion = {
      id: Date.now(),
      question: questionInput,
      answer: '',
      date: new Date().toLocaleString()
    };
    setQuestions([newQuestion, ...questions]);
    setQuestionInput('');
    alert('Question submitted to advisor!');
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    
    if (!selectedFile) {
      toast.error("Please select a file first");
      return;
    }
  
    setIsUploading(true);
    
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
  
      const response = await fetch("http://localhost:8000/upload", {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || "Server error");
      }
  
      const result = await response.json();
      
      // Add the uploaded file to the files state
      const newFile = {
        id: Date.now(),
        name: selectedFile.name,
        type: selectedFile.name.split('.').pop(),
        size: (selectedFile.size / 1024).toFixed(2) + ' KB',
        date: new Date().toLocaleString(),
        path: result.saved_path
      };
      
      setFiles([newFile, ...files]);
      toast.success(`File saved to:\n${result.saved_path}`);
      
    } catch (error) {
      toast.error(`Upload failed: ${error.message}`);
      console.error("Upload error:", error);
    } finally {
      setIsUploading(false);
      setSelectedFile(null);
    }
  };  

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">FinancialPulse</h1>
          <div className="text-right">
            <p>{new Date().toLocaleDateString()}</p>
            <p className="text-sm">{new Date().toLocaleTimeString()}</p>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto flex">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`px-4 py-3 font-medium ${activeTab === 'dashboard' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
          >
            Dashboard
          </button>
          <button 
            onClick={() => setActiveTab('transactions')}
            className={`px-4 py-3 font-medium ${activeTab === 'transactions' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
          >
            Transactions
          </button>
          <button 
            onClick={() => setActiveTab('questions')}
            className={`px-4 py-3 font-medium ${activeTab === 'questions' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
          >
            Questions
          </button>
          <button 
            onClick={() => setActiveTab('documents')}
            className={`px-4 py-3 font-medium ${activeTab === 'documents' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
          >
            Documents
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto p-4">
        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Portfolio Summary */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Portfolio Summary</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="col-span-2">
                  <h3 className="text-gray-500 text-sm">TOTAL VALUE</h3>
                  <p className="text-3xl font-bold">${portfolio.value}</p>
                  <p className={`${portfolio.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                    {portfolio.dailyChange}
                  </p>
                </div>
                <div>
                  <h3 className="text-gray-500 text-sm">ASSET ALLOCATION</h3>
                  <div className="space-y-2 mt-2">
                    {portfolio.investments.map((item, index) => (
                      <div key={index} className="flex justify-between">
                        <span>{item.name}</span>
                        <span className="font-medium">
                          {item.value} <span className={`${item.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                            {item.change}
                          </span>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Market Overview */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Market Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Object.entries(marketData).map(([key, data]) => (
                  <div key={key} className="border rounded-lg p-4">
                    <h3 className="font-semibold">
                      {key.replace(/([A-Z])/g, ' $1').toUpperCase()}
                    </h3>
                    <p className="text-2xl font-bold my-2">{data.value}</p>
                    <p className={`${data.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                      {data.change}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
              {transactions.slice(0, 5).length > 0 ? (
                <div className="space-y-3">
                  {transactions.slice(0, 5).map(tx => (
                    <div key={tx.id} className="flex justify-between items-center border-b pb-2">
                      <div>
                        <p className="font-medium">
                          <span className={tx.action === 'Bought' ? 'text-green-500' : 'text-red-500'}>
                            {tx.action}
                          </span> {tx.amount} of {tx.asset}
                        </p>
                        <p className="text-sm text-gray-500">{tx.date}</p>
                      </div>
                      {tx.value && <span className="font-medium">${tx.value}</span>}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No recent transactions</p>
              )}
            </div>
          </div>
        )}

        {/* Transactions Tab */}
        {activeTab === 'transactions' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Add New Transaction</h2>
              <form onSubmit={handleTransactionSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Action</label>
                    <select
                      value={formData.action}
                      onChange={(e) => setFormData({...formData, action: e.target.value})}
                      className="w-full p-2 border rounded"
                      required
                    >
                      <option value="Bought">Bought</option>
                      <option value="Sold">Sold</option>
                      <option value="Dividend">Dividend</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Asset</label>
                    <input
                      type="text"
                      value={formData.asset}
                      onChange={(e) => setFormData({...formData, asset: e.target.value})}
                      className="w-full p-2 border rounded"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                    <input
                      type="text"
                      value={formData.amount}
                      onChange={(e) => setFormData({...formData, amount: e.target.value})}
                      className="w-full p-2 border rounded"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Value ($)</label>
                    <input
                      type="number"
                      value={formData.value}
                      onChange={(e) => setFormData({...formData, value: e.target.value})}
                      className="w-full p-2 border rounded"
                      step="0.01"
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Add Transaction
                  </button>
                </div>
              </form>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Transaction History</h2>
              {transactions.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Asset</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Value</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {transactions.map(tx => (
                        <tr key={tx.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{tx.date}</td>
                          <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                            tx.action === 'Bought' ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {tx.action}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{tx.asset}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{tx.amount}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {tx.value ? `$${tx.value}` : '-'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-500">No transactions yet</p>
              )}
            </div>
          </div>
        )}

        {/* Questions Tab */}
        {activeTab === 'questions' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Ask Your Advisor</h2>
              <form onSubmit={handleQuestionSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Question</label>
                  <textarea
                    value={questionInput}
                    onChange={(e) => setQuestionInput(e.target.value)}
                    className="w-full p-2 border rounded"
                    rows="4"
                    required
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                  >
                    Submit Question
                  </button>
                </div>
              </form>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Your Questions</h2>
              {questions.length > 0 ? (
                <div className="space-y-4">
                  {questions.map(q => (
                    <div key={q.id} className="border-b pb-4 last:border-b-0">
                      <div className="flex justify-between">
                        <p className="font-medium">{q.question}</p>
                        <span className="text-sm text-gray-500">{q.date}</span>
                      </div>
                      <p className="mt-2 text-gray-600">
                        {q.answer || <span className="text-gray-400">Waiting for advisor response...</span>}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No questions yet</p>
              )}
            </div>
          </div>
        )}

        {/* Documents Tab */}
        {activeTab === 'documents' && (
  <div className="space-y-6">
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Upload Document</h2>
      <form onSubmit={handleFileUpload} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select File (CSV or PDF)
            {isUploading && <span className="ml-2 text-blue-500">Uploading...</span>}
          </label>
          <input
            type="file"
            accept=".csv,.pdf"
            onChange={(e) => setSelectedFile(e.target.files[0])}
            className="w-full p-2 border rounded"
            disabled={isUploading}
            required
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className={`px-4 py-2 text-white rounded ${
              isUploading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-green-600 hover:bg-green-700'
            }`}
            disabled={isUploading}
          >
            {isUploading ? 'Uploading...' : 'Upload File'}
          </button>
        </div>
      </form>
    </div>

    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Your Documents</h2>
      {files.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Size</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {files.map(file => (
                <tr key={file.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {file.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 uppercase">
                    {file.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {file.size}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {file.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500">No documents uploaded yet</p>
      )}
    </div>
  </div>
)}
      </main>
    </div>
  );
};

export default Home;