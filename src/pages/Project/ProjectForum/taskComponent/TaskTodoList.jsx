import React, { useEffect } from 'react';
import TeamTodoList from './TeamTodoList';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const TaskTodoList = () => {
    const params = useParams();
    const projectCode = params.projectCode;
    const projectForumCode = params.projectForumCode;
    useEffect(()=> {
        getAllTodoList();
    }, []);
    const getAllTodoList = async() => {
        try{
            const response = await axios.get(`http://localhost:8080/projects/${projectCode}/tasks/${projectForumCode}/todolists`,
                {
                    headers: {Authorization: localStorage.getItem('token')},
                    // params: {
                    //     page: 0,
                    // }
                }
            );
            console.log(response);
        }
        catch(err){
            console.error(err);
        }
    }
    return (
        <div>
            <h1>Team TODO LIST</h1>
            <hr></hr>
            <TeamTodoList/>
        </div>
    );
};

export default TaskTodoList;