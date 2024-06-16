import React, { useEffect, useState } from 'react';
import TeamTodoList from './TeamTodoList';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import MyTodoList from './MyTodoList';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const TaskTodoList = () => {
    const params = useParams();
    const projectCode = params.projectCode;
    const projectForumCode = params.projectForumCode;

    const [projectTodoLists, setProjectTodoLists] = useState([]);
    const [myTodoLists, setMyTodoLists] = useState([]);
    useEffect(()=> {
        getAllTodoList();
    }, []);
    const getAllTodoList = async() => {
        try{
            const response = await axios.get(`http://localhost:8080/projects/${projectCode}/tasks/${projectForumCode}/todolists`,
                {
                    headers: {Authorization: localStorage.getItem('token')},
                }
            );
            const response2 = await axios.get(`http://localhost:8080/projects/${projectCode}/tasks/${projectForumCode}/myTodolists`,
                {
                    headers: {Authorization: localStorage.getItem('token')},
                }
            );
            console.log(response.data.obj);
            setProjectTodoLists(response.data.obj);
            setMyTodoLists(response2.data.obj)
        }
        catch(err){
            console.error(err);
        }
    }

    const [todoContent, setTodoContent] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:8080/projects/${projectCode}/tasks/${projectForumCode}/todolists/add`, {todoListContent: todoContent, todoListEnd: endDay}, {
                headers: {
                    'Authorization': window.localStorage.getItem("token")
                }
            });
            console.log('task created:', response.data);
            getAllTodoList();
        } catch (error) {
            console.error('Creation failed:', error);
        }
    };
    const handleEditorChange = (event, editor) => {
        const data = editor.getData();
        setTodoContent(data);
    };
    const[endDay, setEndDay] = useState(new Date());
    return (
        <div style={{display: 'flex', flexDirection: 'column', height:"100%", justifyContent:"space-between"}}>
            <h1 style={{marginTop: "30px"}}>Team TODO LIST</h1>
            <hr></hr>
            <TeamTodoList projectTodoLists={projectTodoLists}/>
            <h1 style={{marginTop: "30px"}}>My TODO LIST</h1>
            <hr></hr>
            <MyTodoList myTodoLists={myTodoLists}/>
            
            <form onSubmit={handleSubmit}>
                <div>
                    <DatePicker
                        selected={endDay}
                        onChange={(date) => setEndDay(date)}
                        //커스텀
                    />
                    <CKEditor
                    editor={ClassicEditor}
                    data={todoContent}
                    onChange={handleEditorChange}
                    onBlur={(event, editor) => {
                        console.log('Blur.', editor);
                    }}
                    onFocus={(event, editor) => {
                        console.log('Focus.', editor);
                    }}
                    onReady={editor => {
                        console.log('Editor is ready to use!', editor);
                    }}
                    config={{
                        placeholder: "내용을 입력하세요.",
                    }}
                    />
                    <button type="submit">작성</button>
                </div>
            </form>
        </div>
    );
};

export default TaskTodoList;