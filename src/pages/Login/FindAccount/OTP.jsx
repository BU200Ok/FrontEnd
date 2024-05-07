import { useEffect, useState } from "react";
import './OTP.css';
import { checkOTP } from "../../../callAPI/findAccount/FindAccountCallAPI";

const OTP = () => {
    const [otp, setOtp] = useState(Array(5).fill(''));
    let number = '';
    useEffect(()=>{
        number = otp[0]+otp[1]+otp[2]+otp[3]+otp[4];
        if(otp[0]!==''&&otp[1]!==''&&otp[2]!==''&&otp[3]!==''&&otp[4]!==''){
            checkOTP(number);
            window.location.href='';
        }
    },[otp])

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