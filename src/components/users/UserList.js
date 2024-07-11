import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { getUsers, deleteUser } from '../../services/userService';

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const { data } = await getUsers();
        setUsers(data);
    };

    const handleDelete = async (id) => {
        await deleteUser(id);
        fetchUsers();
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h4" gutterBottom>User List</Typography>
                <Button component={Link} to="/users/new" variant="contained" color="primary">
                    Add User
                </Button>
                <List>
                    {users.map(user => (
                        <ListItem key={user._id}>
                            <ListItemText primary={user.name} secondary={user.email} />
                            <ListItemSecondaryAction>
                                <IconButton component={Link} to={`/users/edit/${user._id}`} edge="end" aria-label="edit">
                                    <EditIcon />
                                </IconButton>
                                <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(user._id)}>
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

export default UserList;
