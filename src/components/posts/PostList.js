import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { getPosts, deletePost } from '../../services/postService';
import { getUsers } from '../../services/userService';

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState({});

    useEffect(() => {
        fetchPostsAndUsers();
    }, []);

    const fetchPostsAndUsers = async () => {
        try {
            const [postsData, usersData] = await Promise.all([getPosts(), getUsers()]);
            const posts = postsData.data;
            const usersMap = {};

            usersData.data.forEach(user => {
                usersMap[user._id] = user.name;
            });

            setPosts(posts);
            setUsers(usersMap);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deletePost(id);
            fetchPostsAndUsers(); // Refresh posts and users after deletion
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h4" gutterBottom>Post List</Typography>
                <Button component={Link} to="/posts/new" variant="contained" color="primary">
                    Add Post
                </Button>
                <List>
                    {posts.map(post => (
                        <ListItem key={post._id}>
                            <ListItemText
                                primary={post.title}
                                secondary={
                                    <>
                                        <Typography component="span" variant="body2" color="textPrimary">
                                            {post.content}
                                        </Typography>
                                        <br />
                                        {`Posted by: ${users[post.user] || 'Unknown User'}`} {/* Handle case where user is undefined */}
                                    </>
                                }
                            />
                            <ListItemSecondaryAction>
                                <IconButton component={Link} to={`/posts/edit/${post._id}`} edge="end" aria-label="edit">
                                    <EditIcon />
                                </IconButton>
                                <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(post._id)}>
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

export default PostList;
