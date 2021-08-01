import React, { useState, useEffect } from 'react';
import { CurrencyCard } from '../CurrencyCard';
import axios from 'axios';
import './MarketPlace.css';

const MarketPlace = () => {
    const [rates, setRates] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:3001/rates')
            .then((res) => { setRates(res.data) })
            .catch((err) => { console.log(err) });
    }, []);
    return (
        <div className='marketplace-container'>
            {rates.map((rate) => {
                return (<CurrencyCard key={rate.currency} rateInfo={rate} />)
            })}
        </div>
    )
}

export default MarketPlace;