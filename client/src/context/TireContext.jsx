import { createContext, useContext, useState, useEffect } from "react";
import {
  createTireRequest,
  getTiresRequest,
  // deleteTireRequest,
  getTireRequest,
  updateTireRequest,
  getTireByBarcodeRequest,
  updateFinalTireRequest,
  getTiresByInspectionRequest,
} from "../api/tires.js";
import { printLabelRequest } from "../api/print.js";

const TiresContext = createContext();

export const useTire = () => {
  const context = useContext(TiresContext);
  if (!context) {
    throw new Error("useTire must be used within a TiresProvider");
  }
  return context;
};

export function TiresProvider({ children }) {
  const [tires, setTires] = useState([]);
  const [errors, setErrors] = useState([]);

  const getTires = async () => {
    try {
      const res = await getTiresRequest();
      console.log(res);
      setTires(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getTiresByInspection = async () => {
    try {
      const res = await getTiresByInspectionRequest();
      console.log(res);
      setTires(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createTire = async (workOrders) => {
    try {
      const res = await createTireRequest(workOrders);
      console.log(res);
    } catch (error) {
      console.log(error);
      setErrors(error.response.data);
    }
  };

  const getTire = async (id) => {
    try {
      const res = await getTireRequest(id);
      console.log(res);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateTire = async (id, tire) => {
    try {
      await updateTireRequest(id, tire);
    } catch (error) {
      console.error(error);
    }
  };

  const updateFinalTire = async (id, tire) => {
    try {
      await updateFinalTireRequest(id, tire);
    } catch (error) {
      console.error(error);
    }
  };

  // Nueva función para buscar una llanta por código de barras
  const getTireByBarcode = async (barCode) => {
    try {
      const res = await getTireByBarcodeRequest(barCode);
      console.log("Registro encontrado:", res.data);
      return res.data; // Devuelve los datos de la llanta
    } catch (error) {
      console.error("Error al buscar la llanta por código de barras:", error);
      setErrors(error.response?.data?.message || ["Error desconocido"]);
    }
  };

  const printLabel = async (text) => {
    try {
      await printLabelRequest({ text });
      alert("Etiqueta enviada a la impresora");
    } catch (error) {
      console.error("Error al imprimir:", error);
      alert("Hubo un error al imprimir");
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

  return (
    <TiresContext.Provider
      value={{
        updateTire,
        getTiresByInspection,
        printLabel,
        updateFinalTire,
        getTireByBarcode,
        tires,
        getTires,
        getTire,
        createTire,
        errors,
      }}
    >
      {children}
    </TiresContext.Provider>
  );
}
