// CommentForm.js
import React, { useState, useEffect } from 'react';
import { TextField, Button, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { createComment } from '../../services/commentService';
import { getUsers } from '../../services/userService';
import { getPosts } from '../../services/postService';

const CommentForm = () => {
    const [content, setContent] = useState('');
    const [userId, setUserId] = useState('');
    const [postId, setPostId] = useState('');
    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchUsers();
        fetchPosts();
    }, []);

    const fetchUsers = async () => {
        const { data } = await getUsers();
        setUsers(data);
    };

    const fetchPosts = async () => {
        const { data } = await getPosts();
        setPosts(data);
    };

    const handleSubmit = async (e) => {
        console.log({ content, author:userId, post:postId })
        e.preventDefault();
        await createComment({ content, author:userId, post:postId });
        navigate('/comments');
    };

    return (
        <form onSubmit={handleSubmit}>
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
            <FormControl fullWidth margin="normal">
                <InputLabel>Post</InputLabel>
                <Select
                    value={postId}
                    onChange={(e) => setPostId(e.target.value)}
                >
                    {posts.map(post => (
                        <MenuItem key={post._id} value={post._id}>
                            {post.title}
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

export default CommentForm;
