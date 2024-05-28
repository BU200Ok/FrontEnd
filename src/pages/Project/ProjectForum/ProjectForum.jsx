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
    const [leftDay, setLeftDay] = useState();
    const [page, setPage] = useState(1);

    const value = useSelector((state)=>state.inputModalValue);
    useEffect(()=> {
        console.log(project);
    },[])
    useEffect(()=>{
        console.log(value);
    },[value])

    useEffect(()=>{
        if(project === null && projectCode){
            getSidebarData(projectCode);
            getForumData(projectCode);
        }
    },[projectCode])

    const getSidebarData = async () => {
        const response = await axios.get(`http://localhost:8080/project/project-sidebar?projectCode=${projectCode}`,
        {
            headers: {Authorization: localStorage.getItem('token')}
        }
        )
        setProject(response.data.obj);
        dayUtil(response.data.obj.projectEnd);
    }
    const getForumData = async () => {
        const response = await axios.get(`http://localhost:8080/project/project-forum-data?projectCode=${projectCode}`,
        {
            headers: {Authorization: localStorage.getItem('token')}
        }
        )
        setForum(response.data.obj);
        console.log(response.data);
    }
    const dayUtil = (end) => {
            const today = new Date();
            const endDate = new Date(end);
            const timeDiff = endDate - today;
            const days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
            setLeftDay(days);
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
            { project ? 
            <section className="project-forum-sidebar">
                <ProjectSidebar projects = {project} />
                {/* <LocationButton style={{marginTop:25}} location={'/project'}/>
                <div style={{fontSize:25,marginTop:30}}>프로젝트 게시판</div>
                <section className="project-forum-project-information">
                    <div style={{display:'flex'}}>
                        <div style={{fontSize:25,marginRight:29}}>{project.projectName}</div>
                        {
                            project.projectOpenStatus == 1 ?
                            (<img style={{pointerEvents:'none'}} src="./lock-open.png" width={30} height={30}/>)
                            :
                            (<img style={{pointerEvents:'none'}} src="./lock.png" width={30} height={30}/>)
                        }
                    </div>
                    <div style={{display:'flex',alignItems:'center'}}> */}
                        {/* <img src="./profile.png"/> */}
                        {/* <div style={{marginLeft:10,marginRight:137,width:100}}>{project.account.accountName}</div> */}
                        {/* <div  style={{display:'flex', flexDirection:'column',width:100}}>
                            <div>{project.account.team.department.departmentName}</div>
                            <div>{project.account.team.teamName}</div>
                        </div>
                    </div>
                    <div style={{display:'flex',marginTop:35,alignItems:'center'}}>
                        <div style={{fontSize:20, marginRight:20}}>마감기한</div>
                        <div>{project.projectEnd}</div>
                        {
                            leftDay < 0 ? (<div style={{marginLeft:50,color:'red'}}>마감</div>)
                            :
                            <div style={{marginLeft:50,color:'red'}}>{leftDay}일 남음</div>
                        }
                        
                    </div>
                    
                    <div className="project-">
                        <div></div>
                    </div>

                </section> */}
                {/* <ProjectMember projects = {project} leftDay = {leftDay}/> */}
                {/* <section className="project-sidebar-bottom-container">
                    <button onClick={addMember}>추가하기</button>
                    <div style={{textAlign:'start',fontSize:20}}>프로젝트 참여자</div>
                    <section className="project-sidebar-scrollable-container">
                    {
                        project.member.map((mem)=>(
                            <div className="project-sidebar-scrollable-member" key={mem.accountCode.accountCode} style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                                <div className="project-sidebar-profile-img">
                                </div>
                                <div>{mem.accountCode.accountName}</div>
                                <div>
                                    <div>
                                        <div style={{fontSize:14}}>{mem.accountCode.team.department.departmentName}</div>
                                        <div>{mem.accountCode.accountPosition}</div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                    </section>
                </section> */}
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