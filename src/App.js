import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Project from './pages/Project/ProjectMain/Project';
import FindAccount from './pages/Login/FindAccount/FindAccount';
import OTP from './pages/Login/FindAccount/OTP';
import AdminSidbar from './pages/Admin/AdminSidbar';
import AdminJoin from './pages/Admin/AdminJoin/AdminJoin';
import AdminDeletion from './pages/Admin/AdminDeletion/AdminDeletion';
import Sidebar from './components/Sidebar';
import Attendance from './pages/Attendance/Attendance';
import Board from './pages/Board/Board';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/find-account' element={<FindAccount/>}/>
          <Route path='/find-account-otp' element={<OTP/>}/>

          <Route element={<AdminSidbar/>}>
            <Route path='admin/join' element={<AdminJoin/>}/>
            <Route path='admin/deletion' element={<AdminDeletion/>}/>
          </Route>

          <Route element={<Sidebar/>}>
            <Route path='/project' element={<Project/>}/>

            <Route path='/attendance' element={<Attendance/>}/>

            <Route path='/board' element={<Board/>}/>
          </Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
