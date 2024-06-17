import React, { useEffect } from 'react';
import Pagination from 'react-js-pagination';
import { useNavigate } from 'react-router-dom';

const ProjectPosts = ({posts, page, setPage, projectCode}) => {
    const navigate = useNavigate();
    useEffect(() => {
        sessionStorage.setItem('currentPage', page);
    }, [page]);

    const handlePageChange = (pageNumber) => {
        setPage(pageNumber);
    };
    return (
        <div>
            <table>
                <thead>
                <tr>
                    <td>번호</td>
                    <td>상태</td>
                    <td>제목</td>
                    <td>작성일</td>
                    <td>업무 담당</td>
                </tr>
                </thead>
                <tbody>
                    {posts.length != 0 ? posts.map((item)=> (
                        <tr onClick={() => { navigate(`/project/${projectCode}/${item.taskCode}/tasks`) }}key={item.taskCode} >
                            <td>{item.taskCode}</td>
                            <td>{item.taskStatus}</td>
                            <td>{item.taskName}</td>
                            <td>{item.taskStart}</td>
                            <td>{item.accountName[0]}</td>
                        </tr>
                    ))
                    : <tr><td colSpan={5}>작성된 글이 없습니다.</td></tr>}
                    
                </tbody>
            </table>
            <div style={{margin: '0 auto'}}>
            <Pagination
                    activePage={page} // 현재 페이지
                    itemsCountPerPage={3} // 한 페이지랑 보여줄 아이템 갯수
                    totalItemsCount={posts.length} // 총 아이템 갯수
                    pageRangeDisplayed={5} // paginator의 페이지 범위
                    prevPageText={"‹"} // "이전"을 나타낼 텍스트
                    nextPageText={"›"} // "다음"을 나타낼 텍스트
                    onChange={handlePageChange} // 페이지 변경을 핸들링하는 함수
            />
            </div>
        </div>
    );
};

export default ProjectPosts;