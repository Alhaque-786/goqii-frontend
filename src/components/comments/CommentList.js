import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { getComments, deleteComment } from '../../services/commentService';
import { getUsers } from '../../services/userService';
import { getPosts } from '../../services/postService';

const CommentList = () => {
    const [comments, setComments] = useState([]);
    const [users, setUsers] = useState({});
    const [posts, setPosts] = useState({});

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [commentsResponse, usersResponse, postsResponse] = await Promise.all([
                getComments(),
                getUsers(),
                getPosts()
            ]);
            
            console.log('Fetched comments:', commentsResponse.data);
            console.log('Fetched users:', usersResponse.data);
            console.log('Fetched posts:', postsResponse.data);

            const commentsData = commentsResponse.data;
            const usersData = usersResponse.data;
            const postsData = postsResponse.data;

            // Map users by _id to name
            const usersMap = {};
            usersData.forEach(user => {
                usersMap[user._id] = user.name;
            });

            console.log('Mapped users:', usersMap);

            // Map posts by _id to title
            const postsMap = {};
            postsData.forEach(post => {
                postsMap[post._id] = post.title;
            });

            console.log('Mapped posts:', postsMap);

            // Set state with mapped data
            setComments(commentsData);
            setUsers(usersMap);
            setPosts(postsMap);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleDelete = async (id) => {
        await deleteComment(id);
        fetchData();
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h4" gutterBottom>Comment List</Typography>
                <Button component={Link} to="/comments/new" variant="contained" color="primary">
                    Add Comment
                </Button>
                <List>
                    {comments.map(comment => (
                        <ListItem key={comment._id}>
                            <ListItemText
                                primary={comment.content}
                                secondary={
                                    <>
                                        {users[comment.user] ? `User: ${users[comment.user]}` : 'User: Unknown User'}
                                        <br />
                                        {posts[comment.post] ? `Post: ${posts[comment.post]}` : 'Post: Unknown Post'}
                                    </>
                                }
                            />
                            <ListItemSecondaryAction>
                                <IconButton component={Link} to={`/comments/edit/${comment._id}`} edge="end" aria-label="edit">
                                    <EditIcon />
                                </IconButton>
                                <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(comment._id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>
            </Grid>
        </Grid>
    );
};

export default CommentList;
