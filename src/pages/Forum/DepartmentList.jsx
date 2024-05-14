import React from 'react';
import ForumListComponent from './ForumListComponent';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from 'react-bootstrap/Nav';
import './ForumList.css';

const DepartmentList = ({forum}) => {
    return (
        <div>
            {/* <Nav justify variant="tabs" defaultActiveKey="/home">
                <Nav.Item>
                    <Nav.Link eventKey="link-1">전체</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-2">개발</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-3">디자인</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-4">고객 서비스</Nav.Link>
                </Nav.Item>
            </Nav> */}
            <br></br>
            <h1>부서별 게시판</h1>
            <hr></hr>
            <ForumListComponent forum={forum} />
        </div>
    );
};

export default DepartmentList;
