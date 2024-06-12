import { useEffect } from 'react';
import styles from './MyAttendance.module.css';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Pagination from 'react-js-pagination';
const MyAttendance = () => {
    const nav = useNavigate();
    const [attendanceData, setAttendanceData] = useState([]);
    const [page,setPage] = useState(1);
    const [totalElements, setTotalElements] = useState(0);
    const getUserAttendanceData = async (p) => {
        const res = await axios.get(`http://localhost:8080/attendance?page=${p? p-1 : page-1}`,{
            headers:{
                Authorization: window.localStorage.getItem('token')
            }
        })
        if(res.status === 200){
            setAttendanceData(res.data.content);
            setTotalElements(res.data.totalElements);
            console.log(res.data);
        } else {
            nav('/error/500');
        }
    }
    const handlePageChange = (page) => {
        getUserAttendanceData(page);
    }
    useEffect(()=>{
        getUserAttendanceData();
    },[])
    return(
        <section>
            <div className={styles.title}>내 출근 내역</div>
            <hr style={{marginLeft:50}}/>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>날짜</th>
                        <th>출근시간</th>
                        <th>퇴근시간</th>
                        <th>구분</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        attendanceData.length !== 0? attendanceData.map((data) => (
                            <tr key={data.attendanceCode}>
                                <td>{data.attendanceDate}</td>
                                <td>{data.attendanceGoWork.split('T')[1]}</td>
                                <td>{
                                    data.attendanceLeaveWork? 
                                data.attendanceLeaveWork.split('T')[1]
                                    :
                                "퇴근 전입니다."}</td>
                                <td style={data.attendanceStatus==='퇴근' ? {color:'green'} : {color:'red'}}>
                                    {
                                        data.attendanceLeaveWork? data.attendanceStatus==='퇴근'? "정상 출근" : "지각" : "근무 중"
                                    }
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td style={{cursor:'default'}} colSpan={4}>아직 출,퇴근 기록이 없어요.</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
            <Pagination
                    activePage={page} // 현재 페이지
                    itemsCountPerPage={20} // 한 페이지랑 보여줄 아이템 갯수
                    totalItemsCount={totalElements} // 총 아이템 갯수
                    pageRangeDisplayed={5} // paginator의 페이지 범위
                    prevPageText={"‹"} // "이전"을 나타낼 텍스트
                    nextPageText={"›"} // "다음"을 나타낼 텍스트
                    onChange={handlePageChange} // 페이지 변경을 핸들링하는 함수
            />
        </section>
    )
}

export default MyAttendance;