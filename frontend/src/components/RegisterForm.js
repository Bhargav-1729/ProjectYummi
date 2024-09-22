import React, { useState } from 'react';
import { registerRestaurant } from '../services/api'; // Adjust the path as necessary

const RegisterForm = () => {
    const [restaurantName, setRestaurantName] = useState('');
    const [ownerName, setOwnerName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [deliveryRadius, setDeliveryRadius] = useState('');
    const [businessHours, setBusinessHours] = useState('');
    const [restaurantDescription, setRestaurantDescription] = useState('');
    const [menuItems, setMenuItems] = useState([{ name: '', price: '', category: '', description: '', image: null }]);
    const [logo, setLogo] = useState(null);
    const [foodLicense, setFoodLicense] = useState(null);
    const [healthCertification, setHealthCertification] = useState(null);
    const [accountNumber, setAccountNumber] = useState('');
    const [routingNumber, setRoutingNumber] = useState('');

    const addMenuItem = () => {
        setMenuItems([...menuItems, { name: '', price: '', category: '', description: '', image: null }]);
    };

    const handleMenuItemChange = (index, e) => {
        const { name, value, files } = e.target;
        const updatedMenuItems = [...menuItems];
        if (files) {
            updatedMenuItems[index][name] = files[0];
        } else {
            updatedMenuItems[index][name] = value;
        }
        setMenuItems(updatedMenuItems);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('restaurantName', restaurantName);
        formData.append('ownerName', ownerName);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('password', password);
        formData.append('address', address);
        formData.append('deliveryRadius', deliveryRadius);
        formData.append('businessHours', businessHours);
        formData.append('restaurantDescription', restaurantDescription);
        formData.append('logo', logo);
        formData.append('foodLicense', foodLicense);
        formData.append('healthCertification', healthCertification);
        formData.append('accountNumber', accountNumber);
        formData.append('routingNumber', routingNumber);

        menuItems.forEach((item, index) => {
            formData.append(`menuItems[${index}][name]`, item.name);
            formData.append(`menuItems[${index}][price]`, item.price);
            formData.append(`menuItems[${index}][category]`, item.category);
            formData.append(`menuItems[${index}][description]`, item.description);
            formData.append(`menuItems[${index}][image]`, item.image);
        });

        try {
            await registerRestaurant(formData); // Use the imported API function
            alert('Restaurant registered successfully!');
        } catch (error) {
            console.error('Error registering restaurant:', error);
            alert('Failed to register restaurant');
        }
    };

    return (
        <div>
            <h1>Register Your Restaurant</h1>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <h2>Basic Information</h2>
                <label>Restaurant Name:</label>
                <input type="text" value={restaurantName} onChange={(e) => setRestaurantName(e.target.value)} required /><br />

                <label>Owner's Name:</label>
                <input type="text" value={ownerName} onChange={(e) => setOwnerName(e.target.value)} required /><br />

                <label>Email Address:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /><br />

                <label>Phone Number:</label>
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required /><br />

                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required /><br />

                <h2>Location and Address</h2>
                <label>Physical Address:</label>
                <textarea value={address} onChange={(e) => setAddress(e.target.value)} required></textarea><br />

                <label>Delivery Radius (km):</label>
                <input type="number" value={deliveryRadius} onChange={(e) => setDeliveryRadius(e.target.value)} required /><br />

                <h2>Operating Hours</h2>
                <label>Business Hours:</label>
                <input type="text" value={businessHours} onChange={(e) => setBusinessHours(e.target.value)} placeholder="e.g. Mon-Fri: 9am-10pm" required /><br />

                <h2>Menu Information</h2>
                {menuItems.map((item, index) => (
                    <div key={index} className="menuItem">
                        <label>Item Name:</label>
                        <input type="text" name="name" value={item.name} onChange={(e) => handleMenuItemChange(index, e)} required /><br />

                        <label>Price:</label>
                        <input type="number" name="price" value={item.price} onChange={(e) => handleMenuItemChange(index, e)} required /><br />

                        <label>Category:</label>
                        <input type="text" name="category" value={item.category} onChange={(e) => handleMenuItemChange(index, e)} placeholder="e.g. Appetizer, Main Course" required /><br />

                        <label>Description:</label>
                        <textarea name="description" value={item.description} onChange={(e) => handleMenuItemChange(index, e)} placeholder="Item description" required></textarea><br />

                        <label>Upload Image:</label>
                        <input type="file" name="image" onChange={(e) => handleMenuItemChange(index, e)} required /><br />
                    </div>
                ))}
                <button type="button" onClick={addMenuItem}>Add Another Menu Item</button>

                <h2>Branding</h2>
                <label>Restaurant Description:</label>
                <textarea value={restaurantDescription} onChange={(e) => setRestaurantDescription(e.target.value)}></textarea><br />

                <label>Upload Logo:</label>
                <input type="file" onChange={(e) => setLogo(e.target.files[0])} required /><br />

                <h2>Licenses and Certifications</h2>
                <label>Food Business License:</label>
                <input type="file" onChange={(e) => setFoodLicense(e.target.files[0])} required /><br />

                <label>Health and Safety Certification:</label>
                <input type="file" onChange={(e) => setHealthCertification(e.target.files[0])} /><br />

                <h2>Payment Information</h2>
                <label>Bank Account Number:</label>
                <input type="text" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} required /><br />

                <label>Routing Number:</label>
                <input type="text" value={routingNumber} onChange={(e) => setRoutingNumber(e.target.value)} required /><br />

                <button type="submit">Register Restaurant</button>
            </form>
        </div>
    );
};

export default RegisterForm;
