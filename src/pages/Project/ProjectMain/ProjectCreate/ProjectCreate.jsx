import React, { useState } from 'react';
import axios from 'axios';
import './ProjectCreate.css';
import LocationButton from '../../Component/LocationButton';

const ProjectCreate = () => {
    const [formData, setFormData] = useState({
        projectCode: '',
        projectName: '',
        projectStart: '',
        projectEnd: '',
        projectStatus: '',
        projectDescription: '',
        projectOpenStatus: '',
        projectPriority: '',
        accountName: '',
        team: {
            teamCode: '',
            teamName: ''
        },
        member: [
            {
                memberId: '',
                memberName: ''
            }
        ]
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleTeamChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            team: {
                ...formData.team,
                [name]: value
            }
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // POST 요청을 사용하여 서버로 데이터를 전송
        axios.post('http://localhost:8080/project/project-create', formData,{
            headers: {Authorization: localStorage.getItem('token')}
        })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    };

    return (
        <section>
            <LocationButton location={'/project'}/>
        <form onSubmit={handleSubmit} className="project-form">
            <label>
                Project Code:
                <input type="text" name="projectCode" value={formData.projectCode} onChange={handleChange} />
            </label>
            <label>
                Project Name:
                <input type="text" name="projectName" value={formData.projectName} onChange={handleChange} />
            </label>
            <label>
                Project Start:
                <input type="date" name="projectStart" value={formData.projectStart} onChange={handleChange} />
            </label>
            <label>
                Project End:
                <input type="date" name="projectEnd" value={formData.projectEnd} onChange={handleChange} />
            </label>
            <label>
                Project Status:
                <input type="text" name="projectStatus" value={formData.projectStatus} onChange={handleChange} />
            </label>
            <label>
                Project Description:
                <textarea name="projectDescription" value={formData.projectDescription} onChange={handleChange} />
            </label>
            <label>
                Project Open Status:
                <input type="text" name="projectOpenStatus" value={formData.projectOpenStatus} onChange={handleChange} />
            </label>
            <label>
                Project Priority:
                <input type="number" name="projectPriority" value={formData.projectPriority} onChange={handleChange} />
            </label>
            <label>
                Account Name:
                <input type="text" name="accountName" value={formData.accountName} onChange={handleChange} />
            </label>
            <fieldset>
                <legend>Team</legend>
                <label>
                    Team Code:
                    <input type="text" name="teamCode" value={formData.team.teamCode} onChange={handleTeamChange} />
                </label>
                <label>
                    Team Name:
                    <input type="text" name="teamName" value={formData.team.teamName} onChange={handleTeamChange} />
                </label>
            </fieldset>
            <button type="submit">Submit</button>
        </form>
        </section>
    );
};

export default ProjectCreate;
