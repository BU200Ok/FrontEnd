import React from 'react';
import { checkLeaving } from './workingCheckFunc';

const LeaveWorkButton = () => {
    
    return (
        <button style={{
            width: '209px',
            height: '46px',
            left: '1624px',
            top: '945px',
            border: '1px solid #E9EEE6',
            borderRadius: '80px',}}
            onClick={checkLeaving}>
            퇴근
        </button>
    );
};

export default LeaveWorkButton;