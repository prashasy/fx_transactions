import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { useLocation, useParams } from "react-router-dom";
import './CurrencyCard.css';

const CurrencyCard = (props) => {
    const { rateInfo } = props;
    const [qty, setQty] = useState(null);
    const { branch } = useParams();
    const isDisabled = !(qty);
    const [isBuyProcessing, setIsBuyProcessing] = useState(false);
    const [isSellProcessing, setIsSellProcessing] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [modalInfo, setModalInfo] = useState({ isModalopen: false, order: null });
    const { state: { username, idNumber } } = useLocation();

    const handleAmountChange = (e) => {
        let val = e.target.value;
        if (val < 0) {
            setErrorMessage('Amount should be positive');
            setQty('');
            return;
        }
        setErrorMessage('');
        setQty(e.target.value)
    }

    const executeBuy = () => {
        if (qty <= 0) {
            setErrorMessage('Amount should not be zero');
            return;
        }
        setIsBuyProcessing(true);
        const data = {
            "position": "BUY",
            "currency": rateInfo.currency,
            "quantity": qty,
            "branchId": branch,
            "clientName": username,
            "clientIdNumber": idNumber
        };
        axios.post('http://localhost:3001/submit', data).then((res) => {
            alert(`Order Processed: Buy ${qty} of ${rateInfo.currency} `)
        }).catch((err) => {
            alert(`Error. Could not process order`);
        }).finally(() => setIsBuyProcessing(false))

    }
    const executeSell = () => {
        if (qty <= 0) {
            setErrorMessage('Amount should not be zero');
            return;
        }
        setIsSellProcessing(true);
        const data = {
            "position": "SELL",
            "currency": rateInfo.currency,
            "quantity": qty,
            "branchId": branch
        };
        axios.post('http://localhost:3001/submit', data).then((res) => {
            alert(`Order Processed: Sell ${qty} of ${rateInfo.currency} `)
        }).catch((err) => {
            alert(`Error. Could not process order`);
        }).finally(() => setIsSellProcessing(false))
    }

    const executeOrder = () => {
        setModalInfo({ isModalOpen: false });
        if (modalInfo.order === 'buy')
            executeBuy();
        else
            executeSell();
    }

    return (
        <div className="card">
            <p className="currency-label" >{rateInfo?.currency}</p>
            <div className="container">
                <div class='row'>
                    <h4><b>Price: &nbsp; {rateInfo.rate} </b></h4>
                    <h4><b>Amount: &nbsp; {(qty * (rateInfo?.rate * (1 + rateInfo?.spread))).toFixed(2)} </b></h4>
                </div>
                <input type='number' onChange={handleAmountChange} value={qty} />
                {errorMessage ? <span className="err-msg">{errorMessage}</span> : null}
                <div className="CTA-container">
                    <button className='btn buy-btn' disabled={isDisabled} onClick={() => { setModalInfo({ isModalOpen: true, order: 'buy' }) }}>{isBuyProcessing ? 'Processing...' : 'BUY'}</button>
                    <button className='btn sell-btn' disabled={isDisabled} onClick={() => { setModalInfo({ isModalOpen: true, order: 'sell' }) }}>{isSellProcessing ? 'Processing...' : 'SELL'}</button>
                </div>
            </div>
            <Modal
                isOpen={modalInfo.isModalOpen}
                onRequestClose={() => setModalInfo({ isModalOpen: false })}
                contentLabel="Confirm Order"
                className="modal"
            >
                <div className='modal-data-container'>
                    <div className='modal-heading-wrapper'>
                        <div> <p>Are you sure?</p>
                            {modalInfo?.order === 'buy' ? <span>Buy </span> : <span>Sell </span>}
                            {qty} {rateInfo?.currency} at price of {rateInfo?.rate} each
                            <p>Amount: {(qty * (rateInfo?.rate * (1 + rateInfo?.spread))).toFixed(2)}</p>
                        </div>
                    </div>
                    <div className='modal-buttons-container'>
                        <button className='btn confirm-btn' disabled={isDisabled} onClick={executeOrder}>Confirm</button>
                        <button className='btn cancel-btn' disabled={isDisabled} onClick={() => setModalInfo({ isModalOpen: false })}>Cancel</button>
                    </div>
                </div>

            </Modal>
        </div>
    )
}

export default CurrencyCard;

