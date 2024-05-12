import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ShowUserInfo from './ShowUserInfo';

const MyPage = () => {
    const [userInfo, setUserInfo] = useState({});
    const [searchKeyWord, setSearchKeyWord] = useState('');
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

    const handleInputChange = (event) => {
        setSearchKeyWord(event.target.value);
    };
    const handleSubmit = async(event) => {
        event.preventDefault();  // 페이지 새로고침 방지
        try{
            const response = await axios.get(`http://localhost:8080/mypage/mainpage/search-project`, {
                headers: {
                    'Authorization': window.localStorage.getItem("token")  // 여기에 토큰 추가
                },
                params: {
                    keyWord: searchKeyWord  // 요청 쿼리 파라미터로 keyWord를 추가
                }
            })
            console.log(response);
            setSearchKeyWord('');
        }
        catch(err){
            console.error(err);
            setSearchKeyWord('');
        }
        // console.log("Submitted with keyword:", searchKeyWord);
    };
    return (
        <div>
            <ShowUserInfo userInfo={userInfo} />
            마이페이지
            <form onSubmit={handleSubmit}>
                <input type='text' onChange={handleInputChange}/>
                <button type='submit'>검색</button>
            </form>
        </div>
    );
};

export default MyPage;