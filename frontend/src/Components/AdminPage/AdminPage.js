import React, { useState, useEffect } from 'react';
import './AdminPage.css';
import axios from 'axios';
import { useParams } from "react-router-dom";
import { SegmentedControl } from 'segmented-control'
import { Transactions } from './Components/Transactions';

const AdminPage = () => {
    // const [transactionsSummary, setTransactionsSummary] = useState();
    const [selectedSegment, setSelectedSegment] = useState();
    // const { branch: branchId } = useParams();
    // useEffect(() => {
    //     axios.get(`http://localhost:3001/admin/${branchId}`).then((res) => {
    //         console.log(res.data)
    //     });
    // });
    return (
        <div className="page-container">
            <div className="header-container">
                <span>Admin Dashboard</span>
            </div>
            <div className="body-container">
                <div className="segment-controller">
                    <SegmentedControl
                        name="oneDisabled"
                        options={[
                            { label: "Pending", value: "PENDING", default: true },
                            { label: "Approved", value: "APPROVED" },
                            { label: "Rejected", value: "REJECTED" },
                            { label: "Summary", value: "SUMMARY" }
                        ]}
                        setValue={setSelectedSegment}
                        style={{ width: '60%', color: '#ab47bc', border: '2px solid', borderRadius: '8px 8px', fontSize: 'small' }} // purple400
                    />
                </div>
                <div className="data-container">
                    <Transactions filter={selectedSegment} />
                </div>
            </div>
        </div>
    );
};

export default AdminPage;