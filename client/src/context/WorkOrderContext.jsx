import { createContext, useContext, useState } from "react";
import {
  createWorkOrderRequest,
  getWorkOrderRequest,
  getWorkOrdersRequest,
  deleteWorkOrdersRequest,
  updateWorkOrdersRequest,
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

  const getWorkOrders = async () => {
    try {
      const res = await getWorkOrdersRequest();
      console.log(res);
      setWorkOrders(res.data);
    } catch (error) {
        console.error(error);
    }
  };

  const createWorkOrder = async (workOrders) => {
    const res = await createWorkOrderRequest(workOrders);
    console.log(res);
  };

  return (
    <WorkOrderContext.Provider
      value={{ workOrders, createWorkOrder, getWorkOrders }}
    >
      {children}
    </WorkOrderContext.Provider>
  );
}
