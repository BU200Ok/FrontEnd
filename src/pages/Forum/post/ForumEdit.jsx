import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const ForumEditPage = () => {
    const location = useLocation();
    const { forum, userInfo } = location.state;
    const [forumTitle, setForumTitle] = useState(forum.forumTitle);
    const [forumContent, setForumContent] = useState(forum.forumContent);
    const [forumType, setForumType] = useState(forum.forumType);
    const navigate = useNavigate();

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.put(`http://localhost:8080/forum/edit/${forum.forumCode}`, 
            {
                forumTitle,
                forumContent,
                forumType,
                accountCode: userInfo.accountCode
            },
            {
                headers: {
                    'Authorization': window.localStorage.getItem("token")
                }
            });
            console.log('게시글 수정');
            navigate(`/forum`); // 수정된 게시글 상세 화면으로 이동
        } catch (error) {
            console.error('게시글 수정 실패:', error);
        }
    };

    return (
        <form onSubmit={handleFormSubmit}>
            <div className="post-container">
                <h1>게시글 수정</h1>
                <p>자유롭게 수정해보세요!</p>
                <hr />
                <br />
                <div className="form-group">
                    <label>제목:</label>
                    <input 
                        type="text" 
                        className="form-control mb-3"
                        value={forumTitle} 
                        onChange={(e) => setForumTitle(e.target.value)} 
                        placeholder="제목을 입력하세요"
                    />
                </div>
                <div className="form-group">
                    <label>유형:</label>
                    <input 
                        type="text" 
                        className="form-control mb-3"
                        value={forumType} 
                        onChange={(e) => setForumType(e.target.value)} 
                        placeholder="유형을 입력하세요"
                    />
                </div>
                <div className="form-group">
                    <label>내용:</label>
                    <CKEditor
                        editor={ClassicEditor}
                        config={{
                            placeholder: "내용을 입력하세요.",
                        }}
                        data={forumContent}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            setForumContent(data);
                        }}
                    />
                </div>
                <button type="submit" className="btn btn-outline-primary">
                    저장
                </button>
                <button type="button" className="btn btn-outline-secondary" onClick={() => navigate(`/forum`)}>
                    취소
                </button>
            </div>
        </form>
    );
};

export default ForumEditPage;
