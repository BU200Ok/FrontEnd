
import react, {useState} from 'react';
import ForumListComponent from './ForumListComponent'
import 'bootstrap/dist/css/bootstrap.min.css';
import MyInfoComponent from '../MyInfoComponent';


const DepartmentList = ({forum}) => {
    const [userInfo, setUserInfo] = useState({});
    return (
        <div>
            <br></br>
            <h1>공지사항</h1>
            <hr></hr>
            <MyInfoComponent userInfo={userInfo} setUserInfo={setUserInfo}/>
            <ForumListComponent forum={forum} />
        </div>
    );
    
};

export default DepartmentList;
