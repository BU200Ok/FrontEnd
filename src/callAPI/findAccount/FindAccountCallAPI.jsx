import axios from "axios";

export const sendEmailForFindAccount = async (email) => {
    console.log('이메일 전송 로직 발생');
    const response = await axios.get(`http://localhost:8080/login/send-email-for-find-account?email=${email}`);
    console.log(response.data);
}

export const checkOTP = async (code) => {
    try{
        const response = await axios.get(`http://localhost:8080/login/check-otp?code=${code}`);
        console.log(response);
        console.log(response.data.obj);
        const result = response.data.obj;
        return result;
    }
    catch(err){
        console.log(err);
        return false
    }
}

export const getIdByEmail = async(mailAddress) => {
    try{
        const response = await axios.get(`http://localhost:8080/login/get-id?email=${mailAddress}`);
        console.log(response.data.obj);
        return response.data.obj;
    }
    catch(err){
        console.error(err);
        return false;
    }
}