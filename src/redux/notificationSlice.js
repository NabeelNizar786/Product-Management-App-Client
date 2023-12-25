import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name:'notification',
    initialState:{
        isOpen:false,
        message:'',
        colour:''
    },
    reducers:{
        openNotification:(state, action) => {
            state.isOpen = true,
            state.message = action.payload.message
            state.colour = action.payload.colour
        },
        closeNotification:(state, action) => {
            state.isOpen = false,
            state.message = ''
            state.colour = ''
        }
    }
})

export const {openNotification, closeNotification} = notificationSlice.actions;
export default notificationSlice.reducer;