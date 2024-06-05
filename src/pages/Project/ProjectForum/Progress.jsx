import React from 'react';

const Progress = ({tasks}) => {
    return (
        <div className='project-info-square'>
            {tasks.length != 0 ?
            tasks.map((item)=>(
                <div>
                    <span>{item}</span>
                </div>
            ))
            : <div>완료된 항목이 없습니다.</div>}
        </div>
    );
};

export default Progress;