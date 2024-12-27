import { CirclePlus, UserRoundPen, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useClient } from "../context/ClientContext";

function ClientPage() {
  const { getClients, allClients } = useClient();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Mostrar 10 elementos por página

  // Llamar a getClients una sola vez
  useEffect(() => {
    getClients();
  }, []);

  // Validar datos y calcular total de páginas
  const totalPages = Math.ceil(allClients.length / itemsPerPage);

  // Obtener los datos de la página actual
  const currentOrders = allClients.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Cambiar de página
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="px-4 lg:px-14 max-w-screen-2xl mx-auto">
      <div className="text-center my-8">
        <h2 className="text-4xl font-semibold mb-2">Cuentas Locales</h2>
      </div>
      <div className="flex justify-end">
        <Link to="/add-client">
          <button className="flex p-3 bg-indigo-400 rounded-lg text-white cursor-pointer hover:bg-indigo-700 duration-500 hover:duration-500">
            <CirclePlus className="mr-2" />
            Añadir nuevo
          </button>
        </Link>
      </div>
      <section>
        <div className="p-4 w-full">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead>
                <tr className="bg-gray-100 text-gray-600 text-sm text-left">
                  <th className="py-3 px-6">Nombre de Cuenta</th>
                  <th className="py-3 px-6">Cuenta (Nombre corto)</th>
                  <th className="py-3 px-6">Dirección</th>
                  <th className="py-3 px-6">Ciudad</th>
                  <th className="py-3 px-6">Region</th>
                  <th className="py-3 px-6">Codigo Postal</th>
                  <th className="py-3 px-6"></th>
                </tr>
              </thead>
              <tbody>
                {currentOrders.map((client, index) => (
                  <tr key={index} className="border-t border-gray-200">
                    <td className="py-3 px-6">{client.name}</td>
                    <td className="py-3 px-6">{client.alias}</td>
                    <td className="py-3 px-6">{client.address1}</td>
                    <td className="py-3 px-6">{client.city}</td>
                    <td className="py-3 px-6">{client.region}</td>
                    <td className="py-3 px-6">{client.zipCode}</td>
                    <td className="flex py-2 px-3 justify-between items-center">
                      <Link to={`/client/${client._id}`}>
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
            {allClients.length >= 10 && (
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
      </section>
    </div>
  );
}

export default ClientPage;
