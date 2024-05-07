import axios from "axios";

export const sendEmailForFindAccount = async (email) => {
    console.log('이메일 전송 로직 발생');
    const response = await axios.get(`http://localhost:8080/login/send-email-for-find-account?email=${email}`);
    console.log(response.data);
}

export const checkOTP = async (code) => {
    const response = await axios.get(`http://localhost:8080/login/check-otp?code=${code}`);
    console.log(response.data);
}