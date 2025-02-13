import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./slices/notificationSlice.js";
import workOrderReducer from "./slices/workOrderSlice.js";

export default configureStore({
    reducer: {
        notifications: notificationReducer,
        workOrders: workOrderReducer,
    },
})