import { createContext, useContext, useState } from "react";
import {
  closeWorkOrderRequest,
  getWorkOrderRequest,
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

  const closeWorkOrder = () => {
    closeWorkOrderRequest();
    console.log("work order closed");
  };

  const getWorkOrders = async () => {
    try {
      const res = await getWorkOrderRequest();
      console.log(res);
      setWorkOrders(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <WorkOrderContext.Provider
      value={{ closeWorkOrder, getWorkOrders, workOrders }}
    >
      {children}
    </WorkOrderContext.Provider>
  );
}
