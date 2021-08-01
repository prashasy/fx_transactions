import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { TransactionData } from '../TransactionData';
import { TransactionSummary } from '../TransactionSummary';

const Transactions = ({ filter }) => {
    const { branch: branchId } = useParams();
    const [transactionsSummary, setTransactionsSummary] = useState();
    const [transactions, setTransactions] = useState();
    const [doRefresh, setDoRefresh] = useState(false);
    useEffect(() => {
        if (filter === 'SUMMARY' && (doRefresh || !transactionsSummary)) {
            axios.get(`http://localhost:3001/admin/${branchId}`).then((res) => {
                console.log(res.data);
                setTransactionsSummary(res.data);
            }).finally((res) => { setDoRefresh(false) });
        }
        else if (doRefresh || !transactions) {
            axios.get(`http://localhost:3001/admin/transactions/${branchId}`).then((res) => {
                setTransactions(res.data);
            }).finally((res) => { setDoRefresh(false) });
        }
    });
    let filteredTransactions = null;
    if (filter !== 'SUMMARY') {
        filteredTransactions = transactions?.filter((data) =>
            data.status === filter
        );
    }
    return (
        <>
            {filter === 'SUMMARY'
                ? <TransactionSummary summary={transactionsSummary} />
                : <TransactionData data={filteredTransactions} refresh={() => setDoRefresh(true)} />}

        </>
    );
};

export default Transactions;