import React from 'react';
import { useSelector } from 'react-redux';

const WishlistMenu = ({ isOpen, onClose }) => {
  const wishlistItems = useSelector((state) => state.wishlist.items);

  return (
    <div className={`wishlistModal ${isOpen ? 'open' : ''}`}>
      <div className="wishlistOverlay" onClick={onClose}></div>
      <div className="wishlistContent">
        <div className="wishlistHeader">
          <h2>Wishlist</h2>
          <button onClick={onClose}>Close</button>
        </div>
        <ul>
          {wishlistItems.map((item) => (
            <li key={item.id}>
              <div className="wishlistItem">
                <img src={item.images[0]} alt={item.title} />
                <p>{item.title}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WishlistMenu;
