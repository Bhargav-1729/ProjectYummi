const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String } 
  });
  

const restaurantSchema = new mongoose.Schema({
  restaurantName: String,
  ownerName: String,
  email: String,
  phone: String,
  password: String,
  address: String,
  deliveryRadius: Number,
  businessHours: String,
  restaurantDescription: String,
  logo: String,
  menuImages: [String],
  foodLicense: String,
  healthCertification: String,
  accountNumber: String,
  routingNumber: String,
  menuItems: [ menuItemSchema ],
  role : String
});


const Restaurant = mongoose.model('Restaurant', restaurantSchema);
module.exports = Restaurant;
