
import react, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import ForumListComponent from './ForumListComponent'
import 'bootstrap/dist/css/bootstrap.min.css';
import MyInfoComponent from '../MyInfoComponent';


const DepartmentList = ({forum}) => {
    const [userInfo, setUserInfo] = useState({});
    const navigate = useNavigate();

    const handleCreatePost = () => {
        console.log('accountCode:', userInfo.accountCode);
        navigate('/create', { state: { accountCode: userInfo.accountCode } });
    };


    const isAdmin = userInfo.accountPosition;

    return (
        <div>
            <div className="header">
                <h1>공지사항</h1>
                <hr/>
            </div>
            <div className="layout-container">
                <section className="suser-info">
                    <MyInfoComponent setUserInfo={setUserInfo} userInfo={userInfo} />
                    {isAdmin && (
                        <div className="button-container">
                            <button
                                onClick={handleCreatePost}
                                className="btn btn-outline-success"
                                style={{ textDecoration: 'none' }}
                            >
                                게시글 작성
                            </button>
                        </div>
                    )}
                </section>
                    <section className="main-content">
                        <ForumListComponent forum={forum} userInfo={userInfo} />
                    </section>
            </div>
        </div>
    );
    
};

export default DepartmentList;
