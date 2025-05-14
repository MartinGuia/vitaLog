import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AddUserPage from "./pages/AddUserPage";
import ViewWorkOrder from "./pages/ViewWorkOrder";
import EditUserPage from "./pages/EditUserPage";
import ProtectedRoute from "./ProtectedRoute";
import AllWorkOrdersPage from "./pages/AllWorkOrdersPage";
import Nav from "./components/ui/Nav";
import AddTireToWO from "./pages/AddTireToWO";
import AllClientPage from "./pages/AllClientPage";
import AddClientPage from "./pages/AddClientPage";
import ViewDepartmentByIdPage from "./pages/ViewDepartmentByIdPage";
import AllDepartmentsPage from "./pages/AllDepartmentsPage";
import CreateWorkOrderPage from "./pages/CreateWorkOrderPage";
import EditClientPage from "./pages/EditClientPage";
import EditTirePage from "./pages/EditTirePage";
import EditInitialPage from "./pages/EditInitialPage";
import ScannerInitialPage from "./pages/ScannerInitialPage";
import ScannerInspectionPage from "./pages/ScannerInspectionPage";
import EditRepairsPage from "./pages/EditRepairsPage";
import EditFinalPage from "./pages/EditFinalPage";
import ScannerFinalProduction from "./pages/ScannerFinalProduction";
import CreateDeliveryOrderPage from "./pages/CreateDeliveryOrderPage";
import AddTiresPage from "./pages/AddTiresPage";
import AllDeliveryOrders from "./pages/AllDeliveryOrders";
import ViewDeliveryOrderPage from "./pages/ViewDeliveryOrderPage";

import { ClientProvider } from "./context/ClientContext";
import { TiresProvider } from "./context/TireContext";
import { WorkOrderProvider } from "./context/WorkOrderContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { DepartmentProvider } from "./context/DepartmentContext";
import { DeliveryOrderProvider } from "./context/DeliveryOrderContext";
import { Provider } from "react-redux";
import store from "./store";
import PrintLabel from "./pages/PrintLabel";
import ReportPage from "./pages/ReportPage";
import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; // Asegúrate del import correcto
import ProductionPage from "./pages/ProductionPage";
import AllWOBySeller from "./pages/AllWOBySeller";
import QuotedWorkOrdersPage from "./pages/QuotedWorkOrdersPage";
import ReportByClientPage from "./pages/ReportByClientPage";

