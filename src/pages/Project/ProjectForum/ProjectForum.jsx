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
        console.log(value);
    },[value])

    useEffect(()=>{
        if(project === null && projectCode){
            // getSidebarData(projectCode);
            getForumData(projectCode);
            console.log(forum.obj);
        }
    },[projectCode])
    const getSidebarData = async () => {
        const response = await axios.get(`http://localhost:8080/project/project-sidebar?projectCode=${projectCode}`,
        {
            headers: {Authorization: localStorage.getItem('token')}
        }
        )
        setProject(response.data.obj);
        // dayUtil(response.data.obj.projectEnd);
    }
    const getForumData = async () => {
        const response = await axios.get(`http://localhost:8080/projects/${projectCode}`,
        {
            headers: {Authorization: localStorage.getItem('token')}
        }
        )
        setForum(response.data.obj);
        console.log(response.data);
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
                    <h1>{forum.projectName}</h1>
                    <h4>{forum.projectStart}~{forum.projectEnd}</h4>
                    <div className="container-top">
                        <ProjectOptionSelectMenu selectedOption={projectOption} optionChange={setProjectOption}/>
                        {/* <ProjectSearch/> */}
                    </div>
                    <AnalyzeScreen projectCode={projectCode} projectOption={projectOption}/>
                </div>
            </section>
        </section>
    )
}

export default ProjectForum;