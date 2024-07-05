import React, { useState, useEffect } from 'react';
import './CheckOut.css';
import Sidebar from '../../components/Sidebar/Sideabar';
import Header from '../../components/Header/Header';
import { MdDelete } from "react-icons/md";
import axios from 'axios';

const CheckOut = ({ onUpdateCashOut, onUpdateNetBalance, cashIn }) => {
  const [details, setDetails] = useState('');
  const [category, setCategory] = useState('');
  const [mode, setMode] = useState('');
  const [amount, setAmount] = useState('');
  const type = "cashout"
  const [date, setDate] = useState('');
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const res = await axios.get('http://localhost:3001/checkout');
      setTransactions(res.data);
      updateCashOut(res.data);
      console.log(transactions);
    } catch (err) {
      console.error('Error fetching transactions:', err.message);
    }
  };

  const updateCashOut = (transactions) => {
    const totalCashOut = transactions.reduce((acc, transaction) => acc + parseFloat(transaction.amount), 0);
    onUpdateCashOut(totalCashOut);
    onUpdateNetBalance(cashIn - totalCashOut);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3001/cashout", { details, category, mode, amount, type,date });
      const newTransactions = [...transactions, res.data];
      setTransactions(newTransactions);
      updateCashOut(newTransactions);
      setDetails('');
      setCategory('');
      setMode('');
      setAmount('');
      setDate('');
    } catch (err) {
      console.error('Error submitting transaction:', err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/checkout/${id}`);
      const remainingTransactions = transactions.filter(transaction => transaction._id !== id);
      setTransactions(remainingTransactions);
      updateCashOut(remainingTransactions);
    } catch (err) {
      console.error('Error deleting transaction:', err.message);
    }
  };

  return (
    <div className="check-out" style={{ display: "flex", justifyContent: "space-between" }}>
      <Sidebar />
      <div className="main-content">
        <Header />
         <div className="form-table-container" style={{ paddingLeft: "200px" }}>
          <div className="form-container">
            <h2>Check Out</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="details">Detail</label>
                <input
                  type="text"
                  id="details"
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Salary">Salary</option>
                  <option value="Housing">Housing</option>
                  <option value="Transportation">Transportation</option>
                  <option value="Food">Food</option>
                  <option value="Utilities">Utilities</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Medical/Healthcare">Medical/Healthcare</option>
                  <option value="Insurance">Insurance</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="mode">Mode</label>
                <select
                  id="mode"
                  value={mode}
                  onChange={(e) => setMode(e.target.value)}
                  required
                >
                  <option value="">Select Mode</option>
                  <option value="Cash">Cash</option>
                  <option value="UPI">UPI</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="amount">Amount</label>
                <input
                  type="number"
                  id="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </div>
              <div className='form-group'>
                <label htmlFor='date'>Date</label>
                <input
                  type='date'
                  id='date'
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <button type="submit">Submit</button>
              </div>
            </form>
          </div>
          <div className="table-container2">
            <h2>Transactions</h2>
            <table className="transactions-table2">
              <thead>
                <tr>
                  <th>Detail</th>
                  <th>Category</th>
                  <th>Mode</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction, index) => (
                  <tr key={index}>
                    <td>{transaction.details}</td>
                    <td>{transaction.category}</td>
                    <td>{transaction.mode}</td>
                    <td>{transaction.amount}</td>
                    <td>{new Date(transaction.date).toLocaleDateString()}</td>
                    <td>
                      <button className='btn3' onClick={() => handleDelete(transaction._id)}>
                        <MdDelete />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div> 
      </div>
    </div>
  );
}

export default CheckOut;
