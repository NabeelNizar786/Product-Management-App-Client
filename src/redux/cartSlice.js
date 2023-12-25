import {createSlice} from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name:'cart',
    initialState:{
        items:[]
    },
    reducers:{
        addToCart: (state, action) => {
            state.items.push(action.payload.productId);
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter((id) => id !==action.payload.productId)
        }
    }
})

export const {addToCart, removeFromCart} = cartSlice.actions;
export default cartSlice.reducer;