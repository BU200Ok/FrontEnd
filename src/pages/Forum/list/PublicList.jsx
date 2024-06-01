import React from 'react';
import ForumListComponent from './ForumListComponent'
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from 'react-bootstrap/Nav';

const DepartmentList = ({forum}) => {

    return (
        <div>
            <br></br>
            <h1>공지사항</h1>
            <hr></hr>
            <ForumListComponent forum={forum} />
        </div>
    );
    
};

export default DepartmentList;
