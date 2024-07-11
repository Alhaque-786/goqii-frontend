import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Typography, Paper } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { getComment, updateComment } from '../../services/commentService';

const CommentEditForm = () => {
    const { id } = useParams();
    const [comment, setComment] = useState({ content: '' });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchComment = async () => {
            const { data } = await getComment(id);
            setComment(data);
        };
        fetchComment();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateComment(id, comment);
        navigate('/comments');
    };

    return (
        <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
            <Typography variant="h4" gutterBottom>
                Edit Comment
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Content"
                            variant="outlined"
                            multiline
                            rows={4}
                            value={comment.content}
                            onChange={(e) => setComment({ ...comment, content: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" color="primary" type="submit" fullWidth>
                            Update Comment
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    );
};

export default CommentEditForm;
