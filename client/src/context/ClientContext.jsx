import { createContext, useState, useContext, useEffect } from "react";
import {
  registerClientRequest,
  getClientsRequest,
  getClientRequest,
  updateClientRequest,
  deleteClientRequest,
  getClientReportRequest,
} from "../api/client.js";

const ClientContext = createContext();

export const useClient = () => {
  const context = useContext(ClientContext);
  if (!context) {
    throw new Error("useClient must be used within a ClientProvider");
  }
  return context;
};

export function ClientProvider({ children }) {
  const [clients, setClients] = useState(null);
  const [errors, setErrors] = useState([]);
  const [allClients, setAllClients] = useState([]);
  const [currentClient, setCurrentClient] = useState(null);

  const registerClient = async (user) => {
    try {
      const res = await registerClientRequest(user);
      console.log(res.data);
      setClients(res.data);
    } catch (error) {
      console.error(error);
      setErrors(error.response.data);
    }
  };

  const getClients = async () => {
    try {
      const res = await getClientsRequest();
      console.log(res);
      setAllClients(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getClient = async (id) => {
    try {
      const res = await getClientRequest(id);
      console.log(res.data);
      setCurrentClient(res.data); // Guardamos el cliente en el estado
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateClient = async (id, user) => {
    try {
      await updateClientRequest(id, user);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteClient = async (id) => {
    try {
      const res = await deleteClientRequest(id);
      console.log(res.data);
      // setClients(clients.filter((client) => client._id!== id));
    } catch (error) {
      console.error(error);
    }
  };

  const getClientReport = async ({ clientId, startDate, endDate }) => {
    try {
      const res = await getClientReportRequest({ clientId, startDate, endDate });
      console.log("Reporte:", res.data.report);
      return res.data.report;
    } catch (error) {
      console.error("Error al obtener el reporte:", error);
      setErrors([error.response?.data?.message || "Error desconocido"]);
      return null;
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
    <ClientContext.Provider
      value={{
        clients,
        getClient,
        registerClient,
        getClients,
        currentClient,
        allClients,
        updateClient,
        deleteClient,
        getClientReport,
        errors,
      }}
    >
      {children}
    </ClientContext.Provider>
  );
}
