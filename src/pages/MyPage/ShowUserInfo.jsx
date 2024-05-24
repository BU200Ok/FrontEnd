import React from 'react';
import './MyPage.css';
const ShowUserInfo = (props) => {
    const { userInfo } = props;
    console.log(userInfo);
    if (userInfo === false) {
        return <h3>유저 정보를 가져오는 중입니다.</h3>;
    }
    else
    // userInfo가 존재하면 안전하게 필드에 접근
    return (
        <div className='userInfoArea'>
            <img src='/mypage/profileimgEx.png' alt='프로필 이미지' className='profile_image'/>
            <div className='user_introduce'>
                <h4 className='user_department'>{userInfo.team?.department?.departmentName} {userInfo.accountPosition}</h4>
                <h1>{userInfo.accountName}</h1>
                <h4>{userInfo.team?.teamName} / {userInfo.projectOperations}</h4>
                <h5>email: {userInfo.accountEmail}</h5>
            </div>
        </div>
    );
};

export default ShowUserInfo;
