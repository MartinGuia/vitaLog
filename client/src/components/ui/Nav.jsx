import Sidebar, { SidebarItem } from "../Sidebar";
import React, { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Users,
  NotebookPen,
  Settings,
  Flag,
  BookMarked,
  Search,
  PackageCheck,
  FileInput,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import LoginPage from "../../pages/LoginPage";
import {jwtDecode} from "jwt-decode"; // Asegúrate del import correcto

function Nav({ children }) {
  const { isAuthenticated, role, user, getRoles } = useAuth();
  const [userRoleId, setUserRoleId] = useState(null); // ID del rol del usuario
  const [roleIds, setRoleIds] = useState({
    administrador: null,
    ventas: null,
    almacenista: null,
    operador: null,
  });
  const navigate = useNavigate(); // Hook para redirigir

 // Obtener los roles desde la API y almacenarlos
 useEffect(() => {
  const fetchRoles = async () => {
    try {
      const res = await getRoles();
      if (res) {
        const rolesMap = {};
        for (const role of res) {
          if (role.name === "Administrador") rolesMap.administrador = role._id;
          if (role.name === "Vendedor") rolesMap.ventas = role._id;
          if (role.name === "Almacenista") rolesMap.almacenista = role._id;
          if (role.name === "Operador") rolesMap.operador = role._id;
        }
        setRoleIds(rolesMap);
      }
    } catch (error) {
      console.error("Error al obtener los roles:", error);
    }
  };
  fetchRoles();
}, []);

  // Obtener el ID del rol del usuario actual desde el token
  useEffect(() => {
    if (role) {
      try {
        const decodedToken = jwtDecode(role);
        setUserRoleId(decodedToken.role); // Asegúrate de que `role` sea el campo correcto en el token
        // console.log("Rol del usuario:", decodedToken.role);
      } catch (error) {
        console.error("Error al decodificar el token:", error);
      }
    }
  }, [role]);

    // Redirigir a la página inicial según el rol
    useEffect(() => {
      if (userRoleId) {
        // if (userRoleId === roleIds.administrador) {
        //   navigate("/departments"); // Página para Administrador
        // } else
         if (userRoleId === roleIds.ventas) {
          navigate("/createWorkOrder"); // Página para Vendedor
        } else if (userRoleId === roleIds.almacenista) {
          navigate("/deliveryOrders"); // Página para Almacenista
        } else if (userRoleId === roleIds.operador) {
          navigate("/productionInitial"); // Página para Operador
        }
      }
    }, [user]);

  // Define las rutas y los roles permitidos
  const menuItems = [
    {
      path: "/departments",
      icon: <LayoutDashboard size={20} color="white" />,
      text: "Departamentos",
      allowedRoles: [roleIds.administrador], // Solo Administrador
    },
    {
      path: "/clients",
      icon: <Users size={20} color="white" />,
      text: "Clientes",
      allowedRoles: [roleIds.administrador,], // Administrador y Ventas
    },
    {
      path: "/productionInitial",
      icon: <Search size={20} color="white" />,
      text: "Inspección inicial",
      allowedRoles: [roleIds.administrador, roleIds.operador], // Administrador y Operador
    },
    {
      path: "/productionRepairs",
      icon: <Settings size={20} color="white" />,
      text: "Reparación",
      allowedRoles: [roleIds.administrador, roleIds.operador], // Administrador y Operador
    },
    {
      path: "/productionFinal",
      icon: <Flag size={20} color="white" />,
      text: "Inspección Final",
      allowedRoles: [roleIds.administrador, roleIds.operador], // Administrador y Operador
    },
    {
      path: "/workorders",
      icon: <BookMarked size={20} color="white" />,
      text: "Orden de trabajo",
      allowedRoles: [roleIds.administrador, roleIds.almacenista], // Administrador, Ventas y Operador
    },
    {
      path: "/createWorkOrder",
      icon: <NotebookPen size={20} color="white" />,
      text: "Crear Orden de Trabajo",
      allowedRoles: [roleIds.administrador, roleIds.ventas], // Administrador y Operador
    },
    {
      path: "/deliveryOrders",
      icon: <PackageCheck size={20} color="white" />,
      text: "Crear orden de Entrega",
      allowedRoles: [roleIds.administrador, roleIds.almacenista], // Administrador y Almacén
    },
    {
      path: "/allDeliveryOrders",
      icon: <FileInput size={20} color="white" />,
      text: "Ver Orden de Entrega",
      allowedRoles: [roleIds.administrador, roleIds.almacenista], // Administrador, Ventas y Almacén
    },
  ];

  // Filtrar las rutas según el rol del usuario
  const filteredMenuItems = menuItems.filter(
    (item) => item.allowedRoles.includes(userRoleId)
  );

  return (
    <>
      {isAuthenticated ? (
        <Sidebar additionalContent={children}>
          {filteredMenuItems.map((item, index) => (
            <Link to={item.path} key={index}>
              <SidebarItem icon={item.icon} text={item.text} text2={item.text} />
            </Link>
          ))}
        </Sidebar>
      ) : (
        <LoginPage />
      )}
    </>
  );
}

export default Nav;
