import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const CommentButton = ({ forumCode, accountCode }) => {
    const [commentContent, setCommentContent] = useState('');
    const [comments, setComments] = useState([]);
    const navigate = useNavigate();



    const handleDeletePost = async (commentCode) => {
        try {
            await axios.delete(`http://localhost:8080/forum/comment/delete/${commentCode}`, {
                headers: {
                    'Authorization': window.localStorage.getItem("token")
                }
            });
            console.log('댓글 삭제 성공');
        } catch (error) {
            console.error('댓글 삭제 실패:', error);
        }
    };

    return (
        <div>
            (<button
            onClick={handleDeletePost}
            className="btn btn-outline-danger"
            style={{ textDecoration: 'none' }}>
            삭제
        </button>)
        </div>
    );
};

export default CommentButton;