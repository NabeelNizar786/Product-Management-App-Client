import React from 'react';
import { addToCart, removeFromCart } from '../redux/cartSlice';
import { addToWishlist } from '../redux/wishlistSlice';
import { openNotification } from '../redux/notificationSlice';
import {useDispatch} from 'react-redux';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Product = ({ id, title, price, images, product}) => {

  const data = useSelector((state) => state.cart.items)
  const data2 = useSelector((state) => state.notification)

  const dispatch = useDispatch()

  const handleAddToCart = (id) => {
    console.log(id,'added');
    dispatch(addToCart({productId: id}))
    dispatch(openNotification({message:'Product Added to Cart', colour:'red' }))
  }

  const onAddToWishlist = (wishlists) => {
    console.log(wishlists, 'addedtowishlist');
    dispatch(addToWishlist({wishlists}))
    dispatch(openNotification({message:'Product Added to Wishlist', colour:'green'}))
  }



  return (
    <div className="product">
      <img src={images[0]} alt={name} className="productImage"/>
      <div className="productDetails">
        <Link to={`/user/productDetails/${id}`} style={{textDecoration:'none', color:'black'}}><h3 className="productName">{title}</h3></Link>
        <p className="productPrice">${price}</p>
      </div>
      <div className="productActions">
        <button onClick={() => handleAddToCart(product)} className="addToCartButton">
          Add to Cart
        </button>
        <button onClick={() => onAddToWishlist(product)} className="addToWishlistButton">
          Add to Wishlist
        </button>
      </div>
    </div>
  );
};

export default Product;
