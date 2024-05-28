import React from 'react';
import Progress from './Progress';
import Explain from './Explain';
import OpenStatus from './OpenStatus';

const AnalyzeScreen = () => {
    return (
        <div>
            <span>분석페이지</span>
            <div className='project-info-area'>
                <Progress />
                <Explain />
                <OpenStatus />
            </div>
            <br></br>
            <div className='analyze-option-btn-area'>
                <button className='analyze-option-btn'>요구분석</button>
                <button className='analyze-option-btn'>환경분석</button>
                <button className='analyze-option-btn'>SWOT분석</button>
            </div>
        </div>
    );
};

export default AnalyzeScreen;