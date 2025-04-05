import Sidebar, { SidebarItem } from "../Sidebar";
import React, { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Users,
  NotebookPen,
  UserRoundCog,
  Settings,
  Flag,
  BookMarked,
  Search,
  PackageCheck,
  FileInput,
  ChartColumnBig,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import LoginPage from "../../pages/LoginPage";
import { jwtDecode } from "jwt-decode"; // Asegúrate del import correcto

function Nav({ children }) {
  const { isAuthenticated, role, user, getRoles } = useAuth();
  const [userRoleId, setUserRoleId] = useState(null); // ID del rol del usuario
  const [roleIds, setRoleIds] = useState({
    master: null,
    administradorP: null,
    administradorF: null,
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
            if (role.name === "Master") rolesMap.master = role._id;
            if (role.name === "AdministradorP")
              rolesMap.administradorP = role._id;
            if (role.name === "AdministradorF")
              rolesMap.administradorF = role._id;
            if (role.name === "Vendedor") rolesMap.ventas = role._id;
            if (role.name === "Operador") rolesMap.operador = role._id;
            if (role.name === "Almacenista") rolesMap.almacenista = role._id;
          }
          setRoleIds(rolesMap);
          // console.log(user)
        }
      } catch (error) {
        console.error("Error al obtener los roles:", error);
      }
    };
    fetchRoles();
  }, [isAuthenticated, user, role]);

  // Observar cambios en el role y filtrar los elementos del menú
  useEffect(() => {
    if (role) {
      // Decodificar el token para obtener el rol
      try {
        const decodedToken = jwtDecode(role);
        setUserRoleId(decodedToken.role); // Establecer el rol del usuario actual
      } catch (error) {
        console.error("Error al decodificar el token:", error);
      }
    }
  }, [role]); // Este efecto se ejecutará cada vez que `role` cambie

  // Redirigir al inicio según el rol
  useEffect(() => {
    if (userRoleId) {
      if (userRoleId === roleIds.ventas) {
        navigate("/createWorkOrder"); // Página para Vendedor
      } else if (userRoleId === roleIds.almacenista) {
        navigate("/deliveryOrders"); // Página para Almacenista
      } else if (userRoleId === roleIds.administradorP) {
        navigate("/workorders"); // Página para Administrador
      } else if (userRoleId === roleIds.administradorF) {
        navigate("/workorders"); // Página para Administrador
      } else if (userRoleId === roleIds.operador) {
        navigate("/production"); // Página para Operador
      }
    }
  }, [userRoleId, roleIds]);

  // Define las rutas y los roles permitidos
  const menuItems = [
    {
      path: "/departments",
      icon: <LayoutDashboard size={20} color="white" />,
      text: "Departamentos",
      allowedRoles: [roleIds.master], // Solo Administrador
    },
    {
      path: "/clients",
      icon: <Users size={20} color="white" />,
      text: "Clientes",
      allowedRoles: [roleIds.master], // Administrador y Ventas
    },
    {
      path: "/production",
      icon: <UserRoundCog size={20} color="white" />,
      text: "Producción",
      allowedRoles: [roleIds.master, roleIds.operador],
    },
    // {
    //   path: "/productionInitial",
    //   icon: <Search size={20} color="white" />,
    //   text: "Inspección inicial",
    //   allowedRoles: [roleIds.master, roleIds.operador], // Administrador y Operador
    // },
    // {
    //   path: "/productionRepairs",
    //   icon: <Settings size={20} color="white" />,
    //   text: "Reparación",
    //   allowedRoles: [roleIds.master, roleIds.operador], // Administrador y Operador
    // },
    // {
    //   path: "/productionFinal",
    //   icon: <Flag size={20} color="white" />,
    //   text: "Inspección Final",
    //   allowedRoles: [roleIds.master, roleIds.operador], // Administrador y Operador
    // },
    {
      path: "/workorders",
      icon: <BookMarked size={20} color="white" />,
      text: "Orden de trabajo",
      allowedRoles: [
        roleIds.master,
        roleIds.almacenista,
        roleIds.administradorP,
        roleIds.administradorF,
      ], // Administrador, Ventas y Operador
    },
    {
      path: "/createWorkOrder",
      icon: <NotebookPen size={20} color="white" />,
      text: "Crear Orden de T.",
      allowedRoles: [roleIds.master, roleIds.ventas], // Administrador y Operador
    },
    {
      path: "/deliveryOrders",
      icon: <PackageCheck size={20} color="white" />,
      text: "Crear Orden de E.",
      allowedRoles: [roleIds.master, roleIds.almacenista], // Administrador y Almacén
    },
    {
      path: "/allDeliveryOrders",
      icon: <FileInput size={20} color="white" />,
      text: "Orden de Entrega",
      allowedRoles: [
        roleIds.master,
        roleIds.almacenista,
        roleIds.administradorF,
      ], // Administrador, Ventas y Almacén
    },
    {
      path: "/reports",
      icon: <ChartColumnBig size={20} color="white" />,
      text: "Estadística",
      allowedRoles: [
        roleIds.master,
        // roleIds.administradorP, roleIds.administradorF
      ], // Administrador, Ventas y Almacén
    },
  ];

  // Filtrar las rutas según el rol del usuario
  const filteredMenuItems = menuItems.filter((item) =>
    item.allowedRoles.includes(userRoleId)
  );

  return (
    <>
      {isAuthenticated ? (
        <Sidebar additionalContent={children}>
          {filteredMenuItems.map((item, index) => (
            <Link to={item.path} key={index}>
              <SidebarItem
                icon={item.icon}
                text={item.text}
                text2={item.text}
              />
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
