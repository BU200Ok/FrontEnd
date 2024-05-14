import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DepartmentList from './list/DepartmentList';
import PublicList from './list/PublicList'
import './Forum.css';

const Forum = () => {
    const [forum, setForum] = useState([]);
    const [title, setTitle] = useState('');
    const [selectedTab, setSelectedTab] = useState('부서별 게시판');


    const endpoints = {
        '공지사항': 'http://localhost:8080/forum/all',
        '부서별 게시판': 'http://localhost:8080/forum/department',
        '익명 게시판': 'http://localhost:8080/forum/anonymous',
    };

    // 초기 로딩 시 전체 프로젝트 데이터 로드
    useEffect(() => {
        fetchForumData(selectedTab); // 선택된 탭에 대한 데이터를 로드
    }, [selectedTab]); // 선택된 탭이 변경될 때마다 실행

    const handleLoginSuccess = (data) => {
        const { token, userInfo } = data; 
        localStorage.setItem('token', token);
        localStorage.setItem('userInfo', JSON.stringify(userInfo)); 
    };


    // API 호출 및 데이터, 타이틀 설정
    const fetchForumData = (title) => {
        axios.get(endpoints[title], {
            headers: {
                'Authorization': localStorage.getItem("token") // 로컬 스토리지에서 토큰을 가져와 Authorization 헤더에 포함
            }
        })
        .then(response => {
            setForum(response.data);
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
                        <li onClick={() => handleTabClick('부서별 게시판')}>부서별 게시판</li>
                        <li onClick={() => handleTabClick('익명 게시판')}>익명 게시판</li>
                    </ol>
                </section>

                {title === '부서별 게시판' && (
                    <DepartmentList forum={forum} />
                )}
                {title === '공지사항' && (
                        <PublicList forum={forum} />
                )}
            </section>
        </div>
    );
}

export default Forum;
