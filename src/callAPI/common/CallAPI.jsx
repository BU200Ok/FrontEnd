import axios from "axios";

async function call(url,nav){
    try{
        const response = await axios.get(`http://localhost:8080/${url}`,
        {
            headers: {Authorization: localStorage.getItem('token')},
        })
        return response;
    } catch(err){
        console.log(`에러 발생 : ${err}`);
        nav('/error/500',{state: {msg:`에러가 발생했습니다! ${err}`}});
    }
}