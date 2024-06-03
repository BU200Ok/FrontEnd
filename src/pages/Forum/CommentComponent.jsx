import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CommentComponent = ({ forumCode }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    useEffect(() => {
        fetchComments();
    }, [forumCode]);

    const fetchComments = async () => {
        try {
            const response = await axios.get(`/api/comments/forum/${forumCode}`);
            setComments(response.data);
        } catch (error) {
            console.error("Failed to fetch comments", error);
        }
    };

    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        try {
            const accountCode = window.localStorage.getItem("accountCode"); // 예: 사용자 ID를 로컬 스토리지에서 가져옴
            await axios.post(`/api/comments/forum/${forumCode}?accountCode=${accountCode}`, 
                { content: newComment }, // 객체로 전송
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': window.localStorage.getItem("token")
                    }
                }
            );
            setNewComment("");
            fetchComments();
        } catch (error) {
            console.error("Failed to submit comment", error);
        }
    };

    return (
        <div>
            <form onSubmit={handleCommentSubmit}>
                <textarea
                    value={newComment}
                    onChange={handleCommentChange}
                    placeholder="댓글을 입력하세요"
                />
                <button type="submit">댓글 작성</button>
            </form>
            <ul>
                {comments.map(comment => (
                    <li key={comment.commentCode}>{comment.commentContext}</li>
                ))}
            </ul>
        </div>
    );
};

export default CommentComponent;
