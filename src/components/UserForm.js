import React, { useState } from 'react';
import { createUser } from '../services/userService';

const UserForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [dob, setDob] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = { name, email, password, dob };
        await createUser(user);
        setName('');
        setEmail('');
        setPassword('');
        setDob('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <input
                type="date"
                placeholder="Date of Birth"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
            />
            <button type="submit">Add User</button>
        </form>
    );
};

export default UserForm;
