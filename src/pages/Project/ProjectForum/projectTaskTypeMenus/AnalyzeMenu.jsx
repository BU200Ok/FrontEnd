import React from 'react';

const AnalyzeMenu = ({setAnyPost}) => {
    return (
        <div className='analyze-option-btn-area'>
            <button className='analyze-option-btn' onClick={() => setAnyPost("needs")}>요구분석</button>
            <button className='analyze-option-btn' onClick={() => setAnyPost("environment")}>환경분석</button>
            <button className='analyze-option-btn' onClick={() => setAnyPost("swot")}>SWOT</button>
        </div>
    );
};

export default AnalyzeMenu;