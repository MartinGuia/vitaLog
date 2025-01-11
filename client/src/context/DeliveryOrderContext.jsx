import { createContext, useContext, useState } from "react";
import { closeDeliveryOrderRequest, openDeliveryOrderRequest,addTiresDeliveryOrderRequest } from "../api/deliveryOrder.js";

const DeliveryOrderContext = createContext();

export const useDeliveryOrder = () => {
    const context = useContext(DeliveryOrderContext);
    if (!context) {
        throw new Error("useDeliveryOrder must be used within a DeliveryOrderProvider");
    }
    return context;
}

export function DeliveryOrderProvider({ children }) {

    const [deliveryOrders, setDeliveryOrders] = useState([]);
    const [errors, setErrors] = useState([]);

    const openDeliveryOrder = async (deliveryOrder) => {
        openDeliveryOrderRequest(deliveryOrder)
        console.log("Delivery order open")
    }

    const closeDeliveryOrder = async () => {
        closeDeliveryOrderRequest()
        console.log("Delivery order closed")
    }

    const addTiresDeliveryOrder = async (values) => {
        try {
          const res = await addTiresDeliveryOrderRequest(values);
          console.log(res);
        } catch (error) {
          console.log(error);
          setErrors(error.response.data);
        }
      };

    return(
        <DeliveryOrderContext.Provider value={{ addTiresDeliveryOrder, openDeliveryOrder, closeDeliveryOrder, deliveryOrders, errors,}}>
            {children}
        </DeliveryOrderContext.Provider>
    )
}