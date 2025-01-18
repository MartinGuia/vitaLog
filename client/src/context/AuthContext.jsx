import { createContext, useState, useContext, useEffect } from "react";
import {
  registerRequest,
  loginRequest,
  verifyTokenRequest,
  getUsersRequest,
  getUserRequest,
  deleteUserRequest,
  updateUserRequest,
  getRolesRequest
} from "../api/auth.js";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // const [userData, setUserData] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [getAllUsers, setGetAllUsers] = useState([]);
  const [role, setRole] = useState(null)
  const [isAuthLoading, setIsAuthLoading] = useState(true); // Nuevo estado

  const signup = async (user) => {
    try {
      const res = await registerRequest(user);
      console.log(res.data);
      setUser(res.data);
    } catch (error) {
      console.log(error);
      setErrors(error.response.data);
    }
  };

  const signin = async (user) => {
    try {
      const res = await loginRequest(user);
      console.log(res);
      setIsAuthenticated(true);
      setUser(res.data);
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data.message]);
    }
  };

  const getUsers = async () => {
    try {
      const res = await getUsersRequest();
      console.log(res);
      setGetAllUsers(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getUser = async (id) => {
    try {
      const res = await getUserRequest(id);
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateUser = async (id, user) => {
    try {
      await updateUserRequest(id, user);
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    Cookies.remove("token");
    setIsAuthenticated(false);
    setUser(null);
  };

  const deleteUser = async (id) => {
    // try {
      const res = await deleteUserRequest(id)
      console.log(res.data)
    // } catch (error) {
      
    // }
  }

  const getRoles = async () => {
    try {
      const res = await getRolesRequest();
      console.log(res.data);
      return res.data; 
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
    async function checkLogin() {
      const cookies = Cookies.get();
      if (!cookies.token) {
        setIsAuthenticated(false);
        setLoading(false);
        setIsAuthLoading(false); // Marcar como terminado
        return setUser(null);
      }
  
      try {
        const res = await verifyTokenRequest(cookies.token);
        if (!res.data) {
          setIsAuthenticated(false);
          setLoading(false);
          setIsAuthLoading(false); // Marcar como terminado
          return;
        }
  
        setIsAuthenticated(true);
        setUser(res.data);
        setRole(cookies.token); // Almacenar el token
        setLoading(false);
      } catch (error) {
        setIsAuthenticated(false);
        setUser(null);
        setLoading(false);
      } finally {
        setIsAuthLoading(false); // Marcar como terminado
      }
    }
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signup,
        signin,
        getUsers,
        getUser,
        updateUser,
        loading,
        role,
        deleteUser,
        getRoles,
        logout,
        getAllUsers,
        user,
        isAuthenticated,
        errors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
