import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './ProjectForumPost.css';
import './ProjectForum.css';
import DOMPurify from 'dompurify';
import LocationButton from "../Component/LocationButton";
import { openInputModalWithMassage, openModalWithMessage } from "../../Modal/modalFunc";
import { useSelector } from "react-redux";
import ProjectMember from "./ProjectMember";

const ProjectForumPost = () => {
    const params = useParams();
    const projectCode = params.projectCode;
    const forumCode = params.projectForumCode;
    const [forum, setForum] = useState([]);
    const [post,setPost] = useState([]);

    useEffect(()=>{
        console.log(forumCode);
        getPostData();
        getForumData();
    },[]);

    function SafeHTMLComponent({ html }) {
        const cleanHTML = DOMPurify.sanitize(html);
        return <div dangerouslySetInnerHTML={{ __html: cleanHTML }} />;
      }
      const getForumData = async () => {
        const response = await axios.get(`http://localhost:8080/projects/${projectCode}`,
        {
            headers: {Authorization: localStorage.getItem('token')}
        }
        )
        setForum(response.data.obj);
        console.log(response.data);
    }

    const getPostData = async () => {
        const response = await axios.get(`http://localhost:8080/projects/tasks/${forumCode}/task-posts`,
        {
            headers: {Authorization: localStorage.getItem('token')}
        })
        console.log(response.data.obj);
        setPost(response.data.obj)
    }

    return(
        <section style={{display: "flex"}}>
            
            { forum.projectCode ? 
            <section className="project-forum-sidebar">
                <LocationButton location={`/project/${projectCode}`}/>
                <ProjectMember projects = {forum} />
            </section>
            : 
            <section></section>
            }
            <header className="project-forum-post-header">
                <div>{projectCode}번 프로젝트</div>
                <div>{forumCode}번 게시글</div>
            </header>
            <main>
            {/* {post?(post.map((p)=>(
                    <article className="project-forum-post">
                        <header>
                            <div>게시글 코드 : {p.taskPostCode}</div>
                            <div>작성일 : {p.taskPostTime}</div>
                            <div>작성자 : {p.teamName}, {p.accountName}</div>
                        </header>
                        <main>
                            <SafeHTMLComponent html={p.projectForumPostContent} />
                        </main>
                    </article>
                    ))
                ) : (<div>아무 것도 없음</div>)
            } */}
            </main>
        </section>
    )
}
export default ProjectForumPost;