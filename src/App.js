import { BrowserRouter, Route, Routes } from 'react-router-dom';
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
import AdminSidbar from './pages/Admin/AdminSidbar';
import AdminJoin from './pages/Admin/AdminJoin/AdminJoin';
import AdminDeletion from './pages/Admin/AdminDeletion/AdminDeletion';
import Sidebar from './components/Sidebar';
import Attendance from './pages/Attendance/Attendance';
import Board from './pages/Board/Board';
import ProjectForum from './pages/Project/ProjectForum/ProjectForum';
import ProjectForumPost from './pages/Project/ProjectForum/ProjectForumPost';
import ProjectCreate from './pages/Project/ProjectMain/ProjectCreate/ProjectCreate';
import InputModal from './pages/Modal/InputModal';


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
  
            <Route element={<AdminSidbar/>}>
            <Route path='admin/join' element={<AdminJoin/>}/>
            <Route path='admin/deletion' element={<AdminDeletion/>}/>
          </Route>

          <Route element={<Sidebar/>}>
              <Route path='/mypage' element={<MyPage/>}/>
              <Route path='/project' element={<Project/>}/>
              <Route path='/project/:projectCode' element={<ProjectForum/>}/>
              <Route path='/project/:projectCode/:projectForumCode' element={<ProjectForumPost/>}/>
              <Route path='/project/create' element={<ProjectCreate/>}/>
            <Route path='/attendance' element={<Attendance/>}/>

            <Route path='/board' element={<Board/>}/>
          </Route>
  
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
