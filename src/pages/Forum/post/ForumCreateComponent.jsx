import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {openModalWithMessage}  from '../../Modal/modalFunc';
import MessageModal from '../../Modal/MessageModal';
import style from './post.css';

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
        // const plainText = data.replace(/<\/?[^>]+(>|$)/g, "");
        // setForum({ ...forum, forumContent: plainText });
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
        <form onSubmit={handleSubmit} className={style.forum}>
            <input
                className={style.title_input}
                type="text"
                placeholder="제목"
                name="forumTitle"
                value={forum.forumTitle}
                onChange={handleChange}
            />
            <input
                className={style.title_input}
                type="text"
                placeholder="유형"
                name="forumType"
                value={forum.forumType}
                onChange={handleChange}
            />
            <CKEditor
                editor={ClassicEditor}
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
            <button type="submit" className={style.submit_button}>게시글 작성</button>
        </form>
    );
};

export default ForumCreateComponent;
