import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Typography } from '@mui/material';
import { getComment } from '../../services/commentService';

const CommentDetails = () => {
    const { id } = useParams();
    const [comment, setComment] = useState(null);

    useEffect(() => {
        fetchComment();
    }, []);

    const fetchComment = async () => {
        const { data } = await getComment(id);
        setComment(data);
    };

    if (!comment) {
        return <Typography variant="h6">Loading...</Typography>;
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="body1">{comment.content}</Typography>
            </Grid>
        </Grid>
    );
};

export default CommentDetails;
