import React, { useEffect, useState } from 'react';
import TransactionList from '../components/GlitchTerminal.jsx';

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetch('/api/transactions/user123')
      .then((res) => res.json())
      .then((data) => setTransactions(data.transactions));
  }, []);

  return (
    <div>
      <h1>Finance Tracker</h1>
      <TransactionList transactions={transactions} />
    </div>
  );
};

export default Dashboard;