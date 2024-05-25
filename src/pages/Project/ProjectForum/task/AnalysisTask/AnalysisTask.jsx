import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Alert from 'react-bootstrap/Alert';

const AnalysisTask = () =>{
    const [posts, setPosts] = useState([]);
    const { projectCode, process } = useParams();
    const [projectInfo, setProjectInfo] = useState([]);

    useEffect(() => {
        getProjectInfo();
    }, [projectCode, process]);

    const getProjectInfo = async() => {
        try{
            const response = await axios.get(`http://localhost:8080/project/${projectCode}/${process}`, { 
                headers: {
                    'Authorization': window.localStorage.getItem("token")
                },
            });
            if (Array.isArray(response.data.obj)) {
                setPosts(response.data.obj);
            } else {
                console.error('Unexpected response data format:', response.data.obj);
            }
            console.log(response.data.obj);
            setProjectInfo(response.data.obj);
        }
        catch(err){
            console.error(err);
        }
    }
    
    return(
            <div>
            <header class="py-3">
                <div class="container px-12">
                    <div class="row justify-content-center">
                        <div class="col-lg-8 col-xxl-6">
                            <div class="my-5">
                                <h1 class="fw-bolder mb-3">개미와 배짱이 분석</h1>{/*<h1>{projectInfo.projectName} 분석</h1> */}
                                <p>뙤약볕이 내리쬐는 한 여름에 개미들은 땀을 뻘뻘 흘리며 일했지만 베짱이는 시원한 나무 그늘에서 놀기만 했다. 개미들은 부지런히 먹을 것을 날랐다. 
                                    개미는 베짱이에게 곧 겨울이 오니 일을 하라고 말했지만 베짱이는 듣지 않았다. 어느 새 겨울이 왔다.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <Tabs
                defaultActiveKey="profile"
                id="uncontrolled-tab-example"
                className="mb-3"
                >
                <Tab eventKey="home" title="요구분석">
                </Tab>
                <Tab eventKey="profile" title="환경분석">
                    Tab content for Profile
                </Tab>
                <Tab eventKey="contact" title="SWOT분석">
                    Tab content for Contact
                </Tab>
            </Tabs>
            </div>

        //     <h1>프로젝트 게시글</h1>
        //     {posts.length === 0 ? (
        //         <div>No posts available</div>
        //     ) : (
        //         <ul>
        //             {posts.map(post => (
        //                 <li key={post.task_code}>
        //                     <h2>{post.task_name}</h2>
        //                     <p>{post.task_detail}</p>
        //                 </li>
        //             ))}
        //         </ul>
        //     )}
        // </div>
    );
}

export default AnalysisTask;