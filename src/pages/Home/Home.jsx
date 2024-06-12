import { useEffect, useRef, useState } from 'react';
import {jwtDecode} from 'jwt-decode';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import { checkLeaving, checkWorking } from '../MyPage/workingCheckFunc';

const Home = () => {
    const mainPage = useRef(null);

    const [user, setUser] = useState({accountId: '알 수 없는 사용자'});
    const [isLogin, setIsLogin] = useState(false);
    const nav = useNavigate();

    const workHadler = (e) => {
        if(e.target.dataset.type === 'go'){
            alert('출근');
        } else {
            alert('퇴근');
        }
    }
    const logout = () => {
        localStorage.removeItem('token');
        setIsLogin(false);
    }

    useEffect(()=>{
        if(localStorage.getItem('token')){
            const decode = jwtDecode(localStorage.getItem('token'))
            console.log(decode);
            setUser(decode);
            setIsLogin(true);
        }
        
    },[])

    return(
        <>
        <section ref={mainPage} className='home'>
            <article className='home-article'>
                <section className='home-section1'>
                    <h1 className='home-greeting'>{isLogin ? `안녕하세요! ${user.accountName}님! ✔`: '🛑로그인 먼저 해주세요!'}</h1>
                    <p className='home-text'>
                    Aplano를 통해 모든 직원은 어디에서든 온라인으로 현재 근무 스케줄을 확인할 수 있습니다. <br/>
                    온라인으로 근무 스케줄을 자동화하고 회사의 행정 및 커뮤니케이션 노력을 줄이세요.
                    </p>
                </section>
                <section className='home-section2'>
                    {
                        isLogin && user ?(
                            user.accountRole === `ROLE_ADMIN` ?(
                            <>
                                <button data-type='go' onClick={workHadler} className='go-to-work'>출근</button>
                                <button data-type='leave' onClick={workHadler} className='leave-work'>퇴근</button>
                                <button onClick={()=>{nav('/admin/join')}} className='leave-work'>관리자 페이지</button>
                                <button onClick={logout} className='leave-work'>로그아웃</button>
                            </>
                            ) : (
                            <>
                                <button data-type='go' onClick={checkWorking} className='go-to-work'>출근</button>
                                <button data-type='leave' onClick={checkLeaving} className='leave-work'>퇴근</button>
                                <button onClick={logout} className='leave-work'>로그아웃</button>
                            </>
                            ) 
                        ) : (
                        <>
                            <button data-type='leave' onClick={()=>{window.location.href='/login'}} className='leave-work'>로그인</button>
                        </>
                        )
                    }
                </section>
                <section className='home-section3'>
                    <button disabled={!isLogin} onClick={()=>{nav('/mypage')}}><img src='/home/button/mypage.png'/><div>마이페이지</div></button>
                    <button disabled={!isLogin} onClick={()=>{nav('/project')}}><img src='/home/button/project.png'/><div>프로젝트</div></button>
                    <button disabled={!isLogin} onClick={()=>{nav('/board')}}><img src='/home/button/forum.png'/><div>게시판</div></button>
                    <button disabled={!isLogin} onClick={()=>{nav('/attendance/status')}}><img src='/home/button/todoList.png'/><div>근태 관리</div></button>
                    <button disabled={!isLogin} onClick={()=>{nav('/board/news')}}><img src='/home/button/todayNews.png'/><div>오늘의 소식</div></button>
                </section>
            </article>

            <img className='homeImg' src='/home/homeImg.png' alt='home'></img>
        </section>
        </>
    )
}

export default Home;