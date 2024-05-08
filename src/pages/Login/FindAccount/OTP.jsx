import { useEffect, useState } from "react";
import './OTP.css';
import { checkOTP, getIdByEmail} from "../../../callAPI/findAccount/FindAccountCallAPI";
import { openLinkModalWithMessage, openModalWithMessage } from "../../Modal/modalFunc";

const OTP = () => {
    const [otp, setOtp] = useState(Array(5).fill(''));
    let number = '';
    const showIdModal = () => {
        console.log("function call");
        getIdByEmail(window.localStorage.getItem('email'))
        .then(res => {
            console.log(res);
            openLinkModalWithMessage("회원님의 id는 " + res + " 입니다.",'/login');
        })
        .catch(err => {
            console.error(err);
            openLinkModalWithMessage(`해당 이메일의 id 정보가 없습니다. 회원가입을 진행해 주세요`, '/join')
        })
    }
    number = otp[0]+otp[1]+otp[2]+otp[3]+otp[4];
    useEffect(()=>{
        
        if(otp[0]!==''&&otp[1]!==''&&otp[2]!==''&&otp[3]!==''&&otp[4]!==''){
            // window.localStorage.setItem("email","koe7324@naver.com")
            // sendEmail(window.localStorage.getItem('email'));
            checkOTP(number)
            .then(res =>{
                if(res === true) {
                    // alert('성공');
                    showIdModal();
                }
                else openModalWithMessage("번호가 일치하지 않습니다.");
            })
            .catch(err => {
                console.error(err);
                openModalWithMessage("에러가 발생했습니다.");
            })
        }
    },[otp, number])

    const handleChange = (element, index) => {
        const newOtp = [...otp];
        newOtp[index] = element.value;
        setOtp(newOtp);

        if (element.nextSibling && element.value) {
        element.nextSibling.focus();
        }
    };

    return(
        <section className="find-account-background-container">  
            <section className="find-account-container">
                <section className="find-account-field-container">
                    <h1 className="find-account-title">OTP</h1>
                    <div style={{color:'#8DB37B',marginTop:-39}}>이메일에 전송된 OTP를 입력해 주시면 아이디를 알려드릴게요!</div>
                    <div className="filed-text">OTP</div>
                    <div className="otp-input-field-container">
                        {otp.map((data, index) => (
                        <input
                            className="otp-input-field"
                            key={index}
                            type="text"
                            maxLength="1"
                            value={data}
                            onChange={e => handleChange(e.target, index)}
                        />
                        ))}
                    </div>
                    <br/>
                    <button onClick={()=>window.location.href='/'} className="id-pw-find">홈으로 돌아가기</button>
                    <br/>
                    <button onClick={()=>window.location.href='/login'} className="id-pw-find">로그인 페이지로 돌아가기</button>
                </section>
            </section>        
        </section>
    )
}

export default OTP;