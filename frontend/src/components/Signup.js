import React, { useState } from 'react';
import { signupUser } from '../services/api';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = { username, email, password };
        console.log(formData);  // Add this to verify data before sending
        
        try {
            const response = await signupUser(formData);
            console.log(response.data);
        } catch (error) {
            console.error('Signup error', error);
        }
    };
    

    return (
        <form onSubmit={handleSubmit}>
            <h2>Signup</h2>
            <input
                type ="text"
                placeholder='username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
            <button type="submit">Signup</button>
        </form>
    );
};

export default Signup;
