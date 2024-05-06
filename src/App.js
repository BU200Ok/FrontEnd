import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Project from './pages/Project/Project';
import ProjectSidebar from './pages/Project/ProjectSidebar/ProjectSidebar';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>

          <Route element={<ProjectSidebar/>}>
            <Route path='project' element={<Project/>}/>
          </Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
