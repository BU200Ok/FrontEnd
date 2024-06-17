import React from 'react';

const OpenStatus = ({tasks}) => {
    return (
        <div className='project-info-square'>
            {tasks.length != 0 ?
            tasks.map((item,i)=>(
                <div key={i}>
                    <span>{item}</span>
                </div>
            ))
            : <div>TODO 항목이 없습니다.</div>}
        </div>
    );
};

export default OpenStatus;