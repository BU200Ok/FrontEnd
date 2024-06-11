import React from 'react';

const ImplementMenu = ({setAnyPost}) => {
    return (
        <div className='analyze-option-btn-area'>
            <button className='analyze-option-btn' onClick={() => setAnyPost("prototype")}>프로토타입</button>
            <button className='analyze-option-btn' onClick={() => setAnyPost("front")}>프론트엔드</button>
            <button className='analyze-option-btn' onClick={() => setAnyPost("backend")}>백엔드</button>
        </div>
    );
};

export default ImplementMenu;