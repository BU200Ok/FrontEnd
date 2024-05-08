import { useEffect, useState } from "react";
import './AdminJoin.css';

const AdminJoin = () => {
    let positionSetting = ['사원','대리','팀장','과장','차장','부장','이사부장','이사','상무','전무','부사장','사장','부회장','회장'];

    const [joinId,Id] = useState('');
    const [joinPw,Pw] = useState('');
    const [address,setAddress] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [position, setPosition] = useState('');
    const [role, setRole] = useState('');
    const [team, setTeam] = useState('팀 없음');

    const [positions,setPositions ] = useState(positionSetting);

    async function joinUser(accountId, accountPassword,address,email,name,position,role,team) {
        const formData = new FormData();
        formData.append('accountId', accountId);
        formData.append('accountPassword', accountPassword);
        formData.append('accountAddress', address);
        formData.append('accountEmail', email);
        formData.append('accountName', name);
        formData.append('accountPosition', position);
        formData.append('accountRole', role);
        formData.append('teamName',team);
    
        const response = await fetch('http://localhost:8080/join', {
            method: 'POST',
            body: formData
        });
    
        if (response.ok) {
            const result = await response.text();
            alert('회원가입 결과:', result);
        } else {
            alert('회원가입 실패:', response.status);
        }
    }
    useEffect(()=>{
        if(team === '팀 없음'){
            setPositions (positionSetting);
        } else {
            let newArr = [...positionSetting];
            let newItems = newArr.slice(0,4);
            setPositions (newItems);
        }
    },[team])

    return(
        <section className="admin-join-container">
            <div>
                <h1>회원가입</h1>
                <span>아이디 : </span><input type="text" value={joinId} onChange={(e)=>Id(e.target.value)} placeholder="아이디"/>
                <br/><br/>
                <span>비밀번호 : </span><input type="password" value={joinPw} onChange={(e)=>Pw(e.target.value)} placeholder="비밀번호"/>
                <br/><br/>
                <span>주소 : </span><input value={address} onChange={(e)=>setAddress(e.target.value)} placeholder="주소"/>
                <br/><br/>
                <span>이름 : </span><input value={name} onChange={(e)=>setName(e.target.value)} placeholder="이름"/>
                <br/><br/>
                <span>이메일 : </span><input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="이메일"/>
                <br/><br/>
                <span>팀 (API로 가져오기): </span>
                <select value={team} onChange={(e)=>setTeam(e.target.value)}>
                    <option>팀 없음</option><option>개발 1팀</option><option>개발 2팀</option>
                </select>
                <br/><br/>
                <span>직급 : </span>
                <select value={position} onChange={(e)=>setPosition(e.target.value)}>
                    {
                        positions.map((p) => (
                            <option>{p}</option>
                        ))
                    }
                </select>
                <br/><br/>
                <span>권한 : </span>
                <select value={role} onChange={(e)=>setRole(e.target.value)}>
                    <option>일반</option>
                    <option>관리자</option>
                </select>
                <br/><br/>
                <button onClick={()=>{joinUser(joinId,joinPw,address,email,name,position,role,team)}}>회원가입</button>
            </div>
        </section>
    )
}

export default AdminJoin;