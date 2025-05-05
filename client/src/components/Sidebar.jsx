import * as images from "../img";
import { useState, createContext, useContext,  useEffect } from "react";
import { Menu, ChevronLast, LogOut, Bell } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addNotification, clearNotifications } from "../store/slices/notificationSlice";
import socket from "../socket"; // Importar socket

const SidebarContext = createContext();

export default function Sidebar({ children, additionalContent }) {
  const [expanded, setExpanded] = useState(false);
  const { logout, user } = useAuth();
  const dispatch = useDispatch();
  const { hasNewNotification, notifications } = useSelector((state) => state.notifications);
  

  useEffect(() => {
    // Escuchar evento de notificación del backend
    socket.on("newNotification", (notification) => {
      dispatch(addNotification(notification)); // Agregar notificación a Redux
    });
  
    return () => {
      socket.off("newNotification"); // Evitar múltiples suscripciones
    };
  }, [dispatch]);
  
  const handleClearNotifications = () => {
    dispatch(clearNotifications()); // Limpia las notificaciones y el indicador
  };
 
  return (
    <main className="flex">
      {/* Condicional para que el sidebar sea sticky solo cuando no esté expandido */}
      <aside
        className={`sticky top-0 ${
          expanded
            ? "w-48 md:w-52 h-screen" // No se mueve cuando está expandido
            : "sticky top-0 w-16 h-screen" // Se mueve con el scroll cuando está colapsado
        }`}
      >
        <nav className="h-full flex flex-col border shadow-lg  bg-colorPrimary">
          <div className="p-4 pb-2 flex justify-between items-center">
            <img
              src={images.logoVB}
              alt=""
              className={`overflow-hidden transition-all ${
                expanded ? "w-20" : "w-0"
              }`}
            />
            <button
              onClick={() => setExpanded((curr) => !curr)}
              className="p-1.5 rounded-lg bg-buttonPrimary duration-500 hover:duration-500 hover:bg-buttonPrimaryHover shadow-md shadow-gray-600"
            >
              {expanded ? <Menu className="w-10" /> : <ChevronLast />}
            </button>
          </div>
          <SidebarContext.Provider value={{ expanded }}>
            <ul className="flex-1">{children}</ul>
          </SidebarContext.Provider>
          <div className="border-t flex p-3">
            <img
              src={images.userIcon}
              className="w-8 h-8 md:w-10 md:h-10 rounded-md color filter grayscale invert"
              alt=""
            />
            <div
              className={`flex justify-between items-center overflow-hidden ${
                expanded ? "w-52 ml-3" : "w-0"
              }`}
            >
              <div className="leading-4">
                <h4 className="font-semibold text-white text-xs md:text-normal">
                  {user.name} {user.lastName}
                </h4>
                {/* <span className="text-xs text-gray-600 ">{user.userName}</span> */}
                <span className="text-xs text-white">{user.userName}</span>
              </div>
              <Link
                to="/"
                className="p-1.5 rounded-lg bg-buttonTertiary duration-500 hover:duration-500 hover:bg-buttonTertiaryHover shadow-md shadow-gray-600"
                onClick={() => {
                  logout();
                }}
              >
                <LogOut size={20} className="mr-3" color="white"/>
              </Link>
            </div>
          </div>
        </nav>
      </aside>

      {/* Sección de contenido principal */}
      <section
        className={`overflow-hidden h-auto transition-all ${
          expanded ? "w-screen" : "w-screen"
        }`}
      >
        <div className="absolute top-2 right-5">
          <button onClick={handleClearNotifications} className="relative">
            <Bell />
            {hasNewNotification && (
              <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full" />
            )}
          </button>
          {notifications.length > 0 && (
            <div className="absolute top-8 border-vbYellow border right-0 bg-white px-8 shadow-lg rounded-md">
              {notifications.map((notif, index) => (
                <div key={index} className="w-44 p-2">
                  <p>{notif.message}</p>
                  <span className="text-xs text-gray-500">
                    {notif.timestamp}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
        {additionalContent}
      </section>
    </main>
  );
}

export function SidebarItem({ icon, text2, text, active, alert }) {
  const { expanded } = useContext(SidebarContext);
  return (
    <li
      className={`relative flex items-center py-3 md:py-3 my-1 px-3 font-medium rounded-md cursor-pointer transition-colors group ${
        active
          ? "bg-gradient-to-tr from-indigo-200 to-indigo-200 text-indigo-800"
          : "hover:bg-hoverPrimary text-gray-600"
      }`}
    >
      {icon}
      <span
        className={`overflow-hidden text-white ${
          expanded ? "w-52 ml-3" : "hidden w-0"
        } transition-all`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
            expanded ? "" : "top-2"
          }`}
        />
      )}

      {!expanded && (
        <div
          className={`w-auto absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
        >
          {text2}
        </div>
      )}
    </li>
  );
}
