import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { loginUser } from '../services/api';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = { email, password };
        try {
            const response = await loginUser(formData);
            const { token } = response.data;

            localStorage.setItem('token', token);
            // Decode the token to get user role
            const decoded = jwtDecode(token);
            const userRole = decoded.role;

            // Redirect based on user role
            if (userRole === 'Admin') {
                navigate('/register-admin');
            } else if (userRole === 'Restaurant') {
                navigate('/restaurantDashboard');
            } else {
                navigate('/'); // Regular user
            }
        } catch (error) {
            console.error('Login error', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
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
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
