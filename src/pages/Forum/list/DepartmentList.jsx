import React, {useState, useEffect} from 'react';
import axios from 'axios';
import ForumListComponent from './ForumListComponent';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import MyInfoComponent from '../MyInfoComponent';
import '../Forum.css';

const DepartmentList = ({forum}) => {
    const [userInfo, setUserInfo] = useState({});
    const navigate = useNavigate();

    
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

    const handleCreatePost = () => {
        console.log('accountCode:', userInfo.accountCode);
        navigate('/create', { state: { accountCode: userInfo.accountCode } });
    };

    
    return (
        <div>
            <header>
                <br />
                <h1>부서게시판</h1>
                <hr />
            </header>
            <div className="layout-container">
                <section className="sidebar">
                    <MyInfoComponent userInfo={userInfo} />
                    <div className="button-container">
                        <div className="button-container">
                            <button
                                onClick={handleCreatePost}
                                className="btn btn-outline-success"
                                style={{ textDecoration: 'none' }}
                            >
                                게시글 작성
                            </button >
                        </div>
                    </div>
                </section>
                <section className="main-content">
                <ForumListComponent forum={forum} userInfo={userInfo} />
                </section>
            </div>
        </div>
    );
};

export default DepartmentList;
