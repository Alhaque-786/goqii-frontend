// PostForm.js
import React, { useState, useEffect } from 'react';
import { TextField, Button, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../../services/postService';
import { getUsers } from '../../services/userService';

const PostForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [userId, setUserId] = useState('');
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const { data } = await getUsers();
        setUsers(data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createPost({ title, content, author:userId });
        navigate('/posts');
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                fullWidth
                margin="normal"
            />
            <FormControl fullWidth margin="normal">
                <InputLabel>User</InputLabel>
                <Select
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                >
                    {users.map(user => (
                        <MenuItem key={user._id} value={user._id}>
                            {user.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Button type="submit" variant="contained" color="primary">
                Submit
            </Button>
        </form>
    );
};

export default PostForm;
