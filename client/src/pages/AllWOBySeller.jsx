import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useParams, Link } from "react-router-dom";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button
} from "@heroui/react";
import { useWorkOrder } from "../context/WorkOrderContext.jsx";
import { Checkbox } from "@heroui/react";

function ViewWOBySeller() {
  const { getWorkOrderByUser } = useAuth();
  const params = useParams();
  const [workOrders, setWorkOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const {quoteWorkOrder} = useWorkOrder()
   const [selectedWorkOrderIds, setSelectedWorkOrderIds] = useState([]);
  

  useEffect(() => {
    async function loadUser() {
      try {
        if (params.id) {
          const fetchedWorkOrders = await getWorkOrderByUser(params.id);
          if (fetchedWorkOrders.workOrders) {
            setWorkOrders(fetchedWorkOrders.workOrders);
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
    loadUser();
  }, [params.id]);

  const totalPages = Math.ceil(workOrders.length / itemsPerPage);

  const currentOrders = workOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  return (
    <div className="px-4 lg:px-14 max-w-screen-2xl mx-auto select-none">
      <div className="text-center my-8">
        <h2 className="md:text-4xl text-2xl font-bold mb-2">
          Órdenes de Trabajo
        </h2>
      </div>
      
      <section>
      
        <div className="p-4 w-full">
          {currentOrders.length === 0 ? (
            <div className="text-center text-gray-600 text-lg">
              No hay órdenes de trabajo registradas.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead>
                  <tr className="bg-gray-100 text-gray-600 text-sm text-left">
                    <th className="py-2 px-6"></th>
                    <th className="py-2 px-6">#</th>
                    <th className="px-6">Nombre</th>
                    <th className="px-6">Registros</th>
                    <th className="px-6">Cliente</th>
                    <th className="px-6">Dirección</th>
                    <th className="px-6">Recolección</th>
                    <th className="px-6">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {currentOrders.map((workOrder, index) => (
                    <tr
                      key={index}
                      className="border-t border-gray-200 text-sm"
                    >
                      <td className="px-6">
                        <Checkbox
                              color="warning"
                              defaultSelected={workOrder.quoteWorkOrder === true}
                              onChange={(e) => {
                                const checked = e.target.checked;
                                const workOrdersIds = workOrder._id;

                                if (checked) {
                                  setSelectedWorkOrderIds((prev) => [
                                    ...prev,
                                    workOrdersIds,
                                  ]);
                                } else {
                                  setSelectedWorkOrderIds((prev) =>
                                    prev.filter((id) => id !== workOrdersIds)
                                  );
                                }
                              }}
                            />
                      </td>
                      <td className="px-6">{workOrder.numero}</td>
                      <td className="px-6 text-sm text-gray-900">
                        <Link
                          className="h-auto w-auto"
                          to={`/workOrder/${workOrder._id}`}
                        >
                          <button>{workOrder.createdBy.name}</button>
                        </Link>
                      </td>
                      <td className="px-6">{workOrder.tires.length}</td>
                      <td className="px-6">{workOrder.client.companyName}</td>
                      <td className="px-6 text-xs">
                         {workOrder.client.street + ", " + workOrder.client.city || workOrder.client.municipality}
                        , <br />
                        {workOrder.client.state +
                          ", " +
                          workOrder.client.zipCode}
                      </td>
                      <td>{workOrder.formattedCreatedAt}</td>
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
                   {(() => {
                      const pageNumbers = [];
                      let startPage = Math.max(1, currentPage - 2);
                      let endPage = Math.min(totalPages, startPage + 4);

                      if (endPage - startPage < 4) {
                        startPage = Math.max(1, endPage - 4);
                      }

                      for (let i = startPage; i <= endPage; i++) {
                        pageNumbers.push(i);
                      }

                      return pageNumbers.map((pageNum) => (
                        <button
                          key={pageNum}
                          onClick={() => handlePageChange(pageNum)}
                          className={`px-4 py-2 rounded-lg border ${
                            currentPage === pageNum
                              ? "bg-blue-600 text-white"
                              : "text-blue-600 border-blue-600 hover:bg-blue-50"
                          }`}
                        >
                          {pageNum}
                        </button>
                      ));
                    })()}
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
          {selectedWorkOrderIds.length > 0 && (
                <div className="mt-4">
                  <button
                    onClick={() =>
                      quoteWorkOrder({ workOrdersIds: selectedWorkOrderIds })
                    }
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
                  >
                    Enviar a cotización
                  </button>
                </div>
              )}
        </div>
      </section>
    </div>
  );
}

export default ViewWOBySeller;