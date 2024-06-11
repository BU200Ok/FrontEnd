import React from 'react';

const OutputsMenu = ({setAnyPost}) => {
    return (
        <div className='analyze-option-btn-area'>
            <button className='analyze-option-btn' onClick={() => setAnyPost("menual")}>사용자 매뉴얼</button>
            <button className='analyze-option-btn' onClick={() => setAnyPost("maintenance")}>유지보수</button>
        </div>
    );
};

export default OutputsMenu;