import { useEffect, useState } from 'react';
import './Home.css';

const Home = () => {

    const [userName, setUserName] = useState('기본');

    const workHadler = (e) => {
        if(e.target.dataset.type === 'go'){
            alert('출근');
        } else {
            alert('퇴근');
        }
    }

    useEffect(()=>{
        //...API호출
        setUserName('알 수 없는 사용자');
    },[])

    return(
        <>
        <section className='home'>
            <article className='home-article'>
                <section className='home-section1'>
                    <h1 className='home-greeting'>Hello {userName}</h1>
                    <p className='home-text'>
                    With Aplano, the current shift schedule can be viewed online by every <br/>
                    employee from anywhere. Automate the shift planner online and reduce <br/>
                    the administrative and communication effort in your company. <br/>
                    </p>
                </section>
                <section className='home-section2'>
                    <button data-type='go' onClick={workHadler} className='go-to-work'>출근</button>
                    <button data-type='leave' onClick={workHadler} className='leave-work'>퇴근</button>
                    <button data-type='leave' onClick={()=>{window.location.href='/login'}} className='leave-work'>로그인 테스트 하러 가기</button>
                </section>
                <section className='home-section3'>
                    <button onClick={()=>{window.location.href='/mypage/home'}}><img src='/home/button/mypage.png'/><div>마이페이지</div></button>
                    <button onClick={()=>{window.location.href='/project'}}><img src='/home/button/project.png'/><div>프로젝트</div></button>
                    <button onClick={()=>{window.location.href='/forum/home'}}><img src='/home/button/forum.png'/><div>게시판</div></button>
                    <button onClick={()=>{window.location.href='/todo-list/home'}}><img src='/home/button/todoList.png'/><div>투두리스트</div></button>
                    <button onClick={()=>{window.location.href='/news/home'}}><img src='/home/button/todayNews.png'/><div>오늘의 소식</div></button>
                </section>
            </article>

            <img className='homeImg' src='/home/homeImg.png'></img>
        </section>

        </>
    )
}

export default Home;