import React, {useState} from 'react';
import ForumListComponent from './ForumListComponent';
import 'bootstrap/dist/css/bootstrap.min.css';
import ForumCreateComponent from '../post/ForumCreateComponent';


const DepartmentList = ({forum}) => {
    return (
        <div>
            <br/>
            <h1>부서별 게시판</h1>
            <hr/>
            <ForumListComponent forum={forum} />
        </div>
    );
};

export default DepartmentList;
