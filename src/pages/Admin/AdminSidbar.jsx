import { Outlet, useNavigate } from "react-router-dom";
import './AdminSidebar.css';
import { useRef } from "react";

const AdminSidbar = () =>{
    const navigate = useNavigate();
    const selectionBox = useRef(null);
    const join = useRef(null);
    const deletion = useRef(null);

    const go = (url) => {
        navigate(`/admin/${url}`);
        if(selectionBox.current && join.current){
            if(url === 'join'){
                selectionBox.current.style.top = '-40px';
                join.current.style.color = 'white';
                deletion.current.style.color = 'black';
            } else if(url==='deletion'){
                selectionBox.current.style.top = '60px';
                join.current.style.color = 'black';
                deletion.current.style.color = 'white';
            }
            navigate(`/admin/${url}`);
        }
    }

    return(
        <>
            <section style={{display:'flex'}}>
                <section className="admin-sidebar-container">
                    <div onClick={()=>{navigate('/')}} className="admin-sidebar-company-name">Admin Page</div>
                    <ol className="admin-sidebar-list">
                        <li style={{color:'white'}} ref={join} onClick={()=>{go('join')}}>회원 가입</li>
                        <li ref={deletion} onClick={()=>{go('deletion')}}>회원 탈퇴</li>
                        <div ref={selectionBox}></div>
                    </ol>
                    
                </section>
                <section>
                    <Outlet/>
                </section>
            </section>
            
        </>
        
    )
}

export default AdminSidbar;