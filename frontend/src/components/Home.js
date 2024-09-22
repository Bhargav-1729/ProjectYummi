import React from 'react';
import { Link } from 'react-router-dom';
import '../css/HomePage.css'; // Assuming you'll use external CSS for styling

const HomePage = () => {
    // Dynamic Greeting based on time of day
    const hours = new Date().getHours();
    let greetingMessage = '';

    if (hours < 12) {
        greetingMessage = 'Good Morning! Welcome to Yummi Food Ordering';
    } else if (hours < 18) {
        greetingMessage = 'Good Afternoon! Welcome to Yummi Food Ordering';
    } else {
        greetingMessage = 'Good Evening! Welcome to Yummi Food Ordering';
    }

    return (
        <div>
            {/* Header Section */}
            <header>
                <div className="header-container">
                    <h1 className="logo"><Link to="/">Yummi Food Ordering</Link></h1>
                    <nav>
                        <ul className="nav-links">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/menu">Menu</Link></li>
                            <li><Link to="/about">About Us</Link></li>
                            <li><Link to="/contact">Contact</Link></li>
                            <li><Link to="/login">Login</Link></li>
                        </ul>
                    </nav>
                </div>
            </header>

            {/* Main Content Section */}
            <div className="container">
                <h1 className="welcome-message">{greetingMessage}</h1>
                <p className="subtext">Please select one of the options below to register:</p>

                <div className="registration-options">
                    <div className="option">
                        <h2>Restaurant Registration</h2>
                        <Link to="/registerForm" className="btn">Register as Restaurant</Link>
                    </div>
                    <div className="option">
                        <h2>User Registration</h2>
                        <Link to="/register-user" className="btn">Register as User</Link>
                    </div>
                    <div className="option">
                        <h2>Admin Registration</h2>
                        <Link to="/register-admin" className="btn">Register as Admin</Link>
                    </div>
                    <div className="option">
                        <h2>Login</h2>
                        <Link to="/login" className="btn">Login</Link>
                    </div>
                </div>
            </div>

           
        </div>
    );
};

export default HomePage;
