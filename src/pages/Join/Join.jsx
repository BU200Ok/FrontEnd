import { useState } from "react";
const Join = () => {
    const [joinId,Id] = useState('');
    const [joinPw,Pw] = useState('');
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
            <h1>회원가입</h1>
            <span>아이디 : </span><input type="text" value={joinId} onChange={(e)=>Id(e.target.value)} placeholder="아이디"/>
            <br/><br/>
            <span>비밀번호 : </span><input type="password" value={joinPw} onChange={(e)=>Pw(e.target.value)} placeholder="비밀번호"/>
            <br/><br/>
            <button onClick={()=>{joinUser(joinId,joinPw)}}>회원가입</button>
        </>
    )
}

export default Join;
