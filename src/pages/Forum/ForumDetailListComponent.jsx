import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import DeleteButton from './button/DeleteButton';
import UpdateButton from './button/UpdateButton';

const ForumDetailListComponent = () => {
    const location = useLocation();
    const { userInfo } = location.state || {};
    const { ForumCode } = useParams();
    const [forum, setForum] = useState(null);
    const navigate = useNavigate();

    const getAuthHeaders = () => {
        return {
            headers: {
                'Authorization': window.localStorage.getItem("token")
            }
        };
    };

    useEffect(() => {
        const fetchForumDetail = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/forum/${ForumCode}`, getAuthHeaders());
                setForum(response.data.obj);
                console.log('Fetched forum detail:', response.data.obj);
            } catch (error) {
                console.error('Error fetching forum detail:', error);
            }
        };

        fetchForumDetail();
    }, [ForumCode]);

    const formatDate = (dateTimeString) => {
        const date = new Date(dateTimeString);
        return date.toLocaleDateString(); // 로케일에 맞는 날짜 형식으로 변환
    };


    return (
        <div className="blog-post-container">
        <div className="author-info">
            {/* <img src={userInfo.userImage} alt={userInfo.accountName} className="author-image"/> */}
            <p className="author-name">{userInfo.accountName}</p>
            <p>{userInfo.teamName} {userInfo.accountPosition}</p>
        </div>
        <div className="post-content">
            <h1 className="post-title">제목: {forum?.forumTitle }</h1>
            <p className="post-date">작성일: {formatDate(forum?.forumCreateTime)}</p>
            <p className="post-type">유형: {forum?.forumType}</p>
            <div className="forum-content" dangerouslySetInnerHTML={{ __html: forum?.forumContent }}></div>
            <div className="action-buttons">
                {userInfo && (
                    <>
                        <DeleteButton forum={forum} />
                        <UpdateButton forum={forum} userAccountCode={userInfo.accountCode} />
                    </>
                )}
            </div>
        </div>
    </div>
    );
};

export default ForumDetailListComponent;
