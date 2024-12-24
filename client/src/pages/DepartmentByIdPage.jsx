import React from "react";
import { useDepartment } from "../context/DepartmentContext";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CirclePlus, StepBack, Printer, UserRoundPen, Trash2 } from "lucide-react";

function DepartmentByIdPage() {
  const { getDepartmentById } = useDepartment();
  const params = useParams();
  const [users, setUsers] = useState([]);
  const [department, setDepartment] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

  useEffect(() => {
    async function loadDepartment() {
      try {
        if (params.id) {
          const departmentById = await getDepartmentById(params.id);
          if (departmentById) {
            setUsers(departmentById.users);
            setDepartment(departmentById.name);
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
    loadDepartment();
  }, []);

  const totalPages = Math.ceil(users.length / ordersPerPage);

  // Obtener los datos de la página actual
  const currentOrders = users.slice(
    (currentPage - 1) * ordersPerPage,
    currentPage * ordersPerPage
  );

  // Cambiar de página
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="md:px-8 px-3 py-10 max-w-screen-2xl mx-auto select-none">
        <div className="">
          <Link to="/departments">
            <button className="bg-cyan-950 rounded-md px-4 py-1 duration-500 hover:bg-cyan-800 hover:duration-500">
              <StepBack color="white" />
            </button>
          </Link>
          <h2 className="md:text-4xl flex justify-center font-bold mb-3 text-2xl">
            {department}
          </h2>
        </div>
        <div className="flex justify-end">
          <Link to="/register">
            <button className="flex p-3 bg-indigo-400 rounded-lg text-white cursor-pointer hover:bg-indigo-700 duration-500 hover:duration-500">
              <CirclePlus className="mr-2" />
              Añadir nuevo
            </button>
          </Link>
        </div>
        <div className="p-4 w-full">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead className="">
                <tr className="bg-gray-100 text-gray-600 text-sm uppercase text-left">
                  <th className="py-3 px-6">Nombre</th>
                  <th className="py-3 px-6">Apellido</th>
                  <th className="py-3 px-6">Usuario</th>
                  <th className="py-3 px-6 flex justify-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {currentOrders.map((user, id) => (
                  <tr
                    key={id}
                    className="border-t border-gray-200 hover:bg-gray-50"
                  >
                    <td className=" py-3 px-6 text-sm text-gray-900">
                      {user.name}
                    </td>
                    <td className="py-3 px-6 text-sm text-gray-900">
                      {user.lastName}
                    </td>
                    <td className="py-3 px-6 text-sm text-gray-900">
                      {user.userName}
                    </td>
                    <td className="flex py-2 justify-around">
                      <Link to={`/profile/${user._id}`}>
                        <button className="text-blue-600 hover:text-blue-800 ">
                          <UserRoundPen />
                        </button>
                      </Link>
                      <button className="text-red-600 hover:text-red-800 ">
                        <Trash2 />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Mostrar paginación solo si hay 10 o más usuarios */}
            {users.length >= 10 && (
              <div className="flex justify-between items-center mt-4">
                <div className="text-sm text-gray-600">
                  Página {currentPage} de {totalPages}
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-lg border ${
                      currentPage === 1
                        ? "text-gray-400 border-gray-200"
                        : "text-blue-600 border-blue-600 hover:bg-blue-50"
                    }`}
                  >
                    Anterior
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => handlePageChange(i + 1)}
                      className={`px-4 py-2 rounded-lg border ${
                        currentPage === i + 1
                          ? "bg-blue-600 text-white"
                          : "text-blue-600 border-blue-600 hover:bg-blue-50"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded-lg border ${
                      currentPage === totalPages
                        ? "text-gray-400 border-gray-200"
                        : "text-blue-600 border-blue-600 hover:bg-blue-50"
                    }`}
                  >
                    Siguiente
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default DepartmentByIdPage;
