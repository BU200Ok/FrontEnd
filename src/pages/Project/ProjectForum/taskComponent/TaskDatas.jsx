import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { SSRProvider, Table } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const TaskDatas = () => {
    const params = useParams();
    const projectCode = params.projectCode;
    const projectForumCode = params.projectForumCode;
    const [taskFileDatas, setTaskFileDatas] = useState([]);
    useEffect(()=> {
        getDatas();
    }, [])
    const getDatas = async() => {
        try{
            const response = await axios.get(`http://localhost:8080/projects/${projectCode}/tasks/${projectForumCode}/task-files`,
                {
                    headers: {Authorization: localStorage.getItem('token')},
                    params: {
                        page: 0,
                    }
                }
                )
            console.log(response);
            setTaskFileDatas(response.data.obj);
        }
        catch(err){
            console.error(err);
        }
    }
    
    return (
        <div>
            <SSRProvider>
                <Table>
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>제목</th>
                            <th>작성일</th>
                            <th>엄무 담당</th>
                            <th>다운로드</th>
                        </tr>
                    </thead>
                    <tbody>
                        {taskFileDatas.length > 0 ?
                        taskFileDatas.map((item, index)=> 
                            (
                                <tr key={item.taskPostCode}>
                                    <th>{item.taskPostCode}</th>
                                    <th>{item.taskFileName}</th>
                                    <th>{item.taskPostTime}</th>
                                    <th>{item.accountName}</th>
                                    <th>다운로드</th>
                                </tr>
                            )
                        )
                        : <tr >
                            <th colSpan={5}>자료가 없습니다</th>
                            </tr>}
                    </tbody>
                </Table>
            </SSRProvider>
        </div>
    );
};

export default TaskDatas;