function AppRoutes() {
  const { role, getRoles } = useAuth(); // Ahora sí está dentro de AuthProvider
  const [userRoleId, setUserRoleId] = useState(null);
  const [roleIds, setRoleIds] = useState({
    master: null,
    administradorP: null,
    administradorF: null,
    ventas: null,
    almacenista: null,
    operador: null,
  });

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
  }, [role]);

  useEffect(() => {
    if (role) {
      try {
        const decodedToken = jwtDecode(role);
        setUserRoleId(decodedToken.role);
      } catch (error) {
        console.error("Error al decodificar el token:", error);
      }
    }
  }, [role]);

  const routes = [
    { path: "/register", element: <AddUserPage />, roles: [roleIds.master] },
    {
      path: "/add-tire",
      element: <AddTireToWO />,
      roles: [
        roleIds.master,
        roleIds.ventas,
        roleIds.administradorP,
        roleIds.administradorF,
      ],
    },
    {
      path: "/workorders",
      element: <AllWorkOrdersPage />,
      roles: [roleIds.master, roleIds.administradorP, roleIds.administradorF],
    },
    {
      path: "/workorder/:id",
      element: <ViewWorkOrder />,
      roles: [roleIds.master, roleIds.administradorP, roleIds.administradorF, roleIds.ventas],
    },
    {
      path: "/profile/:id",
      element: <EditUserPage />,
      roles: [roleIds.master],
    },
    { path: "/clients", element: <AllClientPage />, roles: [roleIds.master] },
    {
      path: "/add-client",
      element: <AddClientPage />,
      roles: [roleIds.master],
    },
    {
      path: "/departments",
      element: <AllDepartmentsPage />,
      roles: [roleIds.master],
    },
    {
      path: "/department/:id",
      element: <ViewDepartmentByIdPage />,
      roles: [roleIds.master],
    },
    {
      path: "/createWorkOrder",
      element: <CreateWorkOrderPage />,
      roles: [
        roleIds.master,
        roleIds.ventas,
        roleIds.administradorP,
        roleIds.administradorF,
      ],
    },
    {
      path: "/client/:id",
      element: <EditClientPage />,
      roles: [roleIds.master],
    },
    {
      path: "/tire/:id",
      element: <EditTirePage />,
      roles: [roleIds.master, roleIds.administradorP, roleIds.administradorF],
    },
    {
      path: "/productionInitial",
      element: <ScannerInitialPage />,
      roles: [roleIds.master, roleIds.operador],
    },
    {
      path: "/editInitial/:id",
      element: <EditInitialPage />,
      roles: [roleIds.master, roleIds.operador],
    },
    {
      path: "/productionRepairs",
      element: <ScannerInspectionPage />,
      roles: [roleIds.master, roleIds.operador],
    },
    {
      path: "/editRepairs/:id",
      element: <EditRepairsPage />,
      roles: [roleIds.master, roleIds.operador],
    },
    {
      path: "/productionFinal",
      element: <ScannerFinalProduction />,
      roles: [roleIds.master, roleIds.operador],
    },
    {
      path: "/editFinal/:id",
      element: <EditFinalPage />,
      roles: [roleIds.master, roleIds.operador],
    },
    {
      path: "/deliveryOrders",
      element: <CreateDeliveryOrderPage />,
      roles: [roleIds.master, roleIds.almacenista,],
    },
    {
      path: "/add-tires",
      element: <AddTiresPage />,
      roles: [roleIds.master, roleIds.almacenista],
    },
    {
      path: "/allDeliveryOrders",
      element: <AllDeliveryOrders />,
      roles: [roleIds.master, roleIds.almacenista, roleIds.administradorF],
    },
    {
      path: "/viewDeliveryOrder/:id",
      element: <ViewDeliveryOrderPage />,
      roles: [roleIds.master, roleIds.almacenista],
    },
    {
      path: "/printLabel/:id",
      element: <PrintLabel />,
      roles: [roleIds.master, roleIds.operador],
    },
    {
      path: "/reports",
      element: <ReportPage />,
      roles: [roleIds.master, roleIds.administradorF, roleIds.administradorP],
    },
    {
      path: "/production",
      element: <ProductionPage />,
      roles: [roleIds.master, roleIds.operador],
    },
    {
      path: "/workOrderByUser/:id",
      element: <AllWOBySeller />,
      roles: [roleIds.ventas],
    },
    {
      path: "/quoteWorkOrders",
      element: <QuotedWorkOrdersPage />,
      roles: [roleIds.administradorF, roleIds.master],
    },
    {
      path: "/reportByClient",
      element: <ReportByClientPage />,
      roles: [roleIds.administradorF, roleIds.master],
    },
  ];

  return (
    <BrowserRouter>
      <Nav>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route element={<ProtectedRoute />}>
            {routes
              .filter((route) => route.roles.includes(userRoleId))
              .map(({ path, element }) => (
                <Route key={path} path={path} element={element} />
              ))}
          </Route>
        </Routes>
      </Nav>
    </BrowserRouter>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <WorkOrderProvider>
          <TiresProvider>
            <ClientProvider>
              <DepartmentProvider>
                <DeliveryOrderProvider>
                  <AppRoutes />
                </DeliveryOrderProvider>
              </DepartmentProvider>
            </ClientProvider>
          </TiresProvider>
        </WorkOrderProvider>
      </AuthProvider>
    </Provider>
  );
}

export default App;
