import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Menu from './components/Menu';
import About from './components/About';
import Contact from './components/Contact';
import RegisterForm from './components/RegisterForm';
import RegisterUser from './components/RegisterUser';
import RegisterAdmin from './components/RegisterAdmin';
import RestaurantDashboard from './components/RestaurantDashboard';
import AfterHome from './components/AfterHome';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/registerForm" element={<RegisterForm />}/>
                <Route path="/register-user" element={<RegisterUser />} />
                <Route path="/register-admin" element={<RegisterAdmin />}/>
                <Route path="/restaurantDashboard" element={<RestaurantDashboard />}/>
                <Route path="/afterhome" element={<AfterHome />}/>
                
            </Routes>
        </Router>
    );
}

export default App;
