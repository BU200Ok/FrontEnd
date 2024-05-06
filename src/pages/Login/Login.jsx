import { useEffect, useRef, useState } from "react";
import './Login.css'

const Login = () => {

    const [id,setId] = useState('');
    const [pw,setPw] = useState('');
    const [remember, setRemenber] = useState(false);

    const rememberText = useRef(null);

    async function login(accountId, accountPassword) {
        if(accountId ==='' || accountPassword ===''){
            alert('먼저 입력해주세요!');
            return;
        } else {
            const formData = new FormData();
            formData.append('username', accountId);
            formData.append('password', accountPassword);
        
            const response = await fetch('http://localhost:8080/login', {
                method: 'POST',
                body: formData
            });
        
            if (response.ok) {         
                localStorage.setItem('token',response.headers.get(`Authorization`));
                window.location.href = '/';
                if(remember){
                    localStorage.setItem('id',id);
                }else{
                    if(localStorage.getItem('id')){
                        localStorage.removeItem('id');
                    }
                }
            } else {
                alert('아이디, 비밀번호가 달라요.');
            }
        }
    }
    
    const rememberChange = () => {
        setRemenber(!remember);
        if(!remember){
            rememberText.current.innerText = `I will remember you!`;
        } else {
            rememberText.current.innerText = `Remember me`;
        }
        
    }

    useEffect(()=>{
        if(localStorage.getItem('id')){
            setId(localStorage.getItem('id'));
            setRemenber(true);
        }
    },[])

    return(
        <section className="login-background-container">  
            <section className="login-container">
                <section className="login-field-container">
                    <h1 className="login-title">Sign In</h1>
                    <div style={{color:'#8DB37B'}}>안녕하세요! 로그인을 위해서 먼저 당신의 정보를 적어주세요.</div>
                    <div className="filed-text">Id</div>
                    <input className="input-field" type="text" value={id} onChange={(e)=>setId(e.target.value)} placeholder="Enter ID"/>
                    <div className="filed-text">password</div>
                    <input className="input-field" type="password" value={pw} onChange={(e)=>setPw(e.target.value)} onKeyDown={(e)=>{
                        if(e.key === 'Enter'){
                            login(id,pw);
                        }
                    }} placeholder="Enter password"/>
                    <div className="remember-me">
                        <input checked={remember} onChange={rememberChange} type="checkbox"/><span ref={rememberText}>Remember me</span>
                    </div>
                    <button className="login-button" onClick={()=>{login(id,pw);}}><span style={{color:'white'}}>Sign in</span></button>
                    <br/>
                    <button onClick={()=>{window.location.href='/find-account'}} className="id-pw-find">아이디/비밀번호 찾기</button>
                    <br/>
                    <button onClick={()=>window.location.href='/'} className="id-pw-find">홈으로 돌아가기</button>
                </section>
                <img className="login-img" src={'/login/login.png'}/>
            </section>        
        </section>
    )
}

export default Login;