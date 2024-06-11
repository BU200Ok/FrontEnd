import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CommentComponent = ({ forumCode, accountCode }) => {
    const [commentContent, setCommentContent] = useState('');
    const [comments, setComments] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchComments();
    }, []);

    const fetchComments = async () => {
        try {
            const response = await axios.get('http://localhost:8080/forum/comment/list', {
                headers: {
                    'Authorization': window.localStorage.getItem("token")
                }
            });
            console.log('댓글 조회 성공:', response.data.obj);
            setComments(response.data.obj);
        } catch (error) {
            console.error('댓글 조회 실패:', error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const newComment = {
                commentContent,
                forumCode: forumCode,
                accountCode: accountCode
            };
            console.log('aaa', newComment)
            const response = await axios.post('http://localhost:8080/forum/comment/create', newComment, {
                headers: {
                    'Authorization': window.localStorage.getItem("token")
                }
            });
            console.log('댓글 작성 성공:', response.data);
            fetchComments();
        } catch (error) {
            console.error('댓글 작성 실패:', error);
        }
    };

    const handleDelete = async (commentCode) => {
        try {
            await axios.delete(`http://localhost:8080/forum/comment/delete/${commentCode}`, {
                headers: {
                    'Authorization': window.localStorage.getItem("token")
                }
            });
            console.log('댓글 삭제 성공');
            fetchComments();
        } catch (error) {
            console.error('댓글 삭제 실패:', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="commentContent">Comment:</label>
                    <textarea
                        id="commentContent"
                        value={commentContent}
                        onChange={(e) => setCommentContent(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
            <div>
                {comments.map(comment => (
                    <div key={comment.commentCode}>
                        <p>{comment.commentContent}</p>
                        <button onClick={() => handleDelete(comment.commentCode)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CommentComponent;
