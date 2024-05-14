import React, {useState} from 'react';
import Table from 'react-bootstrap/Table';
import PaginationComponent from '../PagenationComponent'


const ForumListComponent = ({forum}) => {
    const [activePage, setActivePage] = useState(1);
    const itemsPerPage = 15;

    // 총 페이지 수 계산
    const numberOfPages = Math.ceil(forum.length / itemsPerPage);
    // 현재 페이지에 해당하는 포럼 데이터 필터링
    const currentForumData = forum.slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage);

    return (
        <div>
            <Table striped bordered hover>
            <thead>
                <tr>
                <th>Type</th>
                <th>Title</th>
                <th>Content</th>
                <th>Created</th>
                </tr>
            </thead>
            <tbody>
                    {currentForumData.map(item => (
                        <tr key={item.forumCode} style={{ borderBottom: '1px solid #ccc' }}>
                            <td>{item.forumType}</td>
                            <td>{item.forumTitle}</td>
                            <td>{item.forumContent}</td>
                            <td>{item.forumCreateTime}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <PaginationComponent
                activePage={activePage}
                numberOfPages={numberOfPages}
                onPageChange={setActivePage}
            />
        </div>
    );
};

export default ForumListComponent;
