import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ForumEditPage = () => {
    const location = useLocation();
    const { forum, userInfo } = location.state;
    const [forumTitle, setForumTitle] = useState(forum.forumTitle);
    const [forumContent, setForumContent] = useState(forum.forumContent);
    const navigate = useNavigate();

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.put(`http://localhost:8080/forum/edit/${forum.forumCode}`, 
            {
                forumTitle,
                forumContent
            },
            {
                headers: {
                    'Authorization': window.localStorage.getItem("token")
                }
            });
            console.log('게시글 수정');
            navigate(`/forum/${forum.forumCode}`); // 수정된 게시글 상세 화면으로 이동
        } catch (error) {
            console.error('게시글 수정 실패:', error);
        }
    };

    return (
        <form onSubmit={handleFormSubmit}>
            <div>
                <label>제목:</label>
                <input 
                    type="text" 
                    value={forumTitle} 
                    onChange={(e) => setForumTitle(e.target.value)} 
                />
            </div>
            <div>
                <label>내용:</label>
                <textarea 
                    value={forumContent} 
                    onChange={(e) => setForumContent(e.target.value)} 
                />
            </div>
            <button type="submit" className="btn btn-outline-primary">
                저장
            </button>
            <button type="button" className="btn btn-outline-secondary" onClick={() => navigate(`/forum/${forum.forumCode}`)}>
                취소
            </button>
        </form>
    );
};

export default ForumEditPage;
