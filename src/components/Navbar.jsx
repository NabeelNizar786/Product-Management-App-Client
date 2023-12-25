import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faSignInAlt, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { useSelector,useDispatch } from 'react-redux';
import { openNotification } from '../redux/notificationSlice';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ searchItems, openWishlistMenu }) => {
  const cartItems = useSelector((state) => state.cart.items);
  const wishlistItems = useSelector((state) => state.wishlist.items);

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem('userJwt');
    navigate('/user/login')
    dispatch(openNotification({message:'SUCCESSFULLY LOGGED OUT!', colour:'green'}))
  }

  return (
    <nav className="navbar">
      <div className="navItems">
        <div className="searchContainer">
          <input type="text" placeholder="Search" className="searchInput" onChange={(e) => searchItems(e.target.value)} />
          <button className="searchButton">Search</button>
        </div>
        <div className="iconsContainer">
        <span onClick={logout} className='LogOuticonText'>Log Out</span>
          <span onClick={openWishlistMenu} className="icon">
            <FontAwesomeIcon icon={faHeart} />
            <span className="wishlistCount">{wishlistItems.length}</span>
          </span>
          <span className='iconText'>Sign In</span>
          <div className="cartContainer">
            <span className="icon">
              <FontAwesomeIcon icon={faShoppingCart} />
            </span>
            <span className="cartCount">{cartItems.length}</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
