import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Typography } from '@mui/material';
import { getPost } from '../../services/postService';

const PostDetails = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        fetchPost();
    }, []);

    const fetchPost = async () => {
        const { data } = await getPost(id);
        setPost(data);
    };

    if (!post) {
        return <Typography variant="h6">Loading...</Typography>;
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h4">{post.title}</Typography>
                <Typography variant="body1">{post.content}</Typography>
            </Grid>
        </Grid>
    );
};

export default PostDetails;
