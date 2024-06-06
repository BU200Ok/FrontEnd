import React, { useEffect, useState } from 'react';
import Progress from './Progress';
import Inprogress from './Inprogress';
import OpenStatus from './OpenStatus';
import ProjectPosts from './ProjectPosts';
import axios from 'axios';
import Pagination from "react-js-pagination";
import DesignMenu from './projectTaskTypeMenus/DesignMenu';
import ImplementMenu from './projectTaskTypeMenus/ImplementMenu';
import AnalyzeMenu from './projectTaskTypeMenus/AnalyzeMenu';
import OutputsMenu from './projectTaskTypeMenus/OutputsMenu';
import TestMenu from './projectTaskTypeMenus/TestMenu';

const AnalyzeScreen = ({projectCode, projectOption}) => {
    const [anyPost, setAnyPost] = useState("needs");
    const [page, setPage] = useState(1);

    const [projectPosts, setProjectPosts] = useState([]);

    const [projectDoneTasks, setProjectDoneTasks] = useState([]);
    const [projectInprogressTasks, setProjectInprogressTasks] = useState([]);
    const [projectTodoTasks, setProjectTodoTasks] = useState([]);
    const handlePageChange = (page) => {    //페이지 누름
        setPage(page);  //여기서 시간이걸림
        sessionStorage.setItem('currentPage',page); 
    };

    useEffect(()=> {
        getTaskListData();
    }, [projectOption]);
    useEffect(()=>{
        getPostData();
    }, [anyPost,page]);
    const getPostData = async() => {
        try{
            const response = await axios.get(`http://localhost:8080/projects/${projectCode}/tasks/${projectOption}/${anyPost}`,{
                headers: {Authorization: localStorage.getItem('token')},
                params: {
                    page: page - 1,
                }
            });
            console.log(response.data.obj.content);
            setProjectPosts(response.data.obj.content);
        }
        catch(err){
            console.error(err);
        }
    }
    const getTaskListData = async() => {
        try{
            const response = await axios.get(`http://localhost:8080/projects/${projectCode}/tasks/${projectOption}`,{
                headers: {Authorization: localStorage.getItem('token')},
            });
            console.log(response.data.obj);
            setProjectDoneTasks(response.data.obj.doneTasks);
            setProjectInprogressTasks(response.data.obj.inProgressTasks);
            setProjectTodoTasks(response.data.obj.todoTasks);
        }
        catch(err){
            console.error(err);
        }
    }

    const renderMenu = () => {
        switch (projectOption) {
            case 1:
                return <AnalyzeMenu setAnyPost={setAnyPost} />;
            case 2:
                return <DesignMenu setAnyPost={setAnyPost} />;
            case 3:
                return <ImplementMenu setAnyPost={setAnyPost} />;
            case 4:
                return <TestMenu setAnyPost={setAnyPost} />;
            case 5:
                return <OutputsMenu setAnyPost={setAnyPost} />;
            default:
                return null;
        }
    }

    return (
        <div>
            <div className='project-info-area'>
                <Progress tasks = {projectDoneTasks}/>
                <Inprogress tasks = {projectInprogressTasks}/>
                <OpenStatus tasks = {projectTodoTasks}/>
            </div>
            <br></br>
            {renderMenu()}
            <ProjectPosts posts={projectPosts}/>
            <Pagination
                    activePage={page} // 현재 페이지
                    itemsCountPerPage={6} // 한 페이지랑 보여줄 아이템 갯수
                    totalItemsCount={6} // 총 아이템 갯수
                    pageRangeDisplayed={5} // paginator의 페이지 범위
                    prevPageText={"‹"} // "이전"을 나타낼 텍스트
                    nextPageText={"›"} // "다음"을 나타낼 텍스트
                    onChange={handlePageChange} // 페이지 변경을 핸들링하는 함수
            />
        </div>
    );
};

export default AnalyzeScreen;