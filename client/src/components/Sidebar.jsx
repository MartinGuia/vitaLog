import * as images from "../img";
import { useState, createContext, useContext } from "react";
import { Menu, ChevronLast, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const SidebarContext = createContext();

export default function Sidebar({ children, additionalContent }) {
  const [expanded, setExpanded] = useState(false);
  const { logout, user } = useAuth();

  return (
    <main className="flex">
      <aside className={`  ${expanded ? "max-[500px]:absolute h-screen" : ""}`}>
        <nav className="h-full flex flex-col bg-white border- shadow-lg">
          <div className="p-4 pb-2 flex justify-between items-center">
            <img
              src={images.logoVB}
              alt=""
              className={`overflow-hidden transition-all ${
                expanded ? "w-32" : "w-0"
              }`}
            />
            <button
              onClick={() => setExpanded((curr) => !curr)}
              className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
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
              className="w-10 h-10 rounded-md"
              alt=""
            />
            <div
              className={`flex justify-between items-center overflow-hidden ${
                expanded ? "w-52 ml-3" : "w-0"
              }`}
            >
              <div className="leading-4">
                <h4 className="font-semibold">{user.name} {user.lastName}</h4>
                <span className="text-xs text-gray-600">
                  {user.userName}
                </span>
              </div>
              <Link
                to="/"
                className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
                onClick={() => {
                  logout();
                }}
              >
                <LogOut size={20} className="mr-3" />
              </Link>
            </div>
          </div>
        </nav>
      </aside>
      <section className="w-screen h-dvh">
        {/* Muestra el contenido adicional */}
        {additionalContent}
      </section>
    </main>
  );
}

export function SidebarItem({ icon, text, active, alert }) {
  const { expanded } = useContext(SidebarContext);
  return (
    <li
      className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${
        active
          ? "bg-gradient-to-tr from-indigo-200 to-indigo-200 text-indigo-800"
          : "hover:bg-indigo-50 text-gray-600"
      }
      `}
    >
      {icon}
      <span
        className={`overflow-hidden ${
          expanded ? "w-52 ml-3" : "w-0"
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
          className={`w-20 absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
        >
          {text}
        </div>
      )}
    </li>
  );
}