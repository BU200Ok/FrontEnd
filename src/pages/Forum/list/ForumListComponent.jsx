import React, {useState} from 'react';
import Table from 'react-bootstrap/Table';
import PaginationComponent from '../PagenationComponent'
import '../Forum.css';
import { useNavigate } from 'react-router-dom';

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

    const formatDate = (dateTimeString) => {
        const date = new Date(dateTimeString);
        return date.toLocaleDateString(); // 로케일에 맞는 날짜 형식으로 변환
    };

    return (
        <div>
            <Table striped bordered hover style={{ width: '100%' }}>
            <thead>
                <tr>
                    <th>Num</th>
                    <th>Type</th>
                    <th style={{ width: '80%' }}>Title</th>
                    <th style={{ width: '10%' }}>Created</th>
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
            <PaginationComponent
                currentPage={activePage}
                totalPages={numberOfPages}
                onPageChange={setActivePage}
            />
        </div>
    );
};

export default ForumListComponent;
