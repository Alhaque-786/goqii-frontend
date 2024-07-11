import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Typography, Paper } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { getUser, updateUser } from '../../services/userService';

const UserEditForm = () => {
    const { id } = useParams();
    const [user, setUser] = useState({ name: '', email: '', password: '', dob: '' });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            const { data } = await getUser(id);
            setUser(data);
        };
        fetchUser();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateUser(id, user);
        navigate('/users');
    };

    return (
        <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
            <Typography variant="h4" gutterBottom>
                Edit User
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Name"
                            variant="outlined"
                            value={user.name}
                            onChange={(e) => setUser({ ...user, name: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            type="email"
                            label="Email"
                            variant="outlined"
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            type="password"
                            label="Password"
                            variant="outlined"
                            value={user.password}
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            type="date"
                            label="Date of Birth"
                            variant="outlined"
                            InputLabelProps={{ shrink: true }}
                            value={user.dob}
                            onChange={(e) => setUser({ ...user, dob: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" color="primary" type="submit" fullWidth>
                            Update User
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    );
};

export default UserEditForm;
