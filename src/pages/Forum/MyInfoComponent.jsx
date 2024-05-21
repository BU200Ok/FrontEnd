import React from 'react';
import './Forum.css'

const MyInfoComponent = (props) => {
    const { userInfo } = props;
    return (
        <div className='right-align-container'>
            <div className="card-container">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title fw-bold">{userInfo.team?.department?.departmentName} {userInfo.accountPosition}</h5>
                        <h4>{userInfo.accountName}</h4>
                        <p className="card-text">{userInfo.team?.teamName}/{userInfo.projectOperations}<br/>email: {userInfo.accountEmail}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyInfoComponent;
