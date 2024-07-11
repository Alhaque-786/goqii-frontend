import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Typography } from '@mui/material';
import { getUser } from '../../services/userService';

const UserDetails = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        const { data } = await getUser(id);
        setUser(data);
    };

    if (!user) {
        return <Typography variant="h6">Loading...</Typography>;
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h4">{user.name}</Typography>
                <Typography variant="body1">Email: {user.email}</Typography>
                <Typography variant="body1">Date of Birth: {user.dob}</Typography>
            </Grid>
        </Grid>
    );
};

export default UserDetails;
