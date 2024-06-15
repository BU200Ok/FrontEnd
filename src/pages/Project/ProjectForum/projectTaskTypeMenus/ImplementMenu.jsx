import React from 'react';

const ImplementMenu = ({setAnyPost, setPage}) => {
    return (
        <div className='analyze-option-btn-area'>
            <button className='analyze-option-btn' onClick={() => {setAnyPost("prototype"); setPage(1)}}>프로토타입</button>
            <button className='analyze-option-btn' onClick={() => {setAnyPost("front"); setPage(1)}}>프론트엔드</button>
            <button className='analyze-option-btn' onClick={() => {setAnyPost("backend"); setPage(1)}}>백엔드</button>
        </div>
    );
};

export default ImplementMenu;