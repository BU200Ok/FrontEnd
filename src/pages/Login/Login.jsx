import { useEffect, useState } from "react";

const Login = () => {

    const [id,setId] = useState('');
    const [pw,setPw] = useState('');

    const [joinId,Id] = useState('');
    const [joinPw,Pw] = useState('');

    const [token, setToken] = useState('');

    useEffect(()=>{
        console.log(token);
    },[token])

    async function login(accountId, accountPassword) {
        const formData = new FormData();
        formData.append('username', accountId);
        formData.append('password', accountPassword);
    
        const response = await fetch('http://localhost:8080/login', {
            method: 'POST',
            body: formData
        });
    
        if (response.ok) {
            const result = await response.text();
            setToken(response.headers.get(`Authorization`));
        } else {
            alert('로그인 실패:', response.status);
        }
    }
    async function joinUser(accountId, accountPassword) {
        const formData = new FormData();
        formData.append('accountId', accountId);
        formData.append('accountPassword', accountPassword);
    
        const response = await fetch('http://localhost:8080/join', {
            method: 'POST',
            body: formData
        });
    
        if (response.ok) {
            const result = await response.text();
            alert('회원가입 결과:', result);
        } else {
            alert('회원가입 실패:', response.status);
        }
    }

    return(
        <>  
            <h1>로그인</h1>
            <span>아이디 : </span><input type="text" value={id} onChange={(e)=>setId(e.target.value)} placeholder="아이디"/>
            <br/>
            <span>비밀번호 : </span><input type="password" value={pw} onChange={(e)=>setPw(e.target.value)} placeholder="비밀번호"/>
            <br/>
            <button onClick={()=>{login(id,pw)}}>로그인</button>
            <br/>
            <br/>
            <h1>회원가입</h1>
            <span>아이디 : </span><input type="text" value={joinId} onChange={(e)=>Id(e.target.value)} placeholder="아이디"/>
            <br/>
            <span>아이디 : </span><input type="text" value={joinId} onChange={(e)=>Id(e.target.value)} placeholder="아이디"/>
            <br/>
            <span>비밀번호 : </span><input type="password" value={joinPw} onChange={(e)=>Pw(e.target.value)} placeholder="비밀번호"/>
            <br/>
            <button onClick={()=>{joinUser(joinId,joinPw)}}>회원가입</button>
        </>
    )
}

export default Login;