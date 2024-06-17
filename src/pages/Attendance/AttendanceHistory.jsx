import axios from "axios";
import { useEffect, useState } from "react";
import styles from './AttendanceHistory.module.css';


const AttendanceHistory = () => {
    const [data,setData] = useState({});
    const getAttendanceStatus =  async () => {
        const res = await axios.get(`http://localhost:8080/attendance/status`,{
            headers:{
                Authorization: window.localStorage.getItem('token')
            }
        })
        console.log(res.data);
        setData(res.data);
    }
    useEffect(()=>{
        getAttendanceStatus();
    },[])
    return (
        <section style={{display:'flex',flexDirection:'column',marginLeft:200,marginTop:100}}>
            {
                Object.keys(data).length !== 0? (
                    <div className={styles.header}>
                        <div>총 출근 일 : {data.totalCommute}</div>
                        <div>총 지각 일 : {data.totalLateness}</div>
                        <div>남은 연차 : {data.remainingAnnualLeave}</div>
                        <div>1년에 받는 연차 : {data.totalAnnualOfYear}</div>
                    </div>
                ) : (<div></div>)
            }
            <hr/>
            <div>이번 년도 휴가 기록</div>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>타입</th>
                        <th>시작 일</th>
                        <th>종료 일</th>
                        <th>사용 일</th>
                    </tr>
                </thead>
                <tbody>
            {
                Object.keys(data).length !== 0 && data.annuals? (
                    data.annuals.map((annual)=>(
                        <tr key={annual.annualStart}>
                            <td>{annual.annualType}</td>
                            <td>{annual.annualStart}</td>
                            <td>{annual.annualEnd}</td>
                            <td>{annual.annualCount}일</td>
                        </tr>
                    ))
                ) : (<tr></tr>)
            }
            </tbody>
            </table>
        </section>
    )
}
export default AttendanceHistory;