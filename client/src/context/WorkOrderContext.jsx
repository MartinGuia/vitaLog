import { createContext, useContext, useState, useEffect } from "react";
import {
  closeWorkOrderRequest,
  getWorkOrdersRequest,
  getWorkOrderRequest,
  openWorkOrderRequest,
  deleteWorkOrderRequest,
  quoteWorkOrderRequest,
  getQuoteWorkOrderRequest,
  editWorkOrderRequest,
  reOpenWorkOrderRequest,
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
  const [allQuotingWorkOrders, setAllQuotingWorkOrders] = useState([]);
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);

  const openWorkOrder = async (values) => {
    try {
      const res = await openWorkOrderRequest(values);
      return { success: true, data: res.data }; // Devuelve respuesta si fue exitosa
    } catch (error) {
      setErrors([error.response?.data?.message || "Error desconocido"]);
      return { success: false }; // Devuelve false si falló
    }
  };

  const reOpenWorkOrder = async (data) => {
  const res = await reOpenWorkOrderRequest(data);
  return res.data;
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

    const editWorkOrder = async (id, data) => {
      try {
        await editWorkOrderRequest(id, data);
        // console.log("exito")
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

  const quoteWorkOrder = async (data) => {
    try {
      await quoteWorkOrderRequest(data);
      console.log("Ordenes de trabajo enviadas a cotización");
    } catch (error) {
      console.error(error);
    }
  };

  const getQuoteWorkOrder = async () => {
    try {
      const res = await getQuoteWorkOrderRequest();
      console.log(res);
      setAllQuotingWorkOrders(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [errors]);

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
        quoteWorkOrder,
        getQuoteWorkOrder,
        allQuotingWorkOrders,
        errors,
        reOpenWorkOrder,
        editWorkOrder,
      }}
    >
      {children}
    </WorkOrderContext.Provider>
  );
}
