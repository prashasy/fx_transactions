import React from 'react';
import './TransactionSummary.css';

const TransactionSummary = ({ summary: transactionSummary }) => {
    const currencyWiseSummary = transactionSummary?.currencyWiseSummary || null;
    return (
        <div className='summary-container'>
            <div className='summary-header-container'>
                <div className='row'>
                    <span>Amount HQ : {transactionSummary?.amountHQSum?.toFixed(2)}</span>
                    <span>Transactions : {transactionSummary?.totalTransactions}</span>
                </div>
                <div className='row'>
                    <span>Amount Spread : {transactionSummary?.amountSpreadSum?.toFixed(2)}</span>
                    <span>Profit : {transactionSummary?.profit?.toFixed(2)}</span>
                </div>
            </div>
            <div className='list-container'>
                <table>
                    <thead><tr>
                        <th>Currency</th>
                        <th>Transactions</th>
                        <th>Traded Quantity</th>
                        <th>Profit</th>
                        <th>Amount HQ Total</th>
                        <th>Amount Spread Total</th>
                    </tr></thead>
                    <tbody>
                        {currencyWiseSummary && Object.keys(currencyWiseSummary)?.map((currency) => {
                            let { totalTransactions, quantity, profit, amountHQSum, amountSpreadSum } = currencyWiseSummary[currency]
                            return (<tr key={currency}>
                                <td>{currency}</td>
                                <td>{totalTransactions}</td>
                                <td>{quantity}</td>
                                <td>{profit.toFixed(2)}</td>
                                <td>{amountHQSum.toFixed(2)}</td>
                                <td>{amountSpreadSum.toFixed(2)}</td>
                            </tr>)
                        }
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TransactionSummary;