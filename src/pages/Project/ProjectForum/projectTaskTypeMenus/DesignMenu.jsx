import React from 'react';

const DesignMenu = ({setAnyPost, setPage}) => {
    return (
        <div className='analyze-option-btn-area'>
            <button className='analyze-option-btn' onClick={() => {setAnyPost("architecture"); setPage(1)}}>아키텍쳐</button>
            <button className='analyze-option-btn' onClick={() => {setAnyPost("db"); setPage(1)}}>DB설계</button>
        </div>
    );
};

export default DesignMenu;