import { createContext, useContext, useState } from "react";
import {
  closeWorkOrderRequest,
  getWorkOrdersRequest,
  getWorkOrderRequest,
  openWorkOrderRequest,
  deleteWorkOrderRequest
} from "../api/workOrders.js";

const WorkOrderContext = createContext();

export const useWorkOrder = () => {
  const context = useContext(WorkOrderContext);
  if (!context) {
    throw new Error("useWorkOrder must be used within a TaskProvider");
  }
  return context;
};

export function WorkOrderProvider({ children }) {
  const [workOrders, setWorkOrders] = useState([]);

  const openWorkOrder = (values) => {
    openWorkOrderRequest(values);
    console.log("work order open");
  };
  
  const closeWorkOrder = () => {
    closeWorkOrderRequest();
    console.log("work order closed");
  };

  const getWorkOrders = async () => {
    try {
      const res = await getWorkOrdersRequest();
      console.log(res);
      setWorkOrders(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getWorkOrderById = async (id) => {
    try {
      const res = await getWorkOrderRequest(id);
      console.log(res);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const deleteWorkOrder = async (id) => {
      // try {
        const res = await deleteWorkOrderRequest(id)
        console.log(res.data)
      // } catch (error) {
        
      // }
    }

  return (
    <WorkOrderContext.Provider
      value={{deleteWorkOrder, setWorkOrders, openWorkOrder, closeWorkOrder, getWorkOrders, workOrders, getWorkOrderById }}
    >
      {children}
    </WorkOrderContext.Provider>
  );
}
