import { createSlice } from "@reduxjs/toolkit";

const workOrderSlice = createSlice({
  name: "workOrders",
  initialState: {
    list: [],
  },
  reducers: {
    setWorkOrders: (state, action) => {
      state.list = action.payload;
    },
    removeWorkOrder: (state, action) => {
      state.list = state.list.filter(order => order._id !== action.payload);
    },
  },
});

export const { setWorkOrders, removeWorkOrder } = workOrderSlice.actions;
export default workOrderSlice.reducer;

