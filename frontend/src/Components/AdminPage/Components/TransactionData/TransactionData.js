import axios from 'axios';
import React, { useState } from 'react';
import Modal from 'react-modal';
import './TransactionData.css';


const TransactionData = ({ data: transactionData, refresh }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalTransaction, setModalTransaction] = useState(null);
    const totalAmount = transactionData?.reduce((acc, data) => acc + data.amountSpread, 0);
    const handleClick = (transactionId) => {
        let tr_data = transactionData.find((data) =>
            data.transactionId === transactionId
        );
        setModalTransaction(tr_data);
        setIsModalOpen(true);
    }
    const handleUpdateTransaction = (status) => {
        axios.put(
            'http://localhost:3001/update',
            { status, transactionId: modalTransaction?.transactionId })
            .then((res) => {
                setIsModalOpen(false);
                refresh();
            })
    }
    Modal.setAppElement(document.getElementById('data-div'));
    return (
        <div className="transaction-data-container" id='data-div'>
            {transactionData && <div className='data-header-container'>
                <div className='row'>
                    <span>Transactions : {transactionData?.length}</span>
                    <span>Amount Spread : {totalAmount?.toFixed(2)}</span>
                </div>
            </div>}
            <table>
                <thead><tr>
                    <th>Client Name</th>
                    <th>Currency</th>
                    <th>Quantity</th>
                    <th>Amount Spread</th>
                </tr></thead>
                <tbody>
                    {transactionData?.map(({ transactionId, clientName, currency, quantity, amountSpread }) =>
                        <tr onClick={() => handleClick(transactionId)} key={transactionId}>
                            <td>{clientName}</td>
                            <td>{currency}</td>
                            <td>{quantity}</td>
                            <td>{amountSpread}</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                contentLabel="Transaction Details"
                className="Modal"
                overlayClassName="Overlay"
            >
                <div className="modal-data-container">
                    <div className="modal-data-row">
                        <span>Transaction ID: {modalTransaction?.transactionId}</span>
                        <span>Client Name: {modalTransaction?.clientName}</span>
                    </div>
                    <div className="modal-data-row">
                        <span>Currency: {modalTransaction?.currency}</span>
                        <span>Position: {modalTransaction?.position}</span>
                    </div>
                    <div className="modal-data-row">
                        <span>Quantity: {modalTransaction?.quantity}</span>
                        <span>Amount: {(modalTransaction?.amountSpread)?.toFixed(2)}</span>
                    </div>
                    <div className="modal-data-row modal-cta">
                        <button className="btn approve-btn" onClick={() => handleUpdateTransaction('APPROVED')}>Approve</button>
                        <button className="btn reject-btn" onClick={() => handleUpdateTransaction('REJECTED')}>Reject</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default TransactionData;
