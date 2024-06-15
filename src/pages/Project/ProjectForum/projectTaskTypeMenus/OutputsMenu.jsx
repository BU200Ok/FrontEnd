import React from 'react';

const OutputsMenu = ({setAnyPost, setPage}) => {
    return (
        <div className='analyze-option-btn-area'>
            <button className='analyze-option-btn' onClick={() => {setAnyPost("menual"); setPage(1)}} style={{width:"120px"}}>사용자 매뉴얼</button>
            <button className='analyze-option-btn' onClick={() => {setAnyPost("maintenance"); setPage(1)}}>유지보수</button>
        </div>
    );
};

export default OutputsMenu;