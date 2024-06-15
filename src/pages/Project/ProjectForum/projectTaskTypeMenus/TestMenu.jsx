import React from 'react';

const TestMenu = ({setAnyPost, setPage}) => {
    return (
        <div className='analyze-option-btn-area'>
            <button className='analyze-option-btn' onClick={() => {setAnyPost("test"); setPage(1)}} style={{width:"110px"}}>단위 테스트</button>
        </div>
    );
};

export default TestMenu;