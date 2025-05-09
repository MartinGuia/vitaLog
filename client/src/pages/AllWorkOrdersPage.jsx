import { Link } from "react-router-dom";
import { useWorkOrder } from "../context/WorkOrderContext";
import { useEffect, useState } from "react";
import Alert from "../components/ui/Alert.jsx"; // Importa tu componente de alerta
import { useDispatch, useSelector } from "react-redux";
import { removeWorkOrder } from "../store/slices/workOrderSlice.js";
import socket from "../socket";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@heroui/react";

function AllWorkOrdersPage() {
  const { deleteWorkOrder, getWorkOrders, setAllWorkOrders } = useWorkOrder();
  const [currentPage, setCurrentPage] = useState(1);
  const [alert, setAlert] = useState(null); // Estado para manejar la alerta
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [workOrderToDelete, setWorkOrderToDelete] = useState(null);
  const [confirmationNumber, setConfirmationNumber] = useState("");
  const itemsPerPage = 10;
  const dispatch = useDispatch();
  const allWorkOrders = useSelector((state) => state.workOrders.list);

  useEffect(() => {
    getWorkOrders();
  }, []);

  const totalPages = Math.ceil(allWorkOrders.length / itemsPerPage);

  const currentOrders = allWorkOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const showAlert = (message, type = "success") => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 1000);
  };

  const handleDeleteClick = (workOrder) => {
    setWorkOrderToDelete(workOrder);
    setIsModalOpen(true);
  };

  useEffect(() => {
    socket.on("workOrderDeleted", ({ id }) => {
      dispatch(removeWorkOrder(id));
    });

    return () => {
      socket.off("workOrderDeleted");
    };
  }, [dispatch]);

  const confirmDelete = async () => {
    if (confirmationNumber === String(workOrderToDelete.numero)) {
      try {
        await deleteWorkOrder(workOrderToDelete._id);
        showAlert("Orden de trabajo eliminada exitosamente", "success");
        setAllWorkOrders((prevOrders) =>
          prevOrders.filter((order) => order._id !== workOrderToDelete._id)
        );
      } catch (error) {
        console.error(error);
        showAlert(
          "Error al eliminar la orden de trabajo. Intenta nuevamente.",
          "error"
        );
      }
      setIsModalOpen(false);
      setWorkOrderToDelete(null);
      setConfirmationNumber("");
    } else {
      showAlert("El número no coincide. Orden no eliminada.", "error");
    }
  };

  return (
    <div className="px-4 lg:px-14 max-w-screen-2xl mx-auto select-none">
      <div className="text-center my-8">
        <h2 className="md:text-4xl text-2xl font-bold mb-2">
          Órdenes de Trabajo
        </h2>
      </div>
      {alert && (
        <Alert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert(null)}
        />
      )}
      <section>
        <div className="p-4 w-full">
          {allWorkOrders.length === 0 ? (
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
                  {currentOrders.map((workOrder, index) => (
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
                            <DropdownItem
                              key="delete"
                              className="text-danger flex items-center gap-2"
                              color="danger"
                              onClick={() => handleDeleteClick(workOrder)}
                            >
                              {/* <Trash2 /> */}
                              Eliminar Orden
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

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold mb-4">Confirmar eliminación</h3>
            <p>
              Escribe el número de la orden{" "}
              <strong>{workOrderToDelete.numero}</strong> para confirmar:
            </p>
            <input
              type="text"
              value={confirmationNumber}
              onChange={(e) => setConfirmationNumber(e.target.value)}
              className="border border-gray-300 rounded-md px-2 py-1 mt-2 w-full"
            />
            <div className="flex justify-end space-x-4 mt-4">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setConfirmationNumber("");
                }}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AllWorkOrdersPage;
