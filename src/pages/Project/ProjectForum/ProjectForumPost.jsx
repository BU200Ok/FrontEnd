import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './ProjectForumPost.css';
import './ProjectForum.css';
import DOMPurify from 'dompurify';
import LocationButton from "../Component/LocationButton";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { openInputModalWithMassage, openModalWithMessage } from "../../Modal/modalFunc";
import { useSelector } from "react-redux";
import ProjectMember from "./ProjectMember";

const ProjectForumPost = () => {
    const params = useParams();
    const projectCode = params.projectCode;
    const forumCode = params.projectForumCode;
    // const [forum, setForum] = useState([]);
    const [post,setPost] = useState([]);

    useEffect(()=>{
        console.log(forumCode);
        console.log("projectforumpostprojectforumpostprojectforumpostprojectforumpostprojectforumpost")
        getPostData();
        // getForumData();
    },[]);

    function SafeHTMLComponent({ html }) {
        const cleanHTML = DOMPurify.sanitize(html);
        return <div dangerouslySetInnerHTML={{ __html: cleanHTML }} />;
      }
    // const getForumData = async () => {
    //     const response = await axios.get(`http://localhost:8080/projects/${projectCode}`,
    //     {
    //         headers: {Authorization: localStorage.getItem('token')}
    //     }
    //     )
    //     setForum(response.data.obj);
    //     console.log(response.data);
    // }

    const getPostData = async () => {
        const response = await axios.get(`http://localhost:8080/projects/tasks/${forumCode}/task-posts`,
        {
            headers: {Authorization: localStorage.getItem('token')}
        })
        console.log(response.data.obj);
        setPost(response.data.obj)
    }

    return(
        <section style={{display:"flex"}}>
            <div style={{display:"flex", flexDirection:"column", height:"100%", justifyContent:"space-between"}}>
                <header className="project-forum-post-header">
                    <div>{projectCode}번 프로젝트</div>
                    <div>{forumCode}번 게시글</div>
                </header>
                <main>
                <div style={{width: "1100px"}}>
                    {post?(post.map((p)=>(
                            <article className="project-forum-post project-sidebar-scrollable-container">
                                <header>
                                    {/* <div>게시글 코드 : {p.taskPostCode}</div> */}
                                    <div>{p.teamName} {p.accountName}</div>
                                    <div>{p.taskPostTime}</div>
                                </header>
                                <main>
                                    <SafeHTMLComponent html={p.taskPostDetail} />
                                    <footer>
                                        <div>첨부파일 : </div>
                                    </footer>
                                </main>
                            </article>
                            ))
                        ) : (<div>아무 것도 없음</div>)
                    }
                </div>
                <div>
                    <CKEditor
                    editor={ClassicEditor}
                    />
                </div>
                </main>
            </div>
        </section>
    )
}
export default ProjectForumPost;