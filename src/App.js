import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Project from './pages/Project/ProjectMain/Project';
import FindAccount from './pages/Login/FindAccount/FindAccount';
import OTP from './pages/Login/FindAccount/OTP';
import MyPage from './pages/MyPage/MyPage';
import Join from './pages/Join/Join';
import { Provider } from 'react-redux';
import store from './redux/redux';
import LinkModal from './pages/Modal/LinkModal';
import MessageModal from './pages/Modal/MessageModal';
import AdminSidbar from'./pages/Admin/AdminSidbar';
import AdminJoin from './pages/Admin/AdminJoin/AdminJoin';
import AdminDeletion from './pages/Admin/AdminDeletion/AdminDeletion';
import Sidebar from './components/Sidebar';
import Attendance from './pages/Attendance/Attendance';
import Forum from './pages/Forum/Forum';
import ForumCreateComponent from './pages/Forum/post/ForumCreateComponent';
import ForumEdit from './pages/Forum/post/ForumEdit'
import ForumDetailListComponent from './pages/Forum/ForumDetailListComponent';
import ProjectForum from './pages/Project/ProjectForum/ProjectForum';
import ProjectForumPost from './pages/Project/ProjectForum/ProjectForumPost';
import ProjectCreate from './pages/Project/ProjectMain/ProjectCreate/ProjectCreate';
import InputModal from './pages/Modal/InputModal';
import ErrorPage from './pages/Error/ErrorPage';
import CreateTask from './pages/Project/ProjectForum/CreateTask';
import TaskSidebar from './pages/Project/ProjectForum/taskComponent/TaskSidebar';
import TaskDatas from './pages/Project/ProjectForum/taskComponent/TaskDatas';
import TaskTodoList from './pages/Project/ProjectForum/taskComponent/TaskTodoList';




function App() {
  return (
    <div className='App'>
      <Provider store={store}>
        <InputModal/>
        <MessageModal/>
        <BrowserRouter>
        <LinkModal/>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/find-account' element={<FindAccount/>}/>
            <Route path='/find-account-otp' element={<OTP/>}/>
            <Route path='/join' element={<Join/>}/>
            <Route path="/error/:errorCode" element={<ErrorPage />} />
            <Route path="*" element={<ErrorPage errorCode={404} />} />  
  
            <Route element={<AdminSidbar/>}>
              <Route path='admin/join' element={<AdminJoin/>}/>
              <Route path='admin/deletion' element={<AdminDeletion/>}/>
            </Route>

          <Route element={<Sidebar/>}>
            <Route path='/mypage' element={<MyPage/>}/>
            <Route path='/project' element={<Project/>}/>
            <Route path='/project/:projectCode' element={<ProjectForum/>}/>
            <Route path='/project/create' element={<ProjectCreate/>}/>
            <Route path='/attendance' element={<Attendance/>}/>
            <Route path='/forum' element={<Forum/>}/>
            <Route path="/create" element={<ForumCreateComponent/>} />
            <Route path="/forum/:ForumCode" element={<ForumDetailListComponent/>} />
            <Route path="/forum/edit/:forumCode" element={<ForumEdit />} />
            <Route path='/project/:projectCode/writetask' element={<CreateTask/>}/>
            <Route path='/project/:projectCode/:projectForumCode' element={<TaskSidebar/>}>
              <Route path="tasks" element={<ProjectForumPost />} />
              <Route path='datas' element={<TaskDatas/>} />
              <Route path='todos' element={<TaskTodoList/>} />
            </Route>
          </Route>
  
          </Routes>
        </BrowserRouter>
        
      </Provider>
    </div>
  );
}

export default App;
