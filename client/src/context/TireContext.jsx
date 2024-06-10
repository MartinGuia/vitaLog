import { createContext, useContext, useState } from "react";
import {
  createTireRequest,
  deleteTireRequest,
  getTireRequest,
  getTiresRequest,
  updateTireRequest,
} from "../api/tires.js";

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

  const getTires = async () => {
    try {
      const res = await getTiresRequest();
      console.log(res);
      setTires(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createTire = async (workOrders) => {
    const res = await createTireRequest(workOrders);
    console.log(res);
  };

  return (
    <TiresContext.Provider value={{ tires, getTires, createTire }}>
      {children}
    </TiresContext.Provider>
  );
}
