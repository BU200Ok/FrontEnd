import { useState } from 'react';
import ForumCreateComponent from './ForumCreateComponent';

const ForumCreateComponent = () =>{
    const [forum, setForum] = useState([]);
    const [title, setTitle] = useState('');

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
}