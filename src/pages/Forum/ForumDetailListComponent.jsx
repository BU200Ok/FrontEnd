import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import DeleteButton from './button/DeleteButton';
import UpdateButton from './button/UpdateButton';
import style from './ForumDetail.css';

const ForumDetailListComponent = () => {
    const location = useLocation();
    const { userInfo } = location.state || {};
    const { ForumCode } = useParams();
    const forumToEdit = location.state?.forum;
    const [forum, setForum] = useState({
        forumTitle: forumToEdit?.forumTitle || '',
        forumContent: forumToEdit?.forumContent || '',
        forumType: forumToEdit?.forumType || '',
        accountCode: location.state?.userInfo?.accountCode || ''
    });
    


    useEffect(() => {
        const fetchForumDetail = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/forum/${ForumCode}`, {
                headers: {
                    'Authorization': window.localStorage.getItem("token")  // 여기에 토큰 추가
                }
            });
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

    const isAuthor = userInfo?.accountCode === forum?.accountCode;


    return (
        <div className="forum-container">
            <div className="author-info">
                {/* <img src={userInfo.userImage} alt={userInfo.accountName} className="author-image"/> */}
                <p className="author-name">{userInfo?.accountName}</p>
                <p>{userInfo?.teamName} {userInfo?.accountPosition}</p>
            </div>
            <div className="post-content">
                <h1 className="post-title">제목: {forum?.forumTitle }</h1>
                <p className="post-date">작성일: {formatDate(forum?.forumCreateTime)}</p>
                <p className="post-type">유형: {forum?.forumType}</p>
                <hr/>
                <div className="forum-content" dangerouslySetInnerHTML={{ __html: forum?.forumContent }}></div>
                <div className="action-buttons">
                    {isAuthor && (
                        <div>
                            <DeleteButton forum={forum} userInfo={userInfo}/>
                            <UpdateButton forum={forum} userInfo={userInfo} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ForumDetailListComponent;
