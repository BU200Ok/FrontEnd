import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import ForumListComponent from './ForumListComponent';
import MyInfoComponent from '../MyInfoComponent';
import '../Forum.css';

const DepartmentList = ({ forum }) => {
    const [userInfo, setUserInfo] = useState({});
    const navigate = useNavigate();

    const handleCreatePost = () => {
        console.log('accountCode:', userInfo.accountCode);
        navigate('/create', { state: { accountCode: userInfo.accountCode } });
    };

    return (
        <div>
            <div className="header">
                <h1>부서게시판</h1>
                <hr/>
            </div>
            <div className="layout-container">
                <section className="user-info">
                    <MyInfoComponent setUserInfo={setUserInfo} userInfo={userInfo} />
                    <div className="button-container">
                        <button
                            onClick={handleCreatePost}
                            className="btn btn-outline-success"
                            style={{ textDecoration: 'none' }}
                        >
                            게시글 작성
                        </button>
                    </div>
                </section>
                <section className="main-content">
                    <ForumListComponent forum={forum} userInfo={userInfo} />
                </section>
            </div>
        </div>
    );
};

export default DepartmentList;
