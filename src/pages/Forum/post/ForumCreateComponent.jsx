import React, { useState } from 'react';
import axios from 'axios';

const ForumCreateComponent = () => {
    const [forum, setForum] = useState({ title: '', content: '' });

    const handleChange = (e) => {
        setForum({ ...forum, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        const response = await axios.post('http://localhost:8080/create', forum);
        console.log('Forum created:', response.data);
        // Redirect or display success message
        } catch (error) {
        console.error('Failed to create forum:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
        <label>
            Title:
            <input type="text" name="title" value={forum.title} onChange={handleChange} />
        </label>
        <label>
            Content:
            <textarea name="content" value={forum.content} onChange={handleChange} />
        </label>
        <button type="submit">Submit</button>
        </form>
    );
};

export default ForumCreateComponent;