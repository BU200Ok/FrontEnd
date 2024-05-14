import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import './ProjectForum.css';
import axios from "axios";

const ProjectForum = () => {
    const {projectCode} = useParams();
    const [project, setProject] = useState(null);
    const navigate = useNavigate();
    const [leftDay, setLeftDay] = useState();

    useEffect(()=>{
        if(project === null && projectCode){
            getSidebarData(projectCode);
            
        }
    },[projectCode])

    const getSidebarData = async () => {
        const response = await axios.get(`http://localhost:8080/project/project-sidebar?projectCode=${projectCode}`,
        {
            headers: {Authorization: localStorage.getItem('token')}
        }
        )
        setProject(response.data.obj);
        dayUtil(response.data.obj.projectEnd);
    }
    const dayUtil = (end) => {
            const today = new Date();
            const endDate = new Date(end);
            const timeDiff = endDate - today;
            const days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
            setLeftDay(days);
    }
    return(
        <section style={{display:'flex'}}>
            { project ? 
            <section className="project-forum-sidebar">
                <div style={{fontSize:25,marginTop:30}}>프로젝트 게시판</div>
                <section className="project-forum-project-information">
                    <div style={{display:'flex'}}>
                        <div style={{fontSize:25,marginRight:29}}>{project.projectName}</div>
                        {
                            project.projectOpenStatus == 1 ?
                            (<img style={{pointerEvents:'none'}} src="./lock-open.png" width={30} height={30}/>)
                            :
                            (<img style={{pointerEvents:'none'}} src="./lock.png" width={30} height={30}/>)
                        }
                        
                    </div>
                    <div style={{display:'flex',alignItems:'center'}}>
                        <img src="./profile.png"/>
                        <div style={{marginLeft:10,marginRight:137,width:100}}>{project.account.accountName}</div>
                        <div  style={{display:'flex', flexDirection:'column',width:100}}>
                            <div>{project.account.team.department.departmentName}</div>
                            <div>{project.account.team.teamName}</div>
                        </div>
                    </div>
                    <div style={{display:'flex',marginTop:35,alignItems:'center'}}>
                        <div style={{fontSize:20, marginRight:20}}>마감기한</div>
                        <div>{project.projectEnd}</div>
                        {
                            leftDay < 0 ? (<div style={{marginLeft:50,color:'red'}}>마감</div>)
                            :
                            <div style={{marginLeft:50,color:'red'}}>{leftDay}일 남음</div>
                        }
                        
                    </div>
                    
                    <div className="project-">
                        <div></div>
                    </div>

                </section>
                <section className="project-sidebar-bottom-container">
                    <div style={{textAlign:'start',fontSize:20}}>프로젝트 참여자</div>
                    <section className="project-sidebar-scrollable-container">
                    {
                        project.member.map((mem)=>(
                            <div className="project-sidebar-scrollable-member" key={mem.accountCode.accountCode} style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                                <div className="project-sidebar-profile-img">
                                </div>
                                <div>{mem.accountCode.accountName}</div>
                                <div>
                                    <div>
                                        <div style={{fontSize:14}}>{mem.accountCode.team.department.departmentName}</div>
                                        <div>{mem.accountCode.accountPosition}</div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                    </section>
                </section>
            </section>
            : 
            <section></section>
            }
            <section>
                <div><button onClick={()=>{navigate(`/project/${projectCode}/1`)}}>sd</button></div>
            </section>
        </section>
    )
}

export default ProjectForum;