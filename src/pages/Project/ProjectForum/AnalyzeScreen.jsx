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
import Search from './Search';

const AnalyzeScreen = ({projectCode, projectOption}) => {
    const [anyPost, setAnyPost] = useState("needs");
    const [page, setPage] = useState(1);

    const [projectPosts, setProjectPosts] = useState([]);

    const [projectDoneTasks, setProjectDoneTasks] = useState([]);
    const [projectInprogressTasks, setProjectInprogressTasks] = useState([]);
    const [projectTodoTasks, setProjectTodoTasks] = useState([]);
    

    useEffect(()=> {
        setPage(1);
        getTaskListData();
        switch(projectOption){
            case 2:
                return setAnyPost("architecture");
            case 3:
                return setAnyPost("prototype");
            case 4:
                return setAnyPost("test");
            case 5:
                return setAnyPost("menual");
            default :
                return setAnyPost("needs");
        }
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
                return <AnalyzeMenu setAnyPost={setAnyPost} setPage={setPage}/>;
            case 2:
                return <DesignMenu setAnyPost={setAnyPost} setPage={setPage}/>;
            case 3:
                return <ImplementMenu setAnyPost={setAnyPost} setPage={setPage}/>;
            case 4:
                return <TestMenu setAnyPost={setAnyPost} setPage={setPage}/>;
            case 5:
                return <OutputsMenu setAnyPost={setAnyPost} setPage={setPage}/>;
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
            <div style={{display:'flex'}}>
                {renderMenu()}
                <Search setSearchResult = {setProjectPosts} projectCode={projectCode} projectOption={projectOption} anyPost={anyPost} page={page-1}/>
            </div>
            <ProjectPosts posts={projectPosts} page={page} setPage={setPage} projectCode={projectCode}/>
            
        </div>
    );
};

export default AnalyzeScreen;