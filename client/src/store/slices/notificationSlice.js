
// const initialState = {
//   notifications: [], // Almacena las notificaciones
//   hasNewNotification: false, // Estado para mostrar el círculo en la campanita
// };

// const notificationSlice = createSlice({
//   name: "notifications",
//   initialState,
//   reducers: {
//     addNotification: (state, action) => {
//       state.notifications.push(action.payload);
//       state.hasNewNotification = true; // Indica que hay una nueva notificación
//     },
//     clearNotifications: (state) => {
//       state.hasNewNotification = false; // Se oculta el indicador de nueva notificación
//     },
//   },
// });

// export const { addNotification, clearNotifications } = notificationSlice.actions;
// export default notificationSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notifications: [], // Almacena las notificaciones
  hasNewNotification: false, // Estado para mostrar el círculo en la campanita
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNotification: (state, action) => {
      state.notifications.push(action.payload);
      state.hasNewNotification = true;
    },
    clearNotifications: (state) => {
      state.notifications = []; // Vacía la lista de notificaciones
      state.hasNewNotification = false;
    },
  },
});

export const { addNotification, clearNotifications } =
  notificationSlice.actions;
export default notificationSlice.reducer;
