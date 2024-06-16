import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './ProjectForumPost.css';
import './ProjectForum.css';
import DOMPurify from 'dompurify';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const ProjectForumPost = () => {
    const params = useParams();
    const projectCode = params.projectCode;
    const forumCode = params.projectForumCode;
    // const [forum, setForum] = useState([]);
    const [post,setPost] = useState([]);
    const [taskContent, setTaskContent] = useState('');
    useEffect(()=>{
        getPostData();
    },[]);

    function SafeHTMLComponent({ html }) {
        const cleanHTML = DOMPurify.sanitize(html);
        return <div dangerouslySetInnerHTML={{ __html: cleanHTML }} />;
    }


    const getPostData = async () => {
        const response = await axios.get(`http://localhost:8080/projects/tasks/${forumCode}/task-posts`,
        {
            headers: {Authorization: localStorage.getItem('token')}
        })
        console.log(response.data.obj);
        setPost(response.data.obj)
    }

    const handleEditorChange = (event, editor) => {
        const data = editor.getData();
        setTaskContent(data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log('Submitting forum data:', forum);
        try {
            const response = await axios.post(`http://localhost:8080/projects/tasks/${forumCode}/task-posts/add`, {taskPostDetail : taskContent}, {
                headers: {
                    'Authorization': window.localStorage.getItem("token")
                }
            });
            console.log('task created:', response.data);
            setTaskContent("");
            getPostData();
        } catch (error) {
            console.error('Creation failed:', error);
            // openModalWithMessage('게시글 작성에 실패했습니다.');
        }
    };
    return(
        <section style={{display:"flex"}}>
            <div style={{display:"flex", flexDirection:"column", height:"100%", justifyContent:"space-between"}}>
                <header className="project-forum-post-header">
                    <div>{projectCode}번 프로젝트</div>
                    <div>{forumCode}번 게시글</div>
                </header>
                <main>
                <div style={{width: "1100px"}}>
                <article className="project-sidebar-scrollable-container" style={{marginBottom: "80px"}}>
                    {post?(post.map((p)=>(
                        <div key={p.taskPostCode} className="project-forum-post">
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
                        </div>
                        ))
                        ) : 
                        (<div>아무 것도 없음</div>)
                    }
                </article>
                </div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <CKEditor
                        editor={ClassicEditor}
                        data={taskContent}
                        onChange={handleEditorChange}
                        onBlur={(event, editor) => {
                            console.log('Blur.', editor);
                        }}
                        onFocus={(event, editor) => {
                            console.log('Focus.', editor);
                        }}
                        onReady={editor => {
                            console.log('Editor is ready to use!', editor);
                        }}
                        config={{
                            placeholder: "내용을 입력하세요.",
                        }}
                        />
                        <button type="submit">작성</button>
                    </div>
                </form>
                </main>
            </div>
        </section>
    )
}
export default ProjectForumPost;