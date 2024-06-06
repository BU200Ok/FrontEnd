import React from 'react';

const TestMenu = ({setAnyPost}) => {
    return (
        <div className='analyze-option-btn-area'>
            <button className='analyze-option-btn' onClick={() => setAnyPost("test")}>단위 테스트</button>
        </div>
    );
};

export default TestMenu;