import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import DeleteButton from './button/DeleteButton';
import UpdateButton from './button/UpdateButton';
import './ForumDetail.css';
import CommentCreate from './comment/CommentCreate';
import CommentList from './comment/CommentList';
import FileDownload from './file/FileDownload';


const ForumDetailListComponent = () => {
    const location = useLocation();
    const { userInfo } = location.state || {};
    const { ForumCode } = useParams();
    const forumToEdit = location.state?.forum;
    const [files, setFiles] = useState([]);
    const [forum, setForum] = useState({
        forumTitle: forumToEdit?.forumTitle || '',
        forumContent: forumToEdit?.forumContent || '',
        forumType: forumToEdit?.forumType || '',
        accountCode: location.state?.userInfo?.accountCode || ''
    });
    

    useEffect(() => {
        const fetchForumDetail = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/forum/${ForumCode}`, {
                headers: {
                    'Authorization': window.localStorage.getItem("token")  // 여기에 토큰 추가
                }
            });
                setForum(response.data.obj);
                console.log('Fetched forum detail:', response.data.obj);
            } catch (error) {
                console.error('Error fetching forum detail:', error);
            }
        };

        const fetchFiles = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/forum-file/${ForumCode}/files`, {
                    headers: {
                        'Authorization': window.localStorage.getItem("token")  // 여기에 토큰 추가
                    }
                });
                setFiles(response.data.obj || []);
                console.log('Fetched files:', response.data.obj);
            } catch (error) {
                console.error('Error fetching files:', error);
                setFiles([]);
            }
        };

        fetchForumDetail();
        fetchFiles();

    }, [ForumCode]);

    const formatDate = (dateTimeString) => {
        const date = new Date(dateTimeString);
        return date.toLocaleDateString(); // 로케일에 맞는 날짜 형식으로 변환
    };

    const isAuthor = userInfo?.accountCode === forum?.accountCode;

    return (
        <>
        <div className="forum-container">
            <div className='author-info'>
                <p>{userInfo?.accountName}</p>
                <p>{userInfo?.teamName} {userInfo?.accountPosition}</p>
            </div>
                <div className="post-content">
                <h1 className="post-title">제목: {forum?.forumTitle }</h1>
                <p className="post-date">작성일: {formatDate(forum?.forumCreateTime)}</p>
                <p className="post-type">유형: {forum?.forumType}</p>
                {files.length > 0 && (
                    <div className="attached-files">
                        <p>첨부 파일: </p>
                            {files.map((file, index) => (
                                <div key={index}>
                                    <FileDownload fileName={file.changedFileName} />
                                </div>
                            ))}
                        
                    </div>
                )}
                <hr/>
                <div className="forum-content" dangerouslySetInnerHTML={{ __html: forum?.forumContent }}></div>
                <div className="action-buttons">
                    {isAuthor && (
                        <div>
                            <DeleteButton forum={forum} userInfo={userInfo}/>
                            <UpdateButton forum={forum} userInfo={userInfo} />
                        </div>
                    )}
                </div>
            </div>
        </div>
        <div className='comment-content'>
                <CommentList forumCode={forum?.forumCode} currentUserAccountCode ={userInfo?.accountCode}/>
                <CommentCreate forumCode={forum?.forumCode} accountCode={userInfo?.accountCode}/>
        </div>
        </>
    );
};

export default ForumDetailListComponent;
