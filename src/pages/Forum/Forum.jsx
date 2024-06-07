import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DepartmentList from './list/DepartmentList';
import PublicList from './list/PublicList';
import MyList from './list/MyList';
import './Forum.css';

const Forum = () => {
    const [forum, setForum] = useState([]);
    const [title, setTitle] = useState('');
    const [selectedTab, setSelectedTab] = useState('부서 게시판');


    const endpoints = {
        '공지사항': 'http://localhost:8080/forum/public',
        '부서 게시판': 'http://localhost:8080/forum/department',
        '익명 게시판': 'http://localhost:8080/forum/anonymous',
        '내가 쓴 게시글' : 'http://localhost:8080/forum/my-posts',
    };

    // 초기 로딩 시 전체 프로젝트 데이터 로드
    useEffect(() => {
        fetchForumData(selectedTab); // 선택된 탭에 대한 데이터를 로드
    }, [selectedTab]); // 선택된 탭이 변경될 때마다 실행

    const fetchForumData = (title) => {
        axios.get(endpoints[title], {
            headers: {
                'Authorization': localStorage.getItem("token") // 토큰 사용 방식을 'Bearer'로 명시
            }
        })
        .then(response => {
            if (response.data && response.data.obj) { // 백엔드 응답 구조에 따라 조정
                setForum(response.data.obj);
            } else {
                console.error("Received data is not in expected format:", response.data);
            }
            setTitle(title); 
        })
        .catch(error => {
            console.error("API 요청 실패:", error);
        });
    }
    
    // 각 탭 클릭 이벤트 핸들러
    const handleTabClick = (title) => {
        setSelectedTab(title); // 선택된 탭을 변경합니다.
    }
    return (
        <div>
            <section style={{ display: 'flex' }}>
                <section className="project-main-sidebar">
                    <div>게시판</div>
                    <ol>
                        <li onClick={() => handleTabClick('공지사항')}>공지사항</li>
                        <li onClick={() => handleTabClick('부서 게시판')}>부서 게시판</li>
                        <li onClick={() => handleTabClick('익명 게시판')}>익명 게시판</li>
                        <li onClick={() => handleTabClick('내가 쓴 게시글')}>내가 쓴 게시글</li>
                    </ol>
                </section>
                {title === '공지사항' && (
                        <PublicList forum={forum} />
                )}
                {title === '부서 게시판' && (
                        <DepartmentList forum={forum} />
                )}

                {title === '내가 쓴 게시글' && (
                        <MyList forum={forum} />
                )}
            </section>
        </div>
    );
}

export default Forum;
