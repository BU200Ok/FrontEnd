import React from 'react';
import axios from 'axios';
import { openModalWithMessage } from '../../Modal/modalFunc';
import { useNavigate } from 'react-router-dom';

const DeleteButton = ({forum}) => {
    const navigate = useNavigate();

    
    const handleDeletePost = async () => {
        // if (!isAuthor) {
        //     openModalWithMessage('게시글 삭제 권한이 없습니다.');
        // }
        try {
            await axios.delete(`http://localhost:8080/forum/delete/${forum.forumCode}`, {
            headers: {
                'Authorization': window.localStorage.getItem("token")  // 여기에 토큰 추가
            }
        });
            console.log('게시글 삭제');
            openModalWithMessage('게시글이 삭제되었습니다.');
            navigate('/forum');
        } catch (error) {
            console.error('게시글 삭제 실패:', error);
            openModalWithMessage('게시글 삭제 실패했습니다.');
        }
    };

    return (
        (<button
            onClick={handleDeletePost}
            className="btn btn-outline-danger"
            style={{ textDecoration: 'none' }}>
            삭제
        </button>)
    );
};

export default DeleteButton;
