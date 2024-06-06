import React from 'react';

const DesignMenu = ({setAnyPost}) => {
    return (
        <div className='analyze-option-btn-area'>
            <button className='analyze-option-btn' onClick={() => setAnyPost("architecture")}>아키텍쳐</button>
            <button className='analyze-option-btn' onClick={() => setAnyPost("db")}>DB설계</button>
        </div>
    );
};

export default DesignMenu;