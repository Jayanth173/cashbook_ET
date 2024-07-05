import React, { useEffect, useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { FiPlusCircle, FiMinusCircle } from 'react-icons/fi';
import { LuCircleEqual } from 'react-icons/lu';
import './BusinessBook.css';
import Sidebar from '../../components/Sidebar/Sideabar';
import Header from '../../components/Header/Header';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BusinessBook = () => {
    const [transactions, setTransactions] = useState([]);
    const [cashIn, setCashIn] = useState(0);
    const [cashOut, setCashOut] = useState(0);
    const [netBalance, setNetBalance] = useState(0);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await axios.get("http://localhost:3001/transactions");
            setTransactions(res.data);
            console.log(transactions);
      
            const totalCashIn = res.data
                .filter(transaction => transaction.type === 'cashin')
                .reduce((acc, transaction) => acc + parseFloat(transaction.amount), 0);

            const totalCashOut = res.data
                .filter(transaction => transaction.type === 'cashout')
                .reduce((acc, transaction) => acc + parseFloat(transaction.amount), 0);

            const calculatedNetBalance = totalCashIn - totalCashOut;

            setCashIn(totalCashIn);
            setCashOut(totalCashOut);
            setNetBalance(calculatedNetBalance);
        } catch (error) {
            console.error('Error fetching data:', error.message);
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

    return (
        <div className="business-book">
            <Sidebar />
            <div className="main-content">
                <Header />
                <main className="content">
                    <div className="business-book-header">
                        <h2>BusinessBook</h2>
                        <div className="actions">
                            <button className="action-button">Reports</button>
                        </div>
                    </div>
                    <div className="cash-buttons">
                        <input type="number" className="amount-input" placeholder="Enter amount" />
                        <div className="buttons-wrapper">
                            <Link to='/checkin' className='link'><button className="cash-in-button"><FaPlus /> Cash In</button></Link>
                            <Link to='/checkout' className='link'><button className="cash-out-button"><FaMinus /> Cash Out</button></Link>
                        </div>
                    </div>
                    <div className="summary-table">
                        <p className='exp'>Your Expense</p>
                        <table>
                            <thead>
                                <tr>
                                    <th className='in'><FiPlusCircle className="icon1" />Cash In</th>
                                    <th className='out'><FiMinusCircle className="icon2" /> Cash Out</th>
                                    <th className='net'><LuCircleEqual className="icon3" />Net Balance</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{cashIn}</td>
                                    <td>{cashOut}</td>
                                    <td>{netBalance}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <table className="transactions-table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Details</th>
                                <th>Category</th>
                                <th>Mode</th>
                                <th>Amount</th>
                                <th>Balance</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((transaction, index) => (
                                <tr key={index}>
                                    <td>{new Date(transaction.date).toLocaleDateString()}</td>
                                    <td>{transaction.details}</td>
                                    <td>{transaction.category}</td>
                                    <td>{transaction.mode}</td>
                                    <td>{transaction.amount}</td>
                                    <td>{calculateBalance(transactions.slice(0, index + 1))}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </main>
            </div>
        </div>
    );
}

export default BusinessBook;
