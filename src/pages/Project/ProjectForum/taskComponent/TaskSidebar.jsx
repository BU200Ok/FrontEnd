import React, { useEffect, useState } from 'react';
import LocationButton from '../../Component/LocationButton';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import ProjectMember from '../ProjectMember';
import './task.css';

const TaskSidebar = () => {
    const params = useParams();
    const projectCode = params.projectCode;
    const projectForumCode = params.projectForumCode;
    const [forum, setForum] = useState([]);
    // const [post,setPost] = useState([]);

    const navigate = useNavigate();
    useEffect(()=>{
        console.log(projectCode);
        // console.log("projectforumpostprojectforumpostprojectforumpostprojectforumpostprojectforumpost")
        // getPostData();
        getForumData();
    },[]);

    const getForumData = async () => {
        const response = await axios.get(`http://localhost:8080/projects/${projectCode}`,
        {
            headers: {Authorization: localStorage.getItem('token')}
        }
        )
        setForum(response.data.obj);
        console.log(response.data);
    }

    // const getPostData = async () => {
    //     const response = await axios.get(`http://localhost:8080/projects/tasks/${forumCode}/task-posts`,
    //     {
    //         headers: {Authorization: localStorage.getItem('token')}
    //     })
    //     console.log(response.data.obj);
    //     setPost(response.data.obj)
    // }
    return (
        <div style={{display: 'flex'}}>
            { forum.projectCode ? 
                    <section className="project-forum-sidebar" style={{padding: "20px"}}>
                        <LocationButton location={`/project/${projectCode}`}/>
                        <div className='task-side-bar-menus'>
                        <ol>
                            <li onClick={()=>navigate(`/project/${projectCode}/${projectForumCode}/tasks`)}>게시글</li>
                            <li onClick={()=>navigate(`/project/${projectCode}/${projectForumCode}/datas`)}>자료실</li>
                            <li onClick={()=>navigate(`/project/${projectCode}/${projectForumCode}/todos`)}>To Do List</li>
                            <ProjectMember projects = {forum} />
                        </ol>
                        
                        </div>
                    </section>
                : 
                <section className='project-forum-sidebar'>
                    <div>프로젝트 정보를 가져오지 못했습니다.</div>
                </section>
                }
            <Outlet/>
        </div>
    );
};

export default TaskSidebar;