import React from 'react';
import { openInputModalWithMassage } from '../../Modal/modalFunc';

const ProjectMember = ({projects}) => {
    console.log(projects);
    const addMember = () => {
        openInputModalWithMassage("이름을 입력하세요!")
    }
    return (projects ? 
        <div className='task-bottom-members'>
            <section className="project-sidebar-bottom-container">
                <button onClick={addMember}>추가하기</button>
                <div style={{ textAlign: 'start', fontSize: 20 }}>프로젝트 참여자</div>
                <section className="project-sidebar-scrollable-container">
                    { 
                        projects.accounts.map((mem, index) => (
                            <div className="project-sidebar-scrollable-member" key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <div className="project-sidebar-profile-img">
                                </div>
                                <div>{mem.accountName}</div>
                                <div>
                                    <div>
                                        <div style={{ fontSize: 14 }}>{mem.departmentName}</div>
                                        <div>{mem.accountPosition}</div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </section>
            </section>
        </div>
    :
    <span>정보를 가져오는 중...</span>);
};

export default ProjectMember;