import { createContext, useContext, useState, useEffect } from "react";
import {
  closeDeliveryOrderRequest,
  openDeliveryOrderRequest,
  addTiresDeliveryOrderRequest,
  getDeliveryOrdersRequest,
  getDeliveryOrderRequest,
  deleteDeliveryOrderRequest,
} from "../api/deliveryOrder.js";
import { useDispatch } from "react-redux";
import socket from "../socket.js";
import {
  setDeliveryOrders,
  removeDeliveryOrder,
} from "../store/slices/deliveryOrderSlice.js";

const DeliveryOrderContext = createContext();

export const useDeliveryOrder = () => {
  const context = useContext(DeliveryOrderContext);
  if (!context) {
    throw new Error(
      "useDeliveryOrder must be used within a DeliveryOrderProvider"
    );
  }
  return context;
};

export function DeliveryOrderProvider({ children }) {
  const [allDeliveryOrders, setAllDeliveryOrders] = useState([]);
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();

  const openDeliveryOrder = (deliveryOrder) => {
    openDeliveryOrderRequest(deliveryOrder);
    console.log("Delivery order open");
  };

  const closeDeliveryOrder = async () => {
    closeDeliveryOrderRequest();
    console.log("Delivery order closed");
  };

  const addTiresDeliveryOrder = async (selectedTires) => {
    try {
      const res = await addTiresDeliveryOrderRequest({ tires: selectedTires });
      console.log("Llantas agregadas a la orden:", res.data);
    } catch (error) {
      console.error("Error al agregar llantas a la orden:", error);
      setErrors(error.response?.data || "Error desconocido");
    }
  };

  const getDeliveryOrders = async () => {
    try {
      const res = await getDeliveryOrdersRequest();
      setAllDeliveryOrders(res.data);
      dispatch(setDeliveryOrders(res.data));
    } catch (error) {
      console.error(error);
    }
  };

  const getDeliveryOrder = async (id) => {
    try {
      const res = await getDeliveryOrderRequest(id);
      console.log(res);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const deleteDeliveryOrder = async (id) => {
    try {
      await deleteDeliveryOrderRequest(id);
      dispatch(removeDeliveryOrder(id));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    socket.on("deliveryOrderDeleted", ({id}) => {
      console.log("Orden de trabajo eliminada:", id);
      dispatch(removeDeliveryOrder(id));
    })
    return () => {
      socket.off("deliveryOrderDeleted");
    }
  }, [dispatch])
  

  return (
    <DeliveryOrderContext.Provider
      value={{
        deleteDeliveryOrder,
        openDeliveryOrder,
        closeDeliveryOrder,
        setAllDeliveryOrders,
        getDeliveryOrders,
        allDeliveryOrders,
        getDeliveryOrder,
        errors,
        addTiresDeliveryOrder,
      }}
    >
      {children}
    </DeliveryOrderContext.Provider>
  );
}
