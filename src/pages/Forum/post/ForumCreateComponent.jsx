import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {openModalWithMessage}  from '../../Modal/modalFunc';
import Form from 'react-bootstrap/Form';
import style from './post.css'

const ForumCreateComponent = () => {
    const location = useLocation();
    const { accountCode } = location.state || {}; // accountCode를 받아옴
    const navigate = useNavigate();
    const [forum, setForum] = useState({
        forumTitle: '',
        forumContent: '',
        forumType: '',
        accountCode: accountCode || ''  // account 객체로 설정
    });

    useEffect(() => {
        console.log('Location state:', location.state);
        console.log('Received Account Code:', accountCode);
    }, [location]);

    // 제목과 유형 입력 처리
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForum({ ...forum, [name]: value });
    };

    // CKEditor 내용 입력 처리
    const handleEditorChange = (event, editor) => {
        const data = editor.getData();
        setForum({ ...forum, forumContent: data });
    };

    // 폼 제출 처리
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Submitting forum data:', forum); // 제출 데이터 확인
        try {
            const response = await axios.post('http://localhost:8080/forum/create', forum, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': window.localStorage.getItem("token")
                }
            });
            console.log('폼 생성:', response.data);
            openModalWithMessage('게시글 작성이 완료되었습니다.');
            navigate('/forum');
        } catch (error) {
            console.error('생성 실패:', error);
            openModalWithMessage('게시글 작성에 실패했습니다.');
        }
    };

    return (
        <div>
        <forum onSubmit={handleSubmit} className={style.forum}>
            <div className='post-container'>
            <h1> 게시글 작성</h1>
            <p>자유롭게 작성해보세요 !</p>
            <hr/>   
            <br/>

            <Form.Control className="mb-5"
                type="text"
                name="forumTitle"
                value={forum.forumTitle}
                onChange={handleChange}
                placeholder='제목을 입력하세요'
                aria-describedby="passwordHelpBlock"
            />
            <Form.Control className="mb-5"
                type="text"
                name="forumType"
                value={forum.forumType}
                onChange={handleChange}
                placeholder='유형을 입력하세요'
                aria-describedby="passwordHelpBlock"
            />
            <CKEditor
                editor={ClassicEditor}
                config={{
                    placeholder: "내용을 입력하세요.",
                }}
                data={forum.forumContent}
                onReady={editor => {
                    console.log('Editor is ready to use!', editor);
                }}
                onChange={handleEditorChange}
                onBlur={(event, editor) => {
                    console.log('Blur.', editor);
                }}
                onFocus={(event, editor) => {
                    console.log('Focus.', editor);
                }}
            />
            
            </div>
            <div className="button">
                <button
                    onClick={handleSubmit}
                    className="btn btn-outline-success"
                    style={{ textDecoration: 'none' }}
                >
                    작성
                </button >
            </div>
        </forum>
        </div>
    );
};

export default ForumCreateComponent;
