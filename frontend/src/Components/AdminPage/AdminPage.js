import React, { useState } from 'react';
import './AdminPage.css';
import { SegmentedControl } from 'segmented-control'
import { Transactions } from './Components/Transactions';

const AdminPage = () => {
    const [selectedSegment, setSelectedSegment] = useState();
    return (
        <div className="page-container">
            <div className="header-container">
                <h2>Admin Dashboard</h2>
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
                        style={{ width: '60%', color: 'rgb(8,100,100,1)', border: '2px solid', borderRadius: '8px 8px', fontSize: 'small' }} // purple400
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