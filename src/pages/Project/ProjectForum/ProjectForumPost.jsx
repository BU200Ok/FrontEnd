import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './ProjectForumPost.css';
import './ProjectForum.css';
import DOMPurify from 'dompurify';
import LocationButton from "../Component/LocationButton";
import { openInputModalWithMassage, openModalWithMessage } from "../../Modal/modalFunc";
import { useSelector } from "react-redux";

const ProjectForumPost = () => {
    const params = useParams();
    const projectCode = params.projectCode;
    const forumCode = params.projectForumCode;
    const [post,setPost] = useState([]);

    // useEffect(()=>{
    //     getPostData();
    // },[]);

    function SafeHTMLComponent({ html }) {
        const cleanHTML = DOMPurify.sanitize(html);
        return <div dangerouslySetInnerHTML={{ __html: cleanHTML }} />;
    }

    const getPostData = async () => {
        const response = await axios.get(`http://localhost:8080/project/get-project-forum-post?projectForumCode=${forumCode}`,
        {
            headers: {Authorization: localStorage.getItem('token')}
        })
        console.log(response.data.obj);
        setPost(response.data.obj)
    }

    return(
        <section>
            <LocationButton location={`/project/${projectCode}`}/>
            <header className="project-forum-post-header">
                <div>{projectCode}번 프로젝트</div>
                <div>{forumCode}번 게시글</div>
            </header>
            <main>
            {/* {post?(post.map((p)=>(
                    <article className="project-forum-post">
                        <header>
                            <div>게시글 코드 : {p.projectForumPostCode}</div>
                            <div>작성일 : {p.projectForumPostWriteDate}</div>
                            <div>작성자 : {p.account.team.teamName}, {p.account.accountPosition}, {p.account.accountName}</div>
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