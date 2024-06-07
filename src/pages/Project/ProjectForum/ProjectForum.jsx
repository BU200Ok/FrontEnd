import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import './ProjectForum.css';
import './Forum.css';
import axios from "axios";
import Pagination from "react-js-pagination";
import LocationButton from "../Component/LocationButton";
import { openInputModalWithMassage } from "../../Modal/modalFunc";
import { useSelector } from "react-redux";
import ProjectOptionSelectMenu from "./ProjectOptionSelectMenu";
import ProjectSidebar from "./ProjectSidebar";
import ProjectMember from "./ProjectMember";
import ProjectSearch from "../../MyPage/ProjectSearch";
import ProjectPostList from "./ProjectPostList";
import AnalyzeScreen from "./AnalyzeScreen";

//남은 기능 : 게시글 작성, 게시글 찾기, 프로젝트 생성

const ProjectForum = () => {
    const {projectCode} = useParams();
    const [project, setProject] = useState(null);
    const [forum, setForum] = useState([]);
    const navigate = useNavigate();
    // const [leftDay, setLeftDay] = useState();
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
        const response = await axios.get(`http://localhost:8080/project/${projectCode}`,
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

    const handlePageChange = (page) => {    //페이지 누름
        setPage(page);  //여기서 시간이걸림
        sessionStorage.setItem('currentPage',page); 

    };
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
                    <h1>프로젝트 제목</h1>
                    <div className="container-top">
                        <ProjectOptionSelectMenu />
                        {/* <ProjectSearch/> */}
                    </div>
                    <AnalyzeScreen/>
                </div>
                <Pagination
                    activePage={page} // 현재 페이지
                    itemsCountPerPage={6} // 한 페이지랑 보여줄 아이템 갯수
                    totalItemsCount={6} // 총 아이템 갯수
                    pageRangeDisplayed={5} // paginator의 페이지 범위
                    prevPageText={"‹"} // "이전"을 나타낼 텍스트
                    nextPageText={"›"} // "다음"을 나타낼 텍스트
                    onChange={handlePageChange} // 페이지 변경을 핸들링하는 함수
            />
            </section>
        </section>
    )
}

export default ProjectForum;