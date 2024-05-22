import axios from 'axios';
import { openModalWithMessage } from '../Modal/modalFunc';

export const checkWorking = async() => {
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

export const checkLeaving = async() => {
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