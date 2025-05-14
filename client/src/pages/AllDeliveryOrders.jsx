import { Link } from "react-router-dom";
import { useDeliveryOrder } from "../context/DeliveryOrderContext.jsx";
import { useEffect, useState } from "react";
import { Printer, UserRoundPen, Trash2 } from "lucide-react";
import Alert from "../components/ui/Alert.jsx"; // Importa tu componente de alerta
import { useDispatch, useSelector } from "react-redux";
import socket from "../socket";
import { removeDeliveryOrder } from "../store/slices/deliveryOrderSlice.js";

function AllDeliveryOrders() {
  const { getDeliveryOrders, setAllDeliveryOrders, deleteDeliveryOrder } =
    useDeliveryOrder();
  const [currentPage, setCurrentPage] = useState(1);
  const [alert, setAlert] = useState(null); // Estado para manejar la alerta
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deliveryOrderToDelete, setDeliveryOrderToDelete] = useState(null);
  const [confirmationNumber, setConfirmationNumber] = useState("");
  const itemsPerPage = 10;
  const dispatch = useDispatch();
  const allDeliveryOrders = useSelector((state) => state.deliveryOrders.list);

  useEffect(() => {
    getDeliveryOrders();
  }, []);

  const totalPages = Math.ceil(allDeliveryOrders.length / itemsPerPage);

  const currentOrders = allDeliveryOrders.slice(
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

  const handleDeleteClick = (deliveryOrder) => {
    setDeliveryOrderToDelete(deliveryOrder);
    setIsModalOpen(true);
  };

  useEffect(() => {
    socket.on("deliveryOrderDeleted", ({ id }) => {
      dispatch(removeDeliveryOrder(id));
    });

    return () => {
      socket.off("deliveryOrderDeleted");
    };
  }, [dispatch]);

  const confirmDelete = async () => {
    if (confirmationNumber === String(deliveryOrderToDelete.numero)) {
      try {
        await deleteDeliveryOrder(deliveryOrderToDelete._id);
        showAlert("Se dio de baja la O.E. exitosamente", "success");
        setAllDeliveryOrders((prevOrders) =>
          prevOrders.filter((order) => order._id !== deliveryOrderToDelete._id)
        );
      } catch (error) {
        console.error(error);
        showAlert(
          "Error al dar de baja la orden de entrega. Intenta nuevamente.",
          "error"
        );
      }
      setIsModalOpen(false);
      setDeliveryOrderToDelete(null);
      setConfirmationNumber("");
    } else {
      showAlert("El número no coincide. Orden no eliminada.", "error");
    }
  };

  return (
    <div className="px-4 lg:px-14 max-w-screen-2xl mx-auto select-none">
      <div className="text-center my-8">
        <h2 className="md:text-4xl text-2xl font-bold mb-2">
          Ordenes de Entrega
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
          {allDeliveryOrders.length === 0 ? (
            <div className="text-center text-gray-600 text-lg">
              No hay ordenes de entrega registradas
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead>
                  <tr className="bg-gray-100 text-gray-600 text-sm text-left">
                  <th className="py-2 px-6">Código De cliente</th>
                    <th className="py-2 px-6">Nombre de Cuenta</th>
                    <th className="py-2 px-6">RFC</th>
                    <th className="py-2 px-6">Número Interior</th>
                    <th className="py-2 px-6">Número Exterior</th>
                    <th className="py-2 px-6">Colonia</th>
                    <th className="py-2 px-6">Código Postal</th>
                    <th className="py-2 px-6">Ciudad</th>
                    <th className="py-2 px-6">Municipio</th>
                    <th className="py-2 px-6">Estado</th>
                    <th className="py-2 px-6">Email</th>
                  </tr>
                </thead>
                <tbody>
                  {currentOrders.map((deliveryOrders, index) => (
                    <tr
                      key={index}
                      className="border-t border-gray-200 text-sm"
                    >
                      <td className="px-6">{deliveryOrders.numero}</td>
                      <td className="px-6 text-sm text-gray-900">
                        <button>{deliveryOrders.createdBy.name}</button>
                      </td>
                      <td className="px-6">{deliveryOrders.tires.length}</td>
                      <td className="py-2 px-2">{deliveryOrders.client.companyName}</td>
                      <td className=" text-xs px-3">
                        {deliveryOrders.client.street + ", " + deliveryOrders.client.city || deliveryOrders.client.municipality}
                        , <br />
                        {deliveryOrders.client.state +
                          ", " +
                          deliveryOrders.client.zipCode}
                      </td>
                      <td>{deliveryOrders.formattedCreatedAT}</td>
                      <td className="flex flex-col items-center sm:flex-row sm:justify-around">
                        <Link to={`/viewDeliveryOrder/${deliveryOrders._id}`}>
                          <button className="hover:text-slate-500 mt-1">
                            <Printer />
                          </button>
                        </Link>
                        <button
                          className="text-red-600 hover:text-red-800 mt-2 sm:mt-0"
                          onClick={() => handleDeleteClick(deliveryOrders)}
                        >
                          <Trash2 />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {allDeliveryOrders.length >= itemsPerPage && (
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold mb-4">Confirmar eliminación</h3>
            <p>
              Escribe el número de la orden{" "}
              <strong>{deliveryOrderToDelete.numero}</strong> para confirmar:
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

export default AllDeliveryOrders;
