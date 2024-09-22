import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import { getRestaurantData } from '../services/api'; // Import the function from api.js
// Incorrect import, remove this:


const RestaurantDashboard = () => {
    const [restaurant, setRestaurant] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Retrieve token from localStorage
        const token = localStorage.getItem('token');

        if (!token) {
            navigate('/login');
            console.log('fuck');
            return;
        }

        // Decode JWT token to get user role
        const decodedToken = jwtDecode(token);
        if (decodedToken.role !== 'Restaurant') {
            navigate('/login');
            console.log("suck");
            return;
        }

        // Fetch restaurant data from the backend using the token
        const fetchRestaurantData = async () => {
            try {
                const response = await getRestaurantData(token); // Use the API function
                setRestaurant(response.data);
            } catch (error) {
                console.error('Error fetching restaurant data:', error);
                setError('Failed to load restaurant data. Please log in again.');
                navigate('/login');
            } finally {
                setLoading(false);
            }
        };

        fetchRestaurantData();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token'); // Clear the token from localStorage
        navigate('/login');
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>Welcome, {restaurant?.ownerName}!</h1>

            <section>
                <h2>Restaurant Details</h2>
                {restaurant?.logo && (
                    <img
                        src={`http://localhost:5000/uploads/${restaurant.logo}`}
                        alt="Restaurant Logo"
                    />
                )}
                <p><strong>Restaurant Name:</strong> {restaurant?.restaurantName}</p>
                <p><strong>Email:</strong> {restaurant?.email}</p>
                <p><strong>Phone:</strong> {restaurant?.phone}</p>
                <p><strong>Address:</strong> {restaurant?.address}</p>
                <p><strong>Delivery Radius:</strong> {restaurant?.deliveryRadius} km</p>
            </section>

            <section>
                <h2>Menu Management</h2>
                <ul>
                    {restaurant?.menuItems && restaurant.menuItems.length > 0 ? (
                        restaurant.menuItems.map((item, index) => (
                            <li key={index}>
                                <strong>{item.name}</strong> - ${item.price}
                            </li>
                        ))
                    ) : (
                        <li>No menu items available.</li>
                    )}
                </ul>
                <a href="/menu">Edit Menu</a>
            </section>

            <section>
                <h2>Order History</h2>
                <p>No orders yet.</p>
            </section>

            <button onClick={handleLogout}>Log Out</button>
        </div>
    );
};

export default RestaurantDashboard;
