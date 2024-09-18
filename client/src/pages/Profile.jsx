import React from "react";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function Profile() {
  const { getUser } = useAuth();
  const params = useParams();
  // const [getOrders, setOrders] = useState()
  const [workOrders, setWorkOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

  useEffect(() => {
    async function loadUser() {
      try {
        if (params.id) {
          const userById = await getUser(params.id);
          if (userById) {
            setWorkOrders(userById.workOrders);
            console.log(workOrders);
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
    loadUser();
  }, []);

  const totalPages = Math.ceil(workOrders.length / ordersPerPage);

  // Obtener los datos de la página actual
  const currentOrders = workOrders.slice(
    (currentPage - 1) * ordersPerPage,
    currentPage * ordersPerPage
  );

  // Cambiar de página
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-gray-600 text-sm uppercase text-left">
              <th className="py-3 px-6">Número de Orden</th>
              <th className="py-3 px-6">Fecha de Entrega</th>
              <th className="py-3 px-6">Fecha de Recolección</th>
              <th className="py-3 px-6">Llantas</th>
              <th className="py-3 px-6">Cliente</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.map((order, index) => (
              <tr
                key={index}
                className="border-t border-gray-200 hover:bg-gray-50"
              >
                <Link to={`/workorder/${order._id}`}>
                  <td className="py-3 px-6 text-sm text-gray-900">
                    {order.numero}
                  </td>
                </Link>
                <td className="py-3 px-6 text-sm text-gray-900">
                  {order.deliveryDate}
                </td>
                <td className="py-3 px-6 text-sm text-gray-900">
                  {order.collectionDate}
                </td>
                <td className="py-3 px-6 text-sm text-gray-900">
                  {order.tires.length}
                </td>
                <td className="py-3 px-6 text-sm text-gray-900">
                  {order.client}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Paginación */}
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
      </div>
    </div>
    // <div>{getName}</div>
  );
}

export default Profile;
