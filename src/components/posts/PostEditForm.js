import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Typography, Paper } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { getPost, updatePost } from '../../services/postService';

const PostEditForm = () => {
    const { id } = useParams();
    const [post, setPost] = useState({ title: '', content: '' });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
            const { data } = await getPost(id);
            setPost(data);
        };
        fetchPost();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updatePost(id, post);
        navigate('/posts');
    };

    return (
        <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
            <Typography variant="h4" gutterBottom>
                Edit Post
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Title"
                            variant="outlined"
                            value={post.title}
                            onChange={(e) => setPost({ ...post, title: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Content"
                            variant="outlined"
                            multiline
                            rows={4}
                            value={post.content}
                            onChange={(e) => setPost({ ...post, content: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" color="primary" type="submit" fullWidth>
                            Update Post
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    );
};

export default PostEditForm;
