import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import './Comment.css';
import CommentButton from './CommentButton';

const CommentList = ({ forumCode,currentUserAccountCode}) => {
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
                            <CommentButton 
                                forumCode={forumCode} 
                                currentUserAccountCode={currentUserAccountCode} 
                                comment={comment}
                            />
                        </div>
                        </Card>
                        <hr/>
                    </div>
                ))}
        </div>
    );
};

export default CommentList;