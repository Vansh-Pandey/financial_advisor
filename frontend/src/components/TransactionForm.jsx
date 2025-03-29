import React, { useState } from 'react';

export default function TransactionForm({ onSubmit }) {
    const [form, setForm] = useState({
        amount: '',
        category: 'food',
        type: 'expense',
        description: ''
    });

    const categories = [
        'food', 'transport', 'housing', 
        'entertainment', 'health', 'income'
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            ...form,
            amount: parseFloat(form.amount),
            date: new Date().toISOString()
        });
        setForm({ ...form, amount: '', description: '' });
    };

    return (
        <div className="transaction-form">
            <h2>Add Transaction</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="number"
                    value={form.amount}
                    onChange={(e) => setForm({...form, amount: e.target.value})}
                    placeholder="Amount"
                    required
                />
                <select
                    value={form.category}
                    onChange={(e) => setForm({...form, category: e.target.value})}
                >
                    {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
                <div className="type-toggle">
                    <button
                        type="button"
                        className={form.type === 'expense' ? 'active' : ''}
                        onClick={() => setForm({...form, type: 'expense'})}
                    >
                        Expense
                    </button>
                    <button
                        type="button"
                        className={form.type === 'income' ? 'active' : ''}
                        onClick={() => setForm({...form, type: 'income'})}
                    >
                        Income
                    </button>
                </div>
                <input
                    type="text"
                    value={form.description}
                    onChange={(e) => setForm({...form, description: e.target.value})}
                    placeholder="Description"
                />
                <button type="submit">Add</button>
            </form>
        </div>
    );
}