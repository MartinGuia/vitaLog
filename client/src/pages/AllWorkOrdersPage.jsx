import { Link } from "react-router-dom";
import { useWorkOrder } from "../context/WorkOrderContext";
import { useEffect, useState } from "react";
import { Printer, UserRoundPen, Trash2 } from "lucide-react";

function AllWorkOrdersPage() {
  const { getWorkOrders, workOrders } = useWorkOrder();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Mostrar 10 elementos por página

  // Llamar a getClients una sola vez
  useEffect(() => {
    getWorkOrders();
  }, []);

  // Validar datos y calcular total de páginas
  const totalPages = Math.ceil(workOrders.length / itemsPerPage);

  // Obtener los datos de la página actual
  const currentOrders = workOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Cambiar de página
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (workOrders.length === 0) <h1>No hay Ordenes de trabajo</h1>;

  return (
    <div className="px-4 lg:px-14 max-w-screen-2xl mx-auto">
      <div className="text-center my-8">
        <h2 className="text-4xl font-semibold mb-2">Ordenes de trabajo</h2>
      </div>
      <section>
        <div className="p-4 w-full">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead>
                <tr className="bg-gray-100 text-gray-600 text-sm text-left">
                  <th className="py-3 px-6">#</th>
                  <th className="py-3 px-6">Nombre</th>
                  <th className="py-3 px-6">Registros</th>
                  <th className="py-3 px-6">Cliente</th>
                  <th className="py-3 px-6">Dirección</th>
                  <th className="py-3 px-6"></th>
                  {/* <th className="py-3 px-6">ciudad</th>
                  <th className="py-3 px-6">region</th>
                  <th className="py-3 px-6">Codigo Postal</th> */}
                </tr>
              </thead>
              <tbody className="">
                {currentOrders.map((workOrder, index) => (
                  <tr
                    key={index}
                    className="border-t border-gray-200"
                  >
                    <td className="py-3 px-6">{workOrder.numero}</td>
                    <td className="py-3 px-6 text-sm text-gray-900">
                      <Link
                        className="h-auto w-auto"
                        to={`/workOrder/${workOrder._id}`}
                      >
                        <button>{workOrder.createdBy.name}</button>
                      </Link>
                    </td>
                    <td className="py-3 px-6">{workOrder.tires.length}</td>
                    <td className="py-3 px-6">{workOrder.client.name}</td>
                    <td className="py-3 px-6">
                      {workOrder.client.address1}, <br />
                      {workOrder.client.region},
                      {workOrder.client.city}, <br />
                      {workOrder.client.zipCode}
                    </td>
                    <td className="sm:flex py-2 sm:py-10 px-3 justify-between">
                      <Link to={`/workorder/${workOrder._id}`}>
                        <button className="text-blue-600 hover:text-blue-800 ">
                          <UserRoundPen />
                        </button>
                      </Link>
                      <button className="text-red-600 hover:text-red-800 ">
                        <Trash2 />
                      </button>
                      <button className="hover:text-slate-500">
                      <Printer />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Mostrar paginación solo si hay 10 o más usuarios */}
            {workOrders.length >= 10 && (
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

export default AllWorkOrdersPage;
