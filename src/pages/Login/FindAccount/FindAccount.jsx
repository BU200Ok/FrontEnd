import { useState } from 'react';
import './FindAccount.css';
import { sendEmailForFindAccount } from '../../../callAPI/findAccount/FindAccountCallAPI';

const FindAccount = () => {
    const [idEmail,setIdEmail] = useState('');

    const checkEmailRegex = (email) =>{
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    }

    const findId = () => {
        if(checkEmailRegex(idEmail)){
            sendEmailForFindAccount(idEmail);    //이메일 보내는 API 호출
            window.location.href = '/find-account-otp';
        } else {
            alert('이메일이 올바르지 않아요.');
        }
    }
    return(
        <section className="find-account-background-container">  
        <section className="find-account-container">
            <section className="find-account-field-container">
                <h1 className="find-account-title">Forgot Id ?</h1>
                <div style={{color:'#8DB37B',marginTop:-39}}>이메일 주소를 적어주시면 인증 코드를 보내드릴게요. :{")"}</div>
                <div className="filed-text">Email</div>
                <input onChange={(e)=>{setIdEmail(e.target.value)}} value={idEmail} className="input-field" type="text" placeholder="Enter Email"/>
                <button onClick={findId} className="find-account-button"><span style={{color:'white'}}>아이디 찾기</span></button>
                <br/>
                <button onClick={()=>window.location.href='/'} className="id-pw-find">홈으로 돌아가기</button>
                <br/>
                <button onClick={()=>window.location.href='/login'} className="id-pw-find">로그인 페이지로 돌아가기</button>
            </section>
            <section className="find-pw-field-container">
                <h1 className="find-account-title">Forgot Password ?</h1>
                <div style={{color:'#8DB37B',marginTop:-39}}>이메일 주소와, 아이디를 적어주시면 인증 코드를 보내드릴게요!</div>
                <div className="filed-text">Id</div>
                <input className="input-field" type="text" placeholder="Enter Id"/>
                <div className="filed-text">Email</div>
                <input className="input-field" type="text" placeholder="Enter Email"/>
                <button className="find-account-button"><span style={{color:'white'}}>비밀번호 찾기</span></button>
                <br/>
            </section>
        </section>        
    </section>
    )
}

export default FindAccount;