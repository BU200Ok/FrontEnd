import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ShowUserInfo from './ShowUserInfo';
import ProjectSearch from './ProjectSearch';
import Notice from './Notice';
import PriorityProject from './PriorityProject';
import RightArrow from './RightArrow';
import ProjectTodolist from './ProjectTodolist';
import ProjectInProgress from './ProjectInProgress';
import ProjectDone from './ProjectDone';
import CheckWorkingArea from './CheckWorkingArea';

const MyPage = () => {
    const [userInfo, setUserInfo] = useState({});
    const getUserInfo = async() => {
        try{
            const response = await axios.get("http://localhost:8080/mypage/mainpage", {
                headers: {
                    'Authorization': window.localStorage.getItem("token")  // 여기에 토큰 추가
                }
            });
            console.log(response.data.obj);
            setUserInfo(response.data.obj);
        }
        catch(err){
            console.error(err);
        }
    }
    //페이지에 들어오자마자 유저 정보를 가져옴
    useEffect(()=> {
        getUserInfo();
    }, []);
    return (
        <div className='mypage_main'>
            <div className='mypage_userintro'>
                <ShowUserInfo userInfo={userInfo} />
            </div>
            <div className='project_area'>
                <PriorityProject/>
                <RightArrow />
                <ProjectTodolist />
                <ProjectInProgress />
                <ProjectDone />
                <ProjectSearch/>
            </div>
            <div className='myPage_bottom_area'>
                <Notice/>
                <CheckWorkingArea />
            </div>
        </div>
    );
};

export default MyPage;