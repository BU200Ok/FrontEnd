import React, { useState } from 'react';
import Progress from './Progress';
import Explain from './Explain';
import OpenStatus from './OpenStatus';

const AnalyzeScreen = () => {
    const [anyPost, setAnyPost] = useState("요구분석");

    const getPostData = async() => {

    }
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
                <button className='analyze-option-btn' onClick={() => setAnyPost("요구분석")}>요구분석</button>
                <button className='analyze-option-btn' onClick={() => setAnyPost("환경분석")}>환경분석</button>
                <button className='analyze-option-btn' onClick={() => setAnyPost("SWOT분석")}>SWOT</button>
            </div>
        </div>
    );
};

export default AnalyzeScreen;