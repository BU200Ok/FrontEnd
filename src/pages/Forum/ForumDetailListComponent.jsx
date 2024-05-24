import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation  } from 'react-router-dom';
import axios from 'axios';
import { openModalWithMessage } from '../Modal/modalFunc'; // modalFunc 경로 수정
import MessageModal from '../Modal/MessageModal';

const ForumDetailListComponent = () => {
    const location = useLocation();
    const { userInfo } = location.state || {};
    const { ForumCode } = useParams();
    const [forum, setForum] = useState(null);
    const navigate = useNavigate();
    // useEffect(()=> {
    //     console.log(location.state.userInfo);
        
    // }, [])

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

    const handleDeletePost = async () => {
        try {
            await axios.delete(`http://localhost:8080/forum/delete/${ForumCode}`, getAuthHeaders());
            console.log('게시글 삭제');
            openModalWithMessage('게시글이 삭제되었습니다.');
            navigate('/forum');
        } catch (error) {
            console.error('게시글 삭제 실패:', error);
            openModalWithMessage('게시글 삭제 실패했습니다.');
        }
    };

    if (!forum) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{forum.forumTitle}</h1>
            <p>{<div dangerouslySetInnerHTML={{ __html: forum.forumContent}}></div>}</p>
            <p><strong>Type:</strong> {forum.forumType}</p>
            <p><strong>Created:</strong> {forum.forumCreateTime}</p>
            <div className="d-grid gap-2">
            {(userInfo && forum.accountCode === userInfo.accountCode) && (
                <button
                    onClick={handleDeletePost}
                    className="btn btn-outline-danger"
                    style={{ textDecoration: 'none' }}>
                    삭제
                </button>
                )}
            </div>
        </div>
    );
};

export default ForumDetailListComponent;
