import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {openModalWithMessage}  from '../../Modal/modalFunc';
import Form from 'react-bootstrap/Form';
import style from '../../../pages/Forum/post/post.css';



const CreateTask = () => {
    const params = useParams();
    const projectCode = params.projectCode;
    const location = useLocation();
    const navigate = useNavigate();
    const [forum, setForum] = useState({
        taskName: '', //제목
        taskDetail: '', //내용
        taskType: '1', //분석 설계 구현 등등..
        taskTypeDetail: 'needs', // swot 등등..
        taskStatus: '진행예정', //진행 상태
    });

    useEffect(() => {
        // forumType이 변경될 때마다 taskTypeDetail을 기본값으로 설정
        const options = getTaskTypeDetailOptions(forum.taskType);
        if (options.length > 0) {
            setForum((prevState) => ({
                ...prevState,
                taskTypeDetail: options[0].props.value
            }));
        }
    }, [forum.taskType]);
    const getTaskTypeDetailOptions = (taskType) => {
        switch (taskType) {
            case '1':
                return [
                    <option value="needs" key="needs">요구분석</option>,
                    <option value="environment" key="environment">환경분석</option>,
                    <option value="swot" key="swot">SWOT</option>
                ];
            case '2':
                return [
                    <option value="architecture" key="architecture">아키텍쳐</option>,
                    <option value="db" key="db">DB 구조 설계</option>
                ];
            case '3':
                return [
                    <option value="prototype" key="prototype">프로토 타입</option>,
                    <option value="front" key="front">프론트엔드</option>,
                    <option value="backend" key="backend">백엔드</option>
                ];
            case '4':
                return [
                    <option value="test" key="test">단위 테스트</option>
                ];
            case '5':
                return [
                    <option value="manual" key="manual">사용자 메뉴얼</option>,
                    <option value="maintenance" key="maintenance">유지보수</option>
                ];
            default:
                return [];
        }
    };


    
    // 제목과 유형 입력 처리
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForum({ ...forum, [name]: value });
    };

    // CKEditor 내용 입력 처리
    const handleEditorChange = (event, editor) => {
        const data = editor.getData();
        setForum({ ...forum, taskDetail: data });
    };

    // 폼 제출 처리
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Submitting forum data:', forum);
        try {
            // 포럼 생성 요청
            const response = await axios.post(`http://localhost:8080/projects/${projectCode}/tasks/${forum.taskType}/${forum.taskTypeDetail}/add`, forum, {
                headers: {
                    'Authorization': window.localStorage.getItem("token")
                }
            });
            console.log('task created:', response.data);

            const forumCode = response.data.obj.forumCode;
            console.log('Forum', forumCode);

            openModalWithMessage('게시글 작성이 완료되었습니다.');
            navigate(`/project/${projectCode}`);
        } catch (error) {
            console.error('Creation failed:', error);
            openModalWithMessage('게시글 작성에 실패했습니다.');
        }
    };

    return (
        <div>
        <forum onSubmit={handleSubmit} className={style.forum}>
            <div className='post-container'>
            <h1>TASK 작성</h1>
            <hr/>   
            <br/>
            <Form.Control className="mb-4"
                type="text"
                name="taskName"
                value={forum.taskName}
                onChange={handleChange}
                placeholder='제목을 입력하세요'
                aria-describedby="passwordHelpBlock"
            />
            <Form.Select className="mb-4"
                name="taskType"
                value={forum.taskType}
                onChange={handleChange}
            >
                <option value="1">분석</option>
                <option value="2">설계</option>
                <option value="3">구현</option>
                <option value="4">테스트</option>
                <option value="5">산출물</option>
            </Form.Select>
            <Form.Select className="mb-4"
                name="taskTypeDetail"
                value={forum.taskTypeDetail}
                onChange={handleChange}
            >
                {getTaskTypeDetailOptions(forum.taskType)}
            </Form.Select>
            <Form.Select className="mb-4"
                name="taskStatus"
                value={forum.taskStatus}
                onChange={handleChange}
            >
                <option value="진행예정">진행예정</option>
                <option value="진행중">진행중</option>
                <option value="진행완료">진행완료</option>
            </Form.Select>
            <CKEditor
                editor={ClassicEditor}
                config={{
                    placeholder: "내용을 입력하세요.",
                }}
                data={forum.taskDetail}
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

export default CreateTask;