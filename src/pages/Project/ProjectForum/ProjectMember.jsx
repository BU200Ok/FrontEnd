import React, { useEffect } from 'react';
import { openInputModalWithMassage } from '../../Modal/modalFunc';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { openModal } from '../../Modal/modalActions';

const ProjectMember = ({projects}) => {
    const value = useSelector(state => state.inputModalValue);
    useEffect(()=>{
        if(value.value !== ''){
            addMemberAPI();
        }
    },[value])
    const addMember = async () => {
        openInputModalWithMassage("아이디를 입력하세요!");
    }
    const addMemberAPI = async () => {
        try{
            const res = await axios.post(`http://localhost:8080/projects/${projects.projectCode}/accounts/add?memberName=${value.value}`,{},{
                headers:{
                    Authorization: window.localStorage.getItem('token')
                }
            });
            window.location.reload();
            openModal('추가가 완료되었습니다!');
        } catch(err){
            openModal(err,'의 이유로 실패했습니다.');
        }
    }
    return (projects ? 
        <div className='task-bottom-members'>
            <section className="project-sidebar-bottom-container">
                <button onClick={addMember}>추가하기</button>
                <div style={{ textAlign: 'start', fontSize: 20 }}>프로젝트 참여자</div>
                <section className="project-sidebar-scrollable-container">
                    { 
                        projects.accounts.map((mem, index) => (
                            <div className="project-sidebar-scrollable-member" key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <div className="project-sidebar-profile-img">
                                </div>
                                <div>{mem.accountName}</div>
                                <div>
                                    <div>
                                        <div style={{ fontSize: 14 }}>{mem.departmentName}</div>
                                        <div>{mem.accountPosition}</div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </section>
            </section>
        </div>
    :
    <span>정보를 가져오는 중...</span>);
};

export default ProjectMember;