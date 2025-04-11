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

function ViewWOBySeller() {
  const { getWorkOrderByUser } = useAuth();
  const params = useParams();
  const [workOrders, setWorkOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  

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
                  {workOrders.map((workOrder, index) => (
                    <tr
                      key={index}
                      className="border-t border-gray-200 text-sm"
                    >
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
                      <td className="px-6">{workOrder.client.name}</td>
                      <td className="px-6 text-xs">
                        {workOrder.client.address1 +
                          ", " +
                          workOrder.client.city}
                        , <br />
                        {workOrder.client.region +
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
                                {/* <UserRoundPen /> */}
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
              {workOrders.length >= itemsPerPage && (
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
    // <div className="p-4">
    //   <h1 className="text-2xl font-semibold mb-4">Órdenes de trabajo del vendedor</h1>
    //   <div className="overflow-x-auto">
    //     <table className="min-w-full bg-white rounded-lg shadow-md">
    //       <thead className="bg-gray-100 text-gray-600 text-left">
    //         <tr>
    //           <th className="py-3 px-4">#</th>
    //           <th className="py-3 px-4">Cliente</th>
    //           <th className="py-3 px-4">Número</th>
    //           <th className="py-3 px-4">Abierta</th>
    //           <th className="py-3 px-4">Creada por</th>
    //           <th className="py-3 px-4">Fecha</th>
    //           <th className="py-3 px-4">Acciones</th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {workOrders.map((order, index) => (
    //           <tr key={order._id} className="border-t hover:bg-gray-50">
    //             <td className="py-2 px-4">{index + 1}</td>
    //             <td className="py-2 px-4">{order.client?.name || "Sin nombre"}</td>
    //             <td className="py-2 px-4">{order.numero}</td>
    //             <td className="py-2 px-4">
    //               <span className={`px-2 py-1 rounded text-white text-xs ${order.isOpen ? "bg-green-500" : "bg-red-500"}`}>
    //                 {order.isOpen ? "Sí" : "No"}
    //               </span>
    //             </td>
    //             <td className="py-2 px-4">{order.createdBy.name + " " +order.createdBy.lastName}</td>
    //             <td className="py-2 px-4">{new Date(order.createdAt).toLocaleDateString()}</td>
    //             <td className="py-2 px-4">
    //               <Link
    //                 to={`/ordenes/${order._id}`}
    //                 className="text-blue-600 hover:underline text-sm"
    //               >
    //                 Ver detalles
    //               </Link>
    //             </td>
    //           </tr>
    //         ))}
    //         {workOrders.length === 0 && (
    //           <tr>
    //             <td colSpan="7" className="text-center text-gray-500 py-6">
    //               No hay órdenes registradas para este usuario.
    //             </td>
    //           </tr>
    //         )}
    //       </tbody>
    //     </table>
    //   </div>
    // </div>
  );
}

export default ViewWOBySeller;