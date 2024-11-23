import { createContext, useContext, useState } from "react";

import { registerClientRequest, getClientsRequest } from "../api/client.js";

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
  const [allClients, setAllClients] = useState([])

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
      const res = await getClientsRequest ()
      console.log(res)
      setAllClients(res.data)
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <ClientContext.Provider value={{ clients, registerClient, getClients, allClients, errors }}>
      {children}
    </ClientContext.Provider>
  );
}
