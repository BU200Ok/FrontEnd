import React from 'react';

const Explain = ({tasks}) => {
    return (
        <div className='project-info-square'>
            {tasks.length != 0 ?
            tasks.map((item,i)=>(
                <div key={i}>
                    <span>{item}</span>
                </div>
            ))
            : <div>진행중인 항목이 없습니다.</div>}
        </div>
    );
};

export default Explain;