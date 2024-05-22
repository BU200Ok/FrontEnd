import { useEffect, useState } from 'react';
import './ProjectComponent.css';
import { useNavigate } from 'react-router-dom';
const ProjectComponent = (props) => {
    const [project,setProject] = useState([]);
    const navigate = useNavigate();
    useEffect(()=>{
        if(props.project.content && props.project.content.length > 0){
            let arr = props.project.content.map((pr)=>(
                <div onClick={()=>{navigate(`/project/${pr.projectCode}`)}} key={pr.projectCode} className='project-main-project-container'>
                    <div className='project-main-project-title'>{pr.projectName}</div>
                    <div className='project-main-project-from'>{pr.team.teamName}, {pr.accountName}님이 생성</div>
                    <div>
                        <div className='project-main-project-status'>{pr.projectStatus}</div>
                        <div>
                            <div>{pr.projectStart}~{pr.projectEnd}</div>    {/*서버에서 정제*/}
                            <div>인원 수 : {pr.member.length}</div>
                        </div>
                    </div>
                </div>
            ))
            setProject(arr);
        } else {
            let arr = (<div>계정에 진행중인 프로젝트가 없습니다.</div>);
            setProject(arr);
        }
    },[props])

    return(
        <section style={{}}>
            <section className='project-main-projects'>
                {project}
            </section>
        </section>
    )
}

export default ProjectComponent;