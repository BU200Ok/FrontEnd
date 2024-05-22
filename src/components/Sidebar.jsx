import { Outlet, useNavigate } from "react-router-dom";
import './Sidebar.css';
import { useEffect, useRef } from "react";

const Sidebar = () =>{
    const navigate = useNavigate();
    const selectionBox = useRef(null);
    const attendance = useRef(null);
    const board = useRef(null);
    const project =useRef(null);

    const go = (url,move) => {
        if(!move){
            navigate(`/${url}`);
            moveSelectionBox(url);
        }
    }
    const moveSelectionBox = (url) => {
        if(selectionBox.current){
            if(url === 'attendance'){
                selectionBox.current.style.top = '-40px';
                attendance.current.style.color = 'white';
                board.current.style.color = 'black';
                project.current.style.color = 'black';
            } else if(url==='board'){
                selectionBox.current.style.top = '60px';
                attendance.current.style.color = 'black';
                board.current.style.color = 'white';
                project.current.style.color = 'black';
            } else if(url === 'project'){
                selectionBox.current.style.top = '150px';
                project.current.style.color = 'white';
                board.current.style.color = 'black';
                attendance.current.style.color = 'black';
            }
        }
    }
    useEffect(()=>{
        const urlArr = window.location.href.split('/');
        const url = urlArr[3];
        if(url==='attendance'){
            moveSelectionBox('attendance');
        } else if(url ==='board'){
            moveSelectionBox('board');
        } else if(url==='project'){
            moveSelectionBox('project');
        }
    },[])

    return(
            <section style={{display:'flex'}}>
                <section className="sidebar-container">
                    <div onClick={()=>{navigate('/')}} className="sidebar-company-name">회사 이름</div>
                    <ol className="sidebar-list">

                        <li ref={attendance} onClick={()=>{go('attendance')}}>근태 관리</li>

                        <li ref={board} onClick={()=>{go('board')}}>게시판</li>

                        <li ref={project} onClick={()=>{go('project')}}>프로젝트</li>

                        <div ref={selectionBox}></div>
                    </ol>
                </section>
                <section>
                    <Outlet/>
                </section>
            </section>
        
    )
}

export default Sidebar;