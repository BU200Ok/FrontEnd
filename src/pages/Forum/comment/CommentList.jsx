import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import './Comment.css';

const CommentList = ({ forumCode }) => {
    const [comments, setComments] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchComments(forumCode);
    }, [forumCode]);


    const fetchComments = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/forum/comment/list/${forumCode}`, {
                headers: {
                    'Authorization': window.localStorage.getItem("token")
                }
            });
            console.log('댓글 조회 성공:', response.data.obj);
            setComments(response.data.obj || []);
        } catch (error) {
            console.error('댓글 조회 실패:', error);
            setComments([]);
        }
    };

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
            {comments.map(comment => (
                    <div key={comment.commentCode}>
                        <hr/>
                        <div className='comment-info'>
                            <p>{comment.accountName}{comment.accountPosition}</p>
                        </div>
                        <Card body className='comment-card'>
                            <p>{comment.commentContent}</p>
                            <div>
                            <button onClick={() => handleDeletePost(comment.commentCode)} className="btn btn-outline-danger"
                            style={{ textDecoration: 'none' }}>삭제</button>
                        </div>
                        </Card>
                        <hr/>
                    </div>
                ))}
        </div>
    );
};

export default CommentList;