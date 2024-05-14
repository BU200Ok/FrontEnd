import React from 'react';

const ShowUserInfo = (props) => {
    const { userInfo } = props;

    if (!userInfo) {
        return <h3>유저 정보를 가져오는 중입니다.</h3>;
    }

    // userInfo가 존재하면 안전하게 필드에 접근
    return (
        <div className='userInfoArea'>
            <h4>{userInfo.team?.department?.departmentName} {userInfo.accountPosition}</h4>
            <h1>{userInfo.accountName}</h1>
            <h4>{userInfo.team?.teamName}/{userInfo.projectOperations}</h4>
            <h5>email: {userInfo.accountEmail}</h5>
        </div>
    );
};

export default ShowUserInfo;
