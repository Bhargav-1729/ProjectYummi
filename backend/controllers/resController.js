const Restaurant = require('../models/restaurantModel');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

exports.createRestaurant = async (req, res) => {
    try {
      const {
        restaurantName,
        ownerName,
        email,
        phone,
        password,
        address,
        deliveryRadius,
        businessHours,
        menuItems,
        restaurantDescription,
        accountNumber,
        routingNumber
      } = req.body;
  
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
   
      const role = 'Restaurant';
      // Extract uploaded files
      const logo = req.files['logo'] ? req.files['logo'][0].path : null;
      const menuImages = req.files['menuImages'] ? req.files['menuImages'].map(file => file.path) : [];
      const foodLicense = req.files['foodLicense'] ? req.files['foodLicense'][0].path : null;
      const healthCertification = req.files['healthCertification'] ? req.files['healthCertification'][0].path : null;
      // Create new restaurant document

      const processedMenuItems = menuItems.map((item, index) => ({
        name: item.name,
        price: item.price,
        category: item.category,
        description: item.description,
        image: req.files[`menuItems[${index}][image]`] ? req.files[`menuItems[${index}][image]`][0].filename : null
      }));

      const newRestaurant = new Restaurant({
        restaurantName,
        ownerName,
        email,
        phone,
        password: hashedPassword,
        address,
        deliveryRadius,
        businessHours,
        menuItems: processedMenuItems,
        restaurantDescription,
        logo,
        menuImages,
        foodLicense,
        healthCertification,
        accountNumber,
        routingNumber,
        role
      });
  
      // Save the restaurant to the database
      await newRestaurant.save();
      res.send('Restaurant registered successfully!');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error registering restaurant');
    }
  };

  exports.renderDashboard = async (req, res) => {
    try {
        const restaurantId = req.user.userId; // Use userId from the token

        if (!mongoose.Types.ObjectId.isValid(restaurantId)) {
            return res.status(400).send('Invalid restaurant ID');
        }

        const restaurant = await Restaurant.findById(restaurantId);
        if (!restaurant) {
            return res.status(404).send('Restaurant not found');
        }

        if (!Array.isArray(restaurant.menuItems)) {
            restaurant.menuItems = [];
        }

        res.json(restaurant);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error loading dashboard');
    }
};
