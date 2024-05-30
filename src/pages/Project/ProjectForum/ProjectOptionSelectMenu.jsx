import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';


const ProjectOptionSelectMenu = () => {
    const params = useParams();
    const projectCode = params.projectCode;
    const navigate = useNavigate();
    // console.log('받음:' + projectCode);

    

    const handleButtonClick = (taskName) => {
        navigate(`/project/${projectCode}/${taskName}`);
        // console.log('전달:' + projectCode + taskName);
    };

    return (
        <div className='project_option_select_menu_area'>
            <button onClick={() => handleButtonClick('analyze')}>분석</button>
            <button onClick={() => handleButtonClick('설계')}>설계</button>
            <button onClick={() => handleButtonClick('구현')}>구현</button>
            <button onClick={() => handleButtonClick('테스트')}>테스트</button>
            <button onClick={() => handleButtonClick('산출물')}>산출물</button>
            <button onClick={() => handleButtonClick('선택 안함')}>선택 안함</button>
        </div>
    );
};

export default ProjectOptionSelectMenu;
