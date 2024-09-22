import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

export const loginUser = (formData) => API.post('/auth/login', formData);
export const signupUser = (formData) => API.post('/auth/signup', formData);
export const Registeradmin = (formData) => API.post('/auth/registerAdmin', formData);
export const registerRestaurant = (formData) => API.post('/auth/registerForm', formData);

export const getRestaurantData = (token) => 
    API.get('auth/restaurantDash', { 
      headers: { Authorization: `Bearer ${token}` } 
});