import axios from 'axios';
import React, { useState } from 'react';
import Modal from 'react-modal';
import './TransactionData.css';


const TransactionData = ({ data: transactionData, refresh }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalTransaction, setModalTransaction] = useState(null);
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
        <div className="data-container" id='data-div'>
            <table>
                <thead><tr>
                    <th>Client Name</th>
                    <th>Currency</th>
                    {/* <th>Amount</th> */}
                </tr></thead>
                <tbody>
                    {transactionData?.map(({ transactionId, clientName, currency }) =>
                        <tr onClick={() => handleClick(transactionId)} key={transactionId}>
                            <td>{clientName}</td>
                            <td>{currency}</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <Modal
                isOpen={isModalOpen}
                // onAfterOpen={afterOpenModal}
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
                    <div className="modal-data-row">
                        <button className="btn approve-btn" onClick={() => handleUpdateTransaction('APPROVED')}>Approve</button>
                        <button className="btn reject-btn" onClick={() => handleUpdateTransaction('REJECTED')}>Reject</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default TransactionData;