import React from 'react';
import LocationButton from '../Component/LocationButton';

const ProjectSidebar = ({projects}) => {
    return (projects ?
        <div>
            <LocationButton style={{ marginTop: 25 }} location={'/project'} />
            <div style={{ fontSize: 25, marginTop: 30 }}>프로젝트 게시판</div>
            <section className="project-forum-project-information">
                <div style={{ display: 'flex' }}>
                    <div style={{ fontSize: 25, marginRight: 29 }}>{projects.projectName}</div>
                    {/* {
                        projects.projectOpenStatus == 1 ?
                            (<img style={{ pointerEvents: 'none' }} src="./lock-open.png" width={30} height={30} />)
                            :
                            (<img style={{ pointerEvents: 'none' }} src="./lock.png" width={30} height={30} />)
                    } */}

                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img src="./profile.png" />
                    {/* <div style={{marginLeft:10,marginRight:137,width:100}}>{projects.account.accountName}</div> */}
                    <div style={{ display: 'flex', flexDirection: 'column', width: 100 }}>
                        <div>{projects.departmentName}</div>
                        <div>{projects.teamName}</div>
                    </div>
                </div>
                <div style={{ display: 'flex', marginTop: 35, alignItems: 'center' }}>
                    <div style={{ fontSize: 20, marginRight: 20 }}>마감기한</div>
                    <div>{projects.projectEnd}</div>
                </div>
                <div className="project-">
                    <div></div>
                </div>
            </section>
        </div>
    : <span>정보를 가져오는 중...</span>);
};

export default ProjectSidebar;