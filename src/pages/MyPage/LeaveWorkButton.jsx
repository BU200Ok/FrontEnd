import axios from 'axios';
import React from 'react';
import { openModalWithMessage } from '../Modal/modalFunc';

const LeaveWorkButton = () => {
    const checkLeaving = async() => {
        console.log(window.localStorage.getItem("token"));
        try{
            const response = axios.post("http://localhost:8080/mypage/mainpage/attendance-leave-work",{},{
                headers: {
                    'Authorization': window.localStorage.getItem("token")  // 여기에 토큰 추가
                }
            });
            console.log(response);
            openModalWithMessage("퇴근완료");
        }
        catch(err){
            console.log(err);
            openModalWithMessage("에러남");
        }
    }
    return (
        <button style={{
            width: '209px',
            height: '46px',
            left: '1624px',
            top: '945px',
            border: '1px solid #E9EEE6',
            borderRadius: '80px',}}
            onClick={checkLeaving}>
            퇴근
        </button>
    );
};

export default LeaveWorkButton;