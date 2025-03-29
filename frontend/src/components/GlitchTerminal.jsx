import React, { useState } from 'react';

export default function GlitchTerminal({ onQuerySubmit }) {
  const [query, setQuery] = useState('');
  const [history, setHistory] = useState([]);

  const handleSubmit = () => {
    if (!query.trim()) return;
    onQuerySubmit(query);
    setHistory([...history, { type: 'query', text: query }]);
    setQuery('');
  };

  return (
    <div className="bg-black text-green-400 font-mono p-4 rounded-lg border border-green-400 shadow-lg shadow-green-400/20 w-full max-w-2xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex space-x-2">
          <span className="w-3 h-3 rounded-full bg-red-500"></span>
          <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
          <span className="w-3 h-3 rounded-full bg-green-500"></span>
        </div>
        <span className="text-green-400 font-bold">FINANCE_AGENT</span>
      </div>
      
      <div className="terminal-body h-64 overflow-y-auto mb-4">
        {history.map((item, i) => (
          <div 
            key={i} 
            className={`mb-2 ${item.type === 'response' ? 'text-blue-400' : 'text-green-400'}`}
          >
            {item.type === 'response' ? 'AI: ' : 'YOU: '}{item.text}
          </div>
        ))}
        
        <div className="flex items-center">
          <span className="text-green-400 mr-2">$</span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
            placeholder="Ask about your finances..."
            className="bg-transparent border-none outline-none text-green-400 w-full caret-green-400 placeholder-green-400/50"
          />
        </div>
      </div>
    </div>
  );
}