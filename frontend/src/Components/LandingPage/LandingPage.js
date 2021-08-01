import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import './LandingPage.css';

const LandingPage = () => {
    const [username, setUsername] = useState('');
    const [idNumber, setIdNumber] = useState('');
    const [branch, setBranch] = useState();
    const [branchesData, setBranchesData] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();
    useEffect(() => {
        if (!branchesData)
            axios.get('http://localhost:3001/branches')
                .then((res) => setBranchesData(res.data));
    })
    console.log(branch);
    const isValidUserName = () => {
        if (!username) {
            setErrorMessage('Name is mandatory field');
            return false;
        }
        if (username.match(/^[a-z]+$/i)) {
            return true;
        }
        setErrorMessage('Name should contain only alphabets')
        return false;
    }
    const isValidIdNumber = () => {
        if (idNumber) {
            if (idNumber.match(/^\d+$/))
                return true;
            else { setErrorMessage('ID Number should be a positive number'); return false; }
        }
        setErrorMessage('ID Number is mandatory field');
        return false;
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage('');
        if (!isValidUserName() || !isValidIdNumber()) {
            setIsLoading(false); return;
        }
        setIsLoading(false);
        history.push(`/market/${branch || branchesData[0].id}`, { username, idNumber })
    }
    return (
        <div className="wrapper">
            <form className='input-container'>
                <h4>Start your forex transactions</h4>
                <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Name" required="" autoFocus="" />
                <input type="number" name="idNumber" value={idNumber} onChange={(e) => setIdNumber(e.target.value)} placeholder="ID Document Number" required="" />
                <select
                    className="branch-select"
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                >
                    {branchesData?.map((branchData) =>
                        <option key={branchData.id} value={branchData.id}>{branchData.name}</option>)}
                </select>
                {errorMessage ? <span className='error-msg'>{errorMessage} </span> : null}
                <button onClick={handleSubmit} className="btn btn-lg btn-primary btn-block btn-cta" type="submit">{isLoading ? <span>Submitting...</span> : <span>Start Transacting</span>}</button>
            </form>
        </div>
    );
};

export default LandingPage;
