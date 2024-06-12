import React from 'react';
import { useNavigate } from 'react-router-dom';

const UpdateButton = ({ forum, userInfo }) => {
    const navigate = useNavigate();

    const handleEditClick = () => {
        navigate(`/forum/edit/${forum.forumCode}`,{
            state: { forum, userInfo} 
        });
    };


    return (
        <button
            onClick={handleEditClick}
            className="btn btn-outline-primary"
            style={{ textDecoration: 'none' }}>
            수정
        </button>
    );
};

export default UpdateButton;
