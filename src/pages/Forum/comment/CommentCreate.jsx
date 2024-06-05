import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const CommentCreate = ({ forumCode, accountCode }) => {
    const [commentContent, setCommentContent] = useState('');
    const [comments, setComments] = useState([]);
    const navigate = useNavigate();


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
        } catch (error) {
            console.error('댓글 작성 실패:', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>댓글을 작성해보세요 !</Form.Label>
                    <Form.Control as="textarea" 
                    id="commentContent"
                    value={commentContent}
                    onChange={(e) => setCommentContent(e.target.value)}
                    required
                    rows={3} />
                </Form.Group>   
                <Button variant="success"type="submit" >작성</Button>{' '}
            </form>
        </div>
    );
};

export default CommentCreate;