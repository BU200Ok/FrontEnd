import axios from "axios"
import { jwtDecode } from "jwt-decode";

const Project = () => {

    const test = async (status) => {
        const res = await axios.get(`http://localhost:8080/${status}`,
        {
            headers: {Authorization: localStorage.getItem('token')}
        });
        console.log(res);
        const decode = jwtDecode(localStorage.getItem('token'))
    }
    return(
        <>
            <button onClick={()=>{test('user')}}>일반 유저 권한 체크</button>
            <button onClick={()=>{test('admin')}}>어드민 유저 권한 체크</button>
        </>
    )
}

export default Project;
