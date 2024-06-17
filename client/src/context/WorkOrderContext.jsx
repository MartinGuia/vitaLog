import { createContext, useContext, useState } from "react";
import {
  closeWorkOrderRequest
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
  // const [workOrders, setWorkOrders] = useState([]);

  const closeWorkOrder = () => {
    closeWorkOrderRequest();
    console.log("work order closed");
  }
  
  return (
    <WorkOrderContext.Provider
      value={{ closeWorkOrder }}
    >
      {children}
    </WorkOrderContext.Provider>
  );
}
