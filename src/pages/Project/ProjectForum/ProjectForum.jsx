import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import './ProjectForum.css';
import './Forum.css';
import axios from "axios";
import { openInputModalWithMassage } from "../../Modal/modalFunc";
import { useSelector } from "react-redux";
import ProjectOptionSelectMenu from "./ProjectOptionSelectMenu";
import ProjectSidebar from "./ProjectSidebar";
import ProjectMember from "./ProjectMember";
import AnalyzeScreen from "./AnalyzeScreen";

//남은 기능 : 게시글 작성, 게시글 찾기, 프로젝트 생성

const ProjectForum = () => {
    const {projectCode} = useParams();
    const [project, setProject] = useState(null);
    const [forum, setForum] = useState([]);
    const [projectOption, setProjectOption] = useState(1);
    const navigate = useNavigate();
    const [page, setPage] = useState(1);

    const value = useSelector((state)=>state.inputModalValue);


    useEffect(()=>{
        if(project === null && projectCode){
            // getSidebarData(projectCode);
            getForumData(projectCode);
        }
    },[projectCode])
    const getSidebarData = async () => {
        const response = await axios.get(`http://localhost:8080/project/${projectCode}`,
        {
            headers: {Authorization: localStorage.getItem('token')}
        }
        )
        setProject(response.data.obj);
        // dayUtil(response.data.obj.projectEnd);
    }
    const getForumData = async () => {
        try{
            const response = await axios.get(`http://localhost:8080/projects/${projectCode}`,
                {
                    headers: {Authorization: localStorage.getItem('token')}
                }
                )
                setForum(response.data.obj);
        } catch(err){
            if(err.response.data.code === 409){
                alert('페이지를 볼 수 있는 권한이 없습니다!');
                navigate('/project');
            }
        }

    }

    const addMember = () => {
        openInputModalWithMassage("이름을 입력하세요!")
    }
    return(
        <section style={{display:'flex'}}>
            { forum.projectCode ? 
            <section className="project-forum-sidebar">
                <ProjectSidebar projects = {forum} />
                <ProjectMember projects = {forum} />
            </section>
            : 
            <section></section>
            }
            <section style={{flex : 1}}>
                <div className="container">
                    <div className="project-header">
                        <h1>{forum.projectName}</h1>
                        <h4>{forum.projectStart}~{forum.projectEnd}</h4>
                    </div>
                    <div className='project-explain-square'>
                    {forum.projectDescription}
                    </div>
                    <div className="container-top">
                        <ProjectOptionSelectMenu selectedOption={projectOption} optionChange={setProjectOption}/>
                        <button className="writeTaskBtn" onClick={()=> navigate(`/project/${projectCode}/writetask`)}>글 쓰기</button>
                        {/* <ProjectSearch/> */}
                    </div>
                    <AnalyzeScreen projectCode={projectCode} projectOption={projectOption}/>
                </div>
            </section>
        </section>
    )
}

export default ProjectForum;