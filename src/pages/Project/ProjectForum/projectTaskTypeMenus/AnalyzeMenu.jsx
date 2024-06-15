import React from 'react';

const AnalyzeMenu = ({setAnyPost, setPage}) => {
    return (
        <div className='analyze-option-btn-area'>
            <button className='analyze-option-btn' onClick={() => {setAnyPost("needs"); setPage(1)}}>요구분석</button>
            <button className='analyze-option-btn' onClick={() => {setAnyPost("environment"); setPage(1)}}>환경분석</button>
            <button className='analyze-option-btn' onClick={() => {setAnyPost("swot"); setPage(1)}}>SWOT</button>
        </div>
    );
};

export default AnalyzeMenu;