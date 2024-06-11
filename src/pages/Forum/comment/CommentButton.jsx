import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { openModalWithMessage } from '../../Modal/modalFunc';


const CommentButton = ({ forumCode, currentUserAccountCode, comment }) => {
    const navigate = useNavigate();

    const handleDeletePost = async () => {
        try {
            const response = await axios.delete(`http://localhost:8080/forum/comment/delete/${comment.commentCode}`, {
                headers: {
                    'Authorization': window.localStorage.getItem("token")
                }
            });
            console.log('댓글 삭제 성공' , response.data);
            openModalWithMessage('댓글이 삭제되었습니다.');
            navigate('/forum');
        } catch (error) {
            console.error('댓글 삭제 실패:', error);
            openModalWithMessage('댓글이 삭제되었습니다.');
        }
    };

    // 현재 사용자가 댓글 작성자인지 확인
    const isAuthor = currentUserAccountCode === comment.account;

    return (
        <div>
            {isAuthor && (
                <button
                    onClick={handleDeletePost}
                    className="btn btn-outline-danger"
                    style={{ textDecoration: 'none' }}>
                    삭제
                </button>
            )}
        </div>
    );
};

export default CommentButton;