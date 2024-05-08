import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Project from './pages/Project/Project';
import ProjectSidebar from './pages/Project/ProjectSidebar/ProjectSidebar';
import FindAccount from './pages/Login/FindAccount/FindAccount';
import OTP from './pages/Login/FindAccount/OTP';
import MyPage from './pages/MyPage/MyPage';
import Join from './pages/Join/Join';
import { Provider } from 'react-redux';
import store from './redux/redux';
import LinkModal from './pages/Modal/LinkModal';
import MessageModal from './pages/Modal/MessageModal';

function App() {
  return (
    <div className='App'>
      <Provider store={store}>
        <MessageModal/>
        <BrowserRouter>
        <LinkModal/>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/find-account' element={<FindAccount/>}/>
            <Route path='/find-account-otp' element={<OTP/>}/>
            <Route path='/join' element={<Join/>}/>
  
            <Route element={<ProjectSidebar/>}>
              <Route path='/mypage' element={<MyPage/>}/>
              <Route path='project' element={<Project/>}/>
            </Route>
  
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
