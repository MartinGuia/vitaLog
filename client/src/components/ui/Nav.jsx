import Sidebar, { SidebarItem } from "../Sidebar";
import {
  BarChart3,
  LayoutDashboard,
  BookMarked,
  ClipboardPen,
  SquareUser,
  NotebookPen,
  UserRoundPlus,
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
            <Link to="/homepage">
              <SidebarItem
                icon={<LayoutDashboard size={20} color="white"/>}
                text="Principal"
              />
            </Link>
            <Link to="/allusers">
              <SidebarItem
                icon={<SquareUser size={20} color="white" />}
                text="Usuarios"
              />
            </Link>
            <Link to="/register">
              <SidebarItem
                icon={<UserRoundPlus size={20} color="white" />}
                text="Agregar usuario"
              />
            </Link>
            <Link to="/add-tire">
              <SidebarItem
                icon={<NotebookPen size={20} color="white" />}
                text="Agregar llantas"
              />
            </Link>
            <Link to="/workorders">
              <SidebarItem
                icon={<BookMarked size={20} color="white" />}
                text="Orden de trabajo"
              />
            </Link>
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
