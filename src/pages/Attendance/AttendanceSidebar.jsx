import { Outlet, useNavigate } from "react-router-dom";
import styles from './AttendanceSidebar.module.css';
import { useState } from "react";

const AttendanceSidebar = () => {
    const nav = useNavigate();
    const [isSelect,setIsSelect] = useState([true,false,false]);
    return(
        <section style={{display:'flex'}}>
            <div className={styles.container}>
                <h2 className={styles.title}>근태 관리</h2>
                <div style={isSelect[0]? selectStyle : nonSelectStyle} className={styles.myAttendance} onClick={()=>{setIsSelect([true,false,false]);nav('/attendance/status')}}>내 근태 현황</div>
                <div style={isSelect[1]? selectStyle : nonSelectStyle} className={styles.myAttendance} onClick={()=>{setIsSelect([false,true,false]);nav('/attendance/history')}}>내 출퇴근 내역</div>
                {/* <div style={isSelect[2]? selectStyle : nonSelectStyle} className={styles.myAttendance} onClick={()=>{setIsSelect([false,false,true]);nav('/attendance/application')}}>연차 신청</div> */}
            </div>
            <Outlet/>
        </section>
    )
}
const nonSelectStyle = {
    width:150,
    height:50,
    borderRadius:12,
    display:'flex',
    alignItems:'center',
    justifyContent:'center'
}
const selectStyle = {
    color:'white',
    backgroundColor:'#90B54C',
    fontSize: 18,
    width:150,
    height:50,
    borderRadius:12,
    display:'flex',
    alignItems:'center',
    justifyContent:'center'
}
export default AttendanceSidebar;