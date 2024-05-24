import axios from 'axios';
import React, { useState } from 'react';

const ProjectSearch = () => {
    const [searchKeyWord, setSearchKeyWord] = useState('');
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
        <div className='project_search_area'>
            <form onSubmit={handleSubmit}>
                <input value={searchKeyWord} type='text' onChange={handleInputChange} className='project_search_box' placeholder='프로젝트 검색'/>
                <button type='submit' className='project_search_btn'>검색</button>
            </form>
        </div>
    );
};

export default ProjectSearch;