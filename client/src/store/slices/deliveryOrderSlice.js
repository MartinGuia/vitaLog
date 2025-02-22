import {createSlice} from "@reduxjs/toolkit";

const deliveryOrderSlice = createSlice({
    name: "deliveryOrders",
    initialState: {
        list: [],
    },
    reducers: {
        setDeliveryOrders: (state, action) => {
            state.list = action.payload;
        },
        removeDeliveryOrder: (state, action) => {
            state.list = state.list.filter(order => order._id!== action.payload);
        },
    },
});

export const {setDeliveryOrders, removeDeliveryOrder} = deliveryOrderSlice.actions;

export default deliveryOrderSlice.reducer;