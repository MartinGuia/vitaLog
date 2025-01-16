import { createContext, useContext, useState } from "react";
import {
  closeDeliveryOrderRequest,
  openDeliveryOrderRequest,
  addTiresDeliveryOrderRequest,
  getDeliveryOrdersRequest,
  getDeliveryOrderRequest,
} from "../api/deliveryOrder.js";

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
  const [deliveryOrders, setDeliveryOrders] = useState([]);
  const [errors, setErrors] = useState([]);

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
      console.log(res);
      setDeliveryOrders(res.data);
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

  return (
    <DeliveryOrderContext.Provider
      value={{
        addTiresDeliveryOrder,
        openDeliveryOrder,
        closeDeliveryOrder,
        deliveryOrders,
        errors,
        getDeliveryOrders,
        getDeliveryOrder,
      }}
    >
      {children}
    </DeliveryOrderContext.Provider>
  );
}
