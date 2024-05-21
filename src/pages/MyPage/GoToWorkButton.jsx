import axios from 'axios';
import React from 'react';
import { openModalWithMessage } from '../Modal/modalFunc';

const GoToWorkButton = () => {
    const checkWorking = async() => {
        console.log(window.localStorage.getItem("token"));
        try{
            const response = axios.post("http://localhost:8080/mypage/mainpage/attendance-go-work",{},{
                headers: {
                    'Authorization': window.localStorage.getItem("token")  // 여기에 토큰 추가
                }
            });
            console.log(response);
            openModalWithMessage("출근완료");
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
            top: '876px',
            background: '#E9EEE6',
            border: '1px solid #606060',
            borderRadius: '80px',}}
            onClick={checkWorking}>
            출근
        </button>
    );
};

export default GoToWorkButton;