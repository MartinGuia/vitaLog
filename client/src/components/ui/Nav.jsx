import Sidebar, { SidebarItem } from "../Sidebar";
import {
  LayoutDashboard,
  Users,
  NotebookPen,
  Settings,
  Play,
  Flag,
  BookMarked,
  Search,
  PackageCheck,
  FileInput
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import LoginPage from "../../pages/LoginPage";

function Nav({ children }) {
  // const additionalContent = "Otro contenido aquí..."; // Define el contenido adicional
  const { isAuthenticated } = useAuth();

  return (
    <>
      {isAuthenticated ? (
        <Sidebar additionalContent={children}>
          {/* Define el menú */}
          <>
            <Link to="/departments">
              <SidebarItem
                icon={<LayoutDashboard size={20} color="white" />}
                text="Departamentos"
                text2="Departamentos"
              />
            </Link>
            <Link to="/clients">
              <SidebarItem
                icon={<Users size={20} color="white" />}
                text="Clientes"
                text2="Cuentas locales"
              />
            </Link>
            <Link to="/productionInitial">
              <SidebarItem
                icon={<Search size={20} color="white" />}
                text="Inspección inicial"
                text2="Inspección inicial"
              />
            </Link>
            <Link to="/productionRepairs">
              <SidebarItem
                icon={<Settings size={20} color="white" />}
                text="Reparación"
                text2="Reparación"
              />
            </Link>
            <Link to="/productionFinal">
              <SidebarItem
                icon={<Flag size={20} color="white" />}
                text="Inspeccion Final"
                text2="Inspeccion Final"
              />
            </Link>
            <Link to="/workorders">
              <SidebarItem
                icon={<BookMarked size={20} color="white" />}
                text="Orden de trabajo"
                text2="O.T."
              />
            </Link>
            <Link to="/createWorkOrder">
              <SidebarItem
                icon={<NotebookPen size={20} color="white" />}
                text="Orden de trabajo"
                text2="Orden de trabajo"
              />
            </Link>
            <Link to="/deliveryOrders">
              <SidebarItem
                icon={<PackageCheck size={20} color="white" />}
                text="Crear orden de Entrega"
                text2="Crear orden de Entrega"
              />
            </Link>
            <Link to="/allDeliveryOrders">
              <SidebarItem
                icon={<FileInput size={20} color="white" />}
                text="Ver Orden de Entrega"
                text2="Ver Orden de Entrega"
              />
            </Link>
            {/* <Link to="/production">
                  <SidebarItem
                    icon={<Settings size={20} color="white" />}
                    text="Producción"
                    text2="Producción"
                  />
                </Link> */}
          </>
        </Sidebar>
      ) : (
        <>
          <LoginPage />
        </>
      )}
    </>
  );
}

export default Nav;
