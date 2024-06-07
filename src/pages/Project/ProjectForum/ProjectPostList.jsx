import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProjectPostList = ({forum}) => {
    const navigate = useNavigate();
    return (
        <tbody>
            {
            forum ?
                forum.map((value) => (
                    <tr onClick={() => { navigate(`${value.projectForumCode}`) }} key={value.projectForumCode}>
                        <td>{value.projectForumCode}</td>
                        <td>{value.projectForumStatus}</td>
                        <td>{value.projectForumName}</td>
                        <td>{value.projectForumCreateTime}</td>
                        <td>{value.projectForumModifyDate}</td>
                    </tr>
                )) :
                (<div></div>)
            }
        </tbody>
    );
};

export default ProjectPostList;