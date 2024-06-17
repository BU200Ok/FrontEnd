import React from 'react';

const PriorityProject = ({projInfo}) => {
    return (
        <div className='priority_project_area'>
            <h5 style={{marginTop: "80px"}}>진행중인 프로젝트</h5>
            <p>프로젝트명 : {projInfo.projectName}</p>
            <p>시작일 : {projInfo.projectStart}</p>
            <p>종료일 : {projInfo.projectEnd}</p>
            <p>프로젝트 진행 상태 : {projInfo.projectStatus}</p>
        </div>
    );
};

export default PriorityProject;