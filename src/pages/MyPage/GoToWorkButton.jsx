import React from 'react';
import { checkWorking } from './workingCheckFunc';

const GoToWorkButton = () => {
    return (
        <button style={{
            width: '209px',
            height: '46px',
            left: '1624px',
            top: '876px',
            background: '#E9EEE6',
            border: '1px solid #606060',
            borderRadius: '80px',}}
            onClick={checkWorking}>
            출근
        </button>
    );
};

export default GoToWorkButton;