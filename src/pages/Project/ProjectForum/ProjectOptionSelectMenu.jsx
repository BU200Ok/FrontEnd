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
        <div className='option_select_menu_main'>
            <div className='project_option_select_menu_area'>
                <button>분석</button>
                <button>설계</button>
                <button>구현</button>
                <button>테스트</button>
                <button>산출물</button>
                <button>선택 안함</button>
            </div>
            <hr/>
        </div>
    );
};

export default ProjectOptionSelectMenu;
