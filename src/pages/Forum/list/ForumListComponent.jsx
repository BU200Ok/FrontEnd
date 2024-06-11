import React, {useState, } from 'react';
import Table from 'react-bootstrap/Table';
import '../Forum.css';
import { useNavigate } from 'react-router-dom';
import Pagination from "react-js-pagination";


const ForumListComponent = ({forum, userInfo}) => {
    const [activePage, setActivePage] = useState(1);
    const itemsPerPage = 10;
    const navigate = useNavigate();

    // 데이터 내림차순 정렬
    const sortedForum = [...forum].sort((a, b) => new Date(b.forumCreateTime) - new Date(a.forumCreateTime));

    // 총 페이지 수 계산
    const numberOfPages = Math.ceil(sortedForum.length / itemsPerPage);
    // 현재 페이지에 해당하는 포럼 데이터 필터링
    const currentForumData = sortedForum.slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage);

    const handleRowClick = (forumCode) => {
        navigate(`/forum/${forumCode}`, { state: { userInfo } });
    };


    const handlePageChange = (pageNumber) => {
        setActivePage(pageNumber);
    };

    const formatDate = (dateTimeString) => {
        const date = new Date(dateTimeString);
        return date.toLocaleDateString(); // 로케일에 맞는 날짜 형식으로 변환
    };

    return (
        <>
        <div className='forum-list-container'>
            <Table striped bordered hover className='forum-table'>
                <thead>
                    <tr>
                        <th>Num</th>
                        <th>Type</th>
                        <th >Title</th>
                        <th >Created</th>
                    </tr>
                </thead>
                <tbody>
                    {currentForumData.map(item => (
                        <tr key={item.forumCode} onClick={() => handleRowClick(item.forumCode)} style={{ cursor: 'pointer', borderBottom: '1px solid #ccc' }}>
                            <td>{item.forumCode}</td>
                            <td>{item.forumType}</td>
                            <td>{item.forumTitle}</td>
                            <td>{formatDate(item.forumCreateTime)}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <div className="pagination-wrapper">
                <div className="pagination-container">
                    <Pagination
                        activePage={activePage} // 현재 페이지
                        itemsCountPerPage={itemsPerPage} // 한 페이지랑 보여줄 아이템 갯수
                        totalItemsCount={forum.length} // 총 아이템 갯수
                        pageRangeDisplayed={4} // paginator의 페이지 범위
                        prevPageText={"‹"} // "이전"을 나타낼 텍스트
                        nextPageText={"›"} // "다음"을 나타낼 텍스트
                        onChange={handlePageChange} // 페이지 변경을 핸들링하는 함수
                    />
                </div>
            </div>
        </div>
        
        </>
    );
};

export default ForumListComponent;
