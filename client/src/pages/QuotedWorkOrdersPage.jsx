import { useEffect, useState } from "react";
import { useWorkOrder } from "../context/WorkOrderContext";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@heroui/react";
import {  Link } from "react-router-dom";

function QuotesTiresPage() {
  const { getQuoteWorkOrder, allWorkOrders } = useWorkOrder();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Mostrar 10 elementos por página

  useEffect(() => {
    getQuoteWorkOrder();
  }, []);

  const totalPages = Math.ceil(allWorkOrders.length / itemsPerPage);

  // Obtener los datos de la página actual
  const currentOrders = allWorkOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Cambiar de página
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (allWorkOrders.length === 0) {
    return (
      <div className="px-4 pt-4 lg:px-14 max-w-screen-2xl mx-auto select-none">
        <div className="text-center my-8">
          <h2 className="md:text-4xl flex justify-center font-bold mb-3 text-2xl">
            Llantas a facturar
          </h2>
        </div>
        <div className="flex items-center justify-center h-64">
          <h1 className="text-2xl font-bold text-gray-500">No hay ordenes de trabajo para cotizar</h1>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="px-4 lg:px-14 max-w-screen-2xl mx-auto select-none">
        <div className="text-center my-8">
          <h2 className="md:text-4xl text-2xl font-bold mb-2">
            Ordenes a cotizar
          </h2>
        </div>
        
        <section>
          <div className="p-4 w-full">
            {allWorkOrders.length === 0 ? (
              <div className="text-center text-gray-600 text-lg">
                No hay ordenes de trabajo registradas.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                  <thead>
                    <tr className="bg-gray-100 text-gray-600 text-sm text-center">
                      <th className="py-2 px-2">#</th>
                      <th className="py-2 px-2">Nombre</th>
                      <th className="py-2 px-2">Registros</th>
                      <th className="py-2 px-2">Cliente</th>
                      <th className="py-2 px-3">Dirección</th>
                      <th className="py-2 px-5">Recolección</th>
                      <th className="">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentOrders.map((workOrder, index) => (
                      <tr
                        key={index}
                        className="border-t border-gray-200 text-sm text-center"
                      >
                        <td className="py-2 px-2">{workOrder.numero}</td>
                        <td className=" text-sm text-gray-900 py-2 px-2">
                          <Link
                            className="h-auto w-auto"
                            to={`/workOrder/${workOrder._id}`}
                          >
                            <button>{workOrder.createdBy.name}</button>
                          </Link>
                        </td>
                        <td className="py-2 px-2">{workOrder.tires.length}</td>
                        <td className="py-2 px-2">
                          {workOrder.client.companyName}
                        </td>
                        <td className=" text-xs px-3">
                          {workOrder.client.street +
                            ", " +
                            workOrder.client.city ||
                            workOrder.client.municipality}
                          , <br />
                          {workOrder.client.state +
                            ", " +
                            workOrder.client.zipCode}
                        </td>
                        <td className=" text-xs">
                          {workOrder.formattedCreatedAt}
                        </td>
                        <td className="py-2">
                          <Dropdown>
                            <DropdownTrigger className="shadow">
                              <Button variant="bordered">Abrir Menú</Button>
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Acciones del Cliente">
                              <DropdownItem key="edit">
                                <Link
                                  to={`/workorder/${workOrder._id}`}
                                  className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                                >
                                  Imprimir Orden
                                </Link>
                              </DropdownItem>
                            </DropdownMenu>
                          </Dropdown>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {allWorkOrders.length >= itemsPerPage && (
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
            )}
          </div>
        </section>
      </div>
    </>
  );
}

export default QuotesTiresPage;
