import React, {useState, useEffect} from 'react';
import axios from 'axios';
import ForumListComponent from './ForumListComponent';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyInfoComponent from '../MyInfoComponent';


const MyList = ({forum}) => {
    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        getUserInfo();
    }, []);

    const getUserInfo = async() => {
        try{
            const response = await axios.get("http://localhost:8080/forum/myinfo", {
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
    
    return (
        <div>
            <br/>
            <h1>내가 쓴 게시글</h1>
            <hr/>
            <MyInfoComponent userInfo={userInfo}/>
            <ForumListComponent forum={forum} userInfo={userInfo}/>
            
        </div>
    );
};

export default MyList;
