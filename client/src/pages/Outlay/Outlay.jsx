import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../../components/Sidebar/Sideabar';
import Header from '../../components/Header/Header';
import './Outlay.css';
import { MdDelete } from "react-icons/md";
const Outlay = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const res = await axios.get('http://localhost:3001/checkout');
      setTransactions(res.data);
    } catch (err) {
      console.error('Error fetching transactions:', err.message);
    }
  };
  const calculateBalance = (transactions) => {
    return transactions.reduce((acc, transaction) => {
        if (transaction.type === 'cashin') {
            return acc + parseFloat(transaction.amount);
        } else if (transaction.type === 'cashout') {
            return acc - parseFloat(transaction.amount);
        }
        return acc;
    }, 0);
};
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/cashin/${id}`);
      setTransactions(transactions.filter(transaction => transaction._id !== id));
      updateCashIn(transactions.filter(transaction => transaction._id !== id));
    } catch (err) {
      console.error('Error deleting transaction:', err.message);
    }
  };

  return (
    <div className="outlay">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="t-container1">
            <h2>Transactions</h2>
            <table className="t-table1">
              <thead>
                <tr>
                  <th>Detail</th>
                  <th>Category</th>
                  <th>Mode</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Balance</th>
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
                    <td>{calculateBalance(transactions.slice(0, index + 1))}</td>
                    <td>
                      <button className='btn2' onClick={() => handleDelete(transaction._id)}>
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
  );
};

export default Outlay;
