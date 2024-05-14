import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProjectForumPost = () => {
    const params = useParams();
    const projectCode = params.projectCode;
    const forumCode = params.projectForumCode;
    const [post,setPost] = useState({});
    useEffect(()=>{
        getPostData();
    },[]);

    const getPostData = async () => {
        const response = await axios.get(`http://localhost:8080/project/get-project-forum-post?projectForumCode=${forumCode}`,
        {
            headers: {Authorization: localStorage.getItem('token')}
        })
        console.log(response);
        
    }

    return(
        <section>
            <div>{projectCode}번 프로젝트의</div>
            <div>{forumCode}번 게시글</div>
        </section>
    )
}
export default ProjectForumPost;