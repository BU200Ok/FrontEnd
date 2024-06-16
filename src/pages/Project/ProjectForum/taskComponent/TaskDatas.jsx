import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import Pagination from 'react-js-pagination';
import { useParams } from 'react-router-dom';

const TaskDatas = () => {
    const params = useParams();
    const projectCode = params.projectCode;
    const projectForumCode = params.projectForumCode;
    const [taskFileDatas, setTaskFileDatas] = useState([]);
    const [page, setPage] = useState(1);
    useEffect(()=> {
        getDatas();
    }, [])
    const getDatas = async() => {
        try{
            const response = await axios.get(`http://localhost:8080/projects/${projectCode}/tasks/${projectForumCode}/task-files`,
                {
                    headers: {Authorization: localStorage.getItem('token')},
                    params: {
                        page: page - 1,
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
    const handlePageChange = (pageNumber) => {
        setPage(pageNumber);
    };
    return (
        <div>
            <Table className='data-table'>
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
                    : <tr>
                        <th colSpan={5}>자료가 없습니다</th>
                        </tr>}
                </tbody>
            </Table>
            <Pagination
                    activePage={page} // 현재 페이지
                    itemsCountPerPage={10} // 한 페이지랑 보여줄 아이템 갯수
                    totalItemsCount={taskFileDatas.length} // 총 아이템 갯수
                    pageRangeDisplayed={5} // paginator의 페이지 범위
                    prevPageText={"‹"} // "이전"을 나타낼 텍스트
                    nextPageText={"›"} // "다음"을 나타낼 텍스트
                    onChange={handlePageChange} // 페이지 변경을 핸들링하는 함수
            />
        </div>
    );
};

export default TaskDatas;