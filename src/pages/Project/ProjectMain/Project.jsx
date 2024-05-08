import { useState } from 'react';
import './Project.css';
import ProjectComponent from './ProjectComponent';

const Project = () => {

    const [project,setProject] = useState({});
    const [title,setTitle] = useState('전체 프로젝트');


    const getAllProject = () => {
        setProject({data: 'all'})
        setTitle('전체 프로젝트')
    }
    const getMyProject = () => {
        setProject({data: 'my'})
        setTitle('내 프로젝트');
    }


    return(
        <section style={{display:'flex'}}>
            <section className="project-main-sidebar">
                <div>프로젝트</div>
                <ol>
                    <li onClick={getAllProject}>전체 프로젝트</li>
                    <li onClick={getMyProject}>내 프로젝트</li>
                </ol>
            </section>
            <ProjectComponent project={project} title={title}/>
        </section>
    )
}

export default Project;