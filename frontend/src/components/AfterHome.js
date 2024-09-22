import React from 'react';
import '../css/afterHome.css'; // Create this CSS file to handle styles

const HomePage = () => {
  return (
    <div className="home-container">
      {/* Background Image */}
      <div className="header">
        <div className="nav">
          <button className="cart-btn">Cart</button>
          <button className="profile-btn">Profile</button>
        </div>
        <div className="search-section">
          <h1 className="logo">Yummi</h1>
          <input type="text" className="search-bar" placeholder="Search" />
        </div>
      </div>

      {/* Hot Picks Section */}
      <div className="hot-picks">
        <h2>Hot Picks</h2>
        <div className="dishes">
          <div className="dish-item">Dish 1</div>
          <div className="dish-item">Dish 2</div>
          <div className="dish-item">Dish 3</div>
          <div className="dish-item">Dish 4</div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
