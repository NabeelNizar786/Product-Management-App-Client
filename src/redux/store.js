import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './cartSlice';
import wishlistReducer from './wishlistSlice';
import notificationReducer from './notificationSlice';

const store = configureStore({
    reducer:{
        cart:cartReducer,
        wishlist:wishlistReducer,
        notification:notificationReducer
    }
});

export default store;