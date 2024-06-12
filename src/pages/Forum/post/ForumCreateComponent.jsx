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
    const [file, setFile] = useState([]);

    useEffect(() => {
        // console.log('Received Account Code:', accountCode);
    }, [location]);

    // 제목과 유형 입력 처리
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForum({ ...forum, [name]: value });
    };

    // 파일 입력 처리
    // const handleFileChange = (e) => {
    //     setFile(e.target.files[0]);
    // };

    // CKEditor 내용 입력 처리
    const handleEditorChange = (event, editor) => {
        const data = editor.getData();
        setForum({ ...forum, forumContent: data });
    };

    // 폼 제출 처리
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Submitting forum data:', forum);
        try {
            // 포럼 생성 요청
            const response = await axios.post('http://localhost:8080/forum/create', forum, {
                headers: {
                    'Authorization': window.localStorage.getItem("token")
                }
            });
            console.log('Forum created:', response.data);

            const forumCode = response.data.obj.forumCode;
            console.log('Forum', forumCode);
            // 파일 업로드 요청 
            if (file) {
                const formData = new FormData();
                formData.append('file', file);
                console.log('Appending file:', file.name);
                try {
                    const fileUploadResponse = await axios.post(`http://localhost:8080/forum-file/uploads/${forumCode}`, formData, {
                        headers: {
                            'Authorization': window.localStorage.getItem("token"),
                            'Content-Type': 'multipart/form-data'
                        }
                    });
                    console.log('바뀐 파일 이름은 ? :', fileUploadResponse.data);
                } catch (error) {
                    console.error('File upload failed:', error);
                }
            }

            openModalWithMessage('게시글 작성이 완료되었습니다.');
            navigate('/forum');
        } catch (error) {
            console.error('Creation failed:', error);
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
            <Form.Control className="mb-4"
                type="text"
                name="forumTitle"
                value={forum.forumTitle}
                onChange={handleChange}
                placeholder='제목을 입력하세요'
                aria-describedby="passwordHelpBlock"
            />
            <Form.Select className="mb-4"
                name="forumType"
                value={forum.forumType}
                onChange={handleChange}
            >
                <option value="">유형을 선택하세요</option>
                <option value="업데이트">기술</option>
                <option value="회의">회의</option>
                <option value="공지">공지</option>
            </Form.Select>
            <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>파일 첨부</Form.Label>
                <Form.Control type="file" name='file' multiple onChange={(e)=>{setFile(e.target.files[0]);}} />
            </Form.Group>
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