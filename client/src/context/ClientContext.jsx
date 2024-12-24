import { createContext, useState, useContext, useEffect } from "react";
import {
  registerClientRequest,
  getClientsRequest,
  getClientRequest,
  updateClientRequest,
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
        allClients,
        updateClient,
        errors,
      }}
    >
      {children}
    </ClientContext.Provider>
  );
}
