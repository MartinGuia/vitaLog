import { createContext, useContext, useState, useEffect } from "react";
import {
  closeWorkOrderRequest,
  getWorkOrdersRequest,
  getWorkOrderRequest,
  openWorkOrderRequest,
  deleteWorkOrderRequest,
} from "../api/workOrders.js";
import { useDispatch } from "react-redux";
import {
  setWorkOrders,
  removeWorkOrder,
} from "../store/slices/workOrderSlice.js";
import socket from "../socket";

const WorkOrderContext = createContext();

export const useWorkOrder = () => {
  const context = useContext(WorkOrderContext);
  if (!context) {
    throw new Error("useWorkOrder must be used within a TaskProvider");
  }
  return context;
};

export function WorkOrderProvider({ children }) {
  const [allWorkOrders, setAllWorkOrders] = useState([]);
  const dispatch = useDispatch();

  const openWorkOrder = (values) => {
    openWorkOrderRequest(values);
    console.log("work order open");
  };

  const closeWorkOrder = (data) => {
    closeWorkOrderRequest(data);
    console.log("work order closed");
  };

  const getWorkOrders = async () => {
    try {
      const res = await getWorkOrdersRequest();
      setAllWorkOrders(res.data);
      dispatch(setWorkOrders(res.data));
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
    try {
      await deleteWorkOrderRequest(id);
      dispatch(removeWorkOrder(id));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    socket.on("workOrderDeleted", ({ id }) => {
      console.log("Orden de trabajo eliminada:", id);
      dispatch(removeWorkOrder(id));
    });

    return () => {
      socket.off("workOrderDeleted");
    };
  }, [dispatch]);

  return (
    <WorkOrderContext.Provider
      value={{
        deleteWorkOrder,
        openWorkOrder,
        closeWorkOrder,
        setAllWorkOrders,
        getWorkOrders,
        allWorkOrders,
        getWorkOrderById,
      }}
    >
      {children}
    </WorkOrderContext.Provider>
  );
}
