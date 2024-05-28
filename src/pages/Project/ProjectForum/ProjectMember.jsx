import React from 'react';
import { openInputModalWithMassage } from '../../Modal/modalFunc';

const ProjectMember = ({projects}) => {
    const addMember = () => {
        openInputModalWithMassage("이름을 입력하세요!")
    }
    return (
        <div>
            <section className="project-sidebar-bottom-container">
                <button onClick={addMember}>추가하기</button>
                <div style={{ textAlign: 'start', fontSize: 20 }}>프로젝트 참여자</div>
                <section className="project-sidebar-scrollable-container">
                    {
                        projects.member.map((mem) => (
                            <div className="project-sidebar-scrollable-member" key={mem.accountCode.accountCode} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <div className="project-sidebar-profile-img">
                                </div>
                                <div>{mem.accountCode.accountName}</div>
                                <div>
                                    <div>
                                        <div style={{ fontSize: 14 }}>{mem.accountCode.team.department.departmentName}</div>
                                        <div>{mem.accountCode.accountPosition}</div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </section>
            </section>
        </div>
    );
};

export default ProjectMember;