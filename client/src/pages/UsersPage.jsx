import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CirclePlus } from "lucide-react";

function UsersPage() {
  const { getUsers, getAllUsers } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

  useEffect(() => {
    getUsers();
  }, []);

  const totalPages = Math.ceil(getAllUsers.length / ordersPerPage);

  // Obtener los datos de la página actual
  const currentOrders = getAllUsers.slice(
    (currentPage - 1) * ordersPerPage,
    currentPage * ordersPerPage
  );

  // Cambiar de página
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="px-4 lg:px-14 max-w-screen-2xl mx-auto">
        <div className="text-center my-8">
          <h2 className="text-4xl font-semibold mb-2">Usuarios</h2>
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
              <thead>
                <tr className="bg-gray-100 text-gray-600 text-sm uppercase text-left">
                  <th className="py-3 px-6">Nombre</th>
                  <th className="py-3 px-6">Rol</th>
                  <th className="py-3 px-6">Departamento</th>
                </tr>
              </thead>
              <tbody>
                {currentOrders.map((user, id) => (
                  <tr
                    key={id}
                    className="border-t border-gray-200 hover:bg-gray-50"
                  >
                    <td className="py-3 px-6 text-sm text-gray-900">
                      <Link className="h-auto w-auto" to={`/profile/${user._id}`}>
                        <button>{user.name} {user.lastName}</button>
                      </Link>
                    </td>
                    <td className="py-3 px-6 text-sm text-gray-900">
                      {user.role}
                    </td>
                    <td className="py-3 px-6 text-sm text-gray-900">
                      {user.department}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Mostrar paginación solo si hay 10 o más usuarios */}
            {getAllUsers.length >= 10 && (
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

export default UsersPage;
// {/* <div className="overflow-x-auto flex justify-center max-[542px]:block">
// <table className="w-[90%] bg-white shadow-md rounded-lg my-6 max-[540px]:ml-2">
//   <thead>
//     <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
//       <th className="py-3 px-6 text-left">Nombre</th>
//       <th className="py-3 px-6 text-left">Rol</th>
//       <th className="py-3 px-6 text-left">Departamento</th>
//       {/* <th className="py-3 px-6 text-center">Acciones</th> */}
//     </tr>
//   </thead>
//   <tbody className="text-gray-600 text-sm">
//     {getAllUsers.map((user, id) => (
//       <tr
//         key={id}
//         className="border-b border-gray-200 hover:bg-gray-100 hover:-translate-y-1"
//       >
//         <Link className="flex" to={`/profile/${user._id}`}>
//           <td className="px-4 whitespace-nowrap flex justify-center items-center">
//             {user.name} {user.lastName}
//           </td>
//         </Link>
//         <td className="py-3 px-6 text-left whitespace-nowrap">Rol</td>
//         <td className="py-3 px-6 text-left whitespace-nowrap">
//           Departamento
//         </td>
//         {/* <td className="py-3 px-6 text-center flex justify-evenly max-[541px]:block">
//         <button className="text-red-500 hover:text-red-700 mr-2 hover:-translate-y-1">
//           Eliminar
//         </button>
//         <button
//           onClick={() => handleOpenModalEditData(item.id)}
//           className="text-blue-500 hover:text-blue-700 hover:-translate-y-1"
//         >
//           Editar
//         </button>
//         <button
//           onClick={() => handleEdit(index)}
//           onClick={handleOpenModalEditPass}
//           className="text-green-500 hover:text-green-700 hover:-translate-y-1"
//         >
//           Editar contraseña
//         </button>
//       </td> */}
//       </tr>
//     ))}
//   </tbody>
// </table>
// </div> */}
