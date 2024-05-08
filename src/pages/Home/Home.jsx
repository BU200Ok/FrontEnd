import { useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode';
import './Home.css';

const Home = () => {

    const [userName, setUserName] = useState('기본');
    const [isLogin, setIsLogin] = useState(false);

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
        setUserName('🛑로그인 먼저 해주세요!')
    }

    useEffect(()=>{
        if(localStorage.getItem('token')){
            const decode = jwtDecode(localStorage.getItem('token'))
            setUserName(`안녕하세요! ${decode.accountId}님! ✔`);
            setIsLogin(true);
        } else {
            setUserName('🛑로그인 먼저 해주세요!')
        }
    },[])

    return(
        <>
        <section className='home'>
            <article className='home-article'>
                <section className='home-section1'>
                    <h1 className='home-greeting'>{userName}</h1>
                    <p className='home-text'>
                    Aplano를 통해 모든 직원은 어디에서든 온라인으로 현재 근무 스케줄을 확인할 수 있습니다. <br/>
                    온라인으로 근무 스케줄을 자동화하고 회사의 행정 및 커뮤니케이션 노력을 줄이세요.
                    </p>
                </section>
                <section className='home-section2'>
                    {
                        isLogin? (
                        <>
                            <button data-type='go' onClick={workHadler} className='go-to-work'>출근</button>
                            <button data-type='leave' onClick={workHadler} className='leave-work'>퇴근</button>
                            <button onClick={logout} className='leave-work'>로그아웃</button>
                        </>
                        ):
                        <>
                            <button data-type='leave' onClick={()=>{window.location.href='/login'}} className='leave-work'>로그인</button>
                        </>
                    }
                </section>
                <section className='home-section3'>
                    <button onClick={()=>{window.location.href='/mypage'}}><img src='/home/button/mypage.png' alt='mypage'/><div>마이페이지</div></button>
                    <button onClick={()=>{window.location.href='/project'}}><img src='/home/button/project.png' alt='project'/><div>프로젝트</div></button>
                    <button onClick={()=>{window.location.href='/forum'}}><img src='/home/button/forum.png' alt='forum'/><div>게시판</div></button>
                    <button onClick={()=>{window.location.href='/todo-list'}}><img src='/home/button/todoList.png' alt='todo list'/><div>투두리스트</div></button>
                    <button onClick={()=>{window.location.href='/news'}}><img src='/home/button/todayNews.png' alt='today news'/><div>오늘의 소식</div></button>
                </section>
            </article>

            <img className='homeImg' src='/home/homeImg.png' alt='home'></img>
        </section>
        </>
    )
}

export default Home;