
import react, {useState} from 'react';
import ForumListComponent from './ForumListComponent'
import 'bootstrap/dist/css/bootstrap.min.css';
import MyInfoComponent from '../MyInfoComponent';


const DepartmentList = ({forum}) => {
    const [userInfo, setUserInfo] = useState({});
    return (
        <div>
            <header>
                <br />
                <h1>공지사항</h1>
                <hr />
            </header>
            <div className="layout-container">
                <section className="sidebar">
                <MyInfoComponent setUserInfo={setUserInfo} userInfo={userInfo} />
                </section>
                    <section className="main-content">
                        <ForumListComponent forum={forum} userInfo={userInfo} />
                    </section>
            </div>
        </div>
    );
    
};

export default DepartmentList;
