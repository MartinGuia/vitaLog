import { Link } from "react-router-dom";
import { useWorkOrder } from "../context/WorkOrderContext";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeWorkOrder } from "../store/slices/workOrderSlice.js";
import socket from "../socket";
import AlertComponent from "../components/ui/AlertComponent";
import ButtonMenu from "../components/ui/ButtonMenu.jsx";
import { Input } from "@heroui/react";
import CustomTable from "../components/ui/CustomTable.jsx";

function AllWorkOrdersPage() {
  const { deleteWorkOrder, getWorkOrders, setAllWorkOrders } = useWorkOrder();
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [workOrderToDelete, setWorkOrderToDelete] = useState(null);
  const [confirmationNumber, setConfirmationNumber] = useState("");
  const itemsPerPage = 8;
  const dispatch = useDispatch();
  const allWorkOrders = useSelector((state) => state.workOrders.list);
  const [alertData, setAlertData] = useState(null); // Para controlar si mostrar el Alert
  const [searchTerm, setSearchTerm] = useState("");
  const filteredOrders =
    searchTerm.trim() === ""
      ? allWorkOrders
      : allWorkOrders.filter((order) =>
          order.client.companyName
            .toLowerCase()
            .includes(searchTerm.trim().toLowerCase())
        );

  const columns = [
    { key: "numero", label: "#" },
    { key: "createdBy", label: "Nombre" },
    { key: "tires", label: "Registros" },
    { key: "client", label: "Cliente" },
    { key: "direccion", label: "Dirección" },
    { key: "formattedCreatedAt", label: "Recolección" },
    { key: "acciones", label: "Acciones" },
  ];

  useEffect(() => {
    getWorkOrders();
  }, []);

  const items = filteredOrders.map((order) => ({
    id: order._id,
    numero: order.numero,
    createdBy: (
      <Link to={`/workOrder/${order._id}`}>
        <button>{order.createdBy.name}</button>
      </Link>
    ),
    tires: order.tires.length,
    client: order.client.companyName,
    direccion: `${order.client.street}, ${
      order.client.city || order.client.municipality
    }, ${order.client.state}, ${order.client.zipCode}`,
    formattedCreatedAt: order.formattedCreatedAt,
    acciones: (
      <ButtonMenu
        description="Ver y editar Orden de Trabajo"
        linkText="Ver Orden de Trabajo"
        linkText2="Eliminar Orden"
        description2="Eliminar del sistema"
        to={`/workorder/${order._id}`}
        onPress={() => handleDeleteClick(order)}
      />
    ),
  }));
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
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
        setAlertData({
          title: "¡Exito!",
          description: "Orden de trabajo eliminada exitosamente",
          color: "success",
        });
        setAllWorkOrders((prevOrders) =>
          prevOrders.filter((order) => order._id !== workOrderToDelete._id)
        );
      } catch (error) {
        console.error(error);
        setAlertData({
          title: "¡Error!",
          description:
            "Error al eliminar la orden de trabajo. Intenta nuevamente.",
          color: "danger",
        });
      }
      setIsModalOpen(false);
      setWorkOrderToDelete(null);
      setConfirmationNumber("");
    } else {
      setAlertData({
        title: "¡Error!",
        description: "El número no coincide con el de la orden de trabajo.",
        color: "danger",
      });
    }
  };

  return (
    <div className="px-4 lg:px-14 mx-auto select-none">
      <div className="text-center my-8">
        <h2 className="md:text-4xl text-2xl font-bold mb-2">
          Ordenes de Trabajo
        </h2>
      </div>
      {alertData && (
        <AlertComponent
          title={alertData.title}
          description={alertData.description}
          color={alertData.color}
          onClose={() => setAlertData(null)} // Esta es la función que se ejecutará después de 3 segundos
        />
      )}
      <section>
        <div className="p-2 w-full">
          {allWorkOrders.length === 0 ? (
            <div className="text-center text-gray-600 text-lg">
              No hay ordenes de trabajo registradas.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <div className="flex justify-end mb-2 p-2">
                <Input
                  type="text"
                  placeholder="Buscar por número de orden..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1); // Reiniciar a página 1 al buscar
                  }}
                  className="w-full max-w-sm dark"
                  classNames={{
                    label: "text-black/50 dark:text-white/90",
                    input: [
                      "bg-transparent",
                      "text-black/90 dark:text-white/90",
                      "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                    ],
                    innerWrapper: "bg-transparent",
                    inputWrapper: [
                      "shadow-lg",
                      "bg-default-200/50",
                      "dark:bg-default/60",
                      "backdrop-blur-xl",
                      "backdrop-saturate-200",
                      "hover:bg-default-200/70",
                      "dark:hover:bg-default/70",
                      "group-data-[focus=true]:bg-default-200/50",
                      "dark:group-data-[focus=true]:bg-default/60",
                      "!cursor-text",
                    ],
                  }}
                  label="Filtrar"
                  radius="lg"
                />
              </div>

              <div className="p-1">
                <CustomTable
                  columns={columns}
                  items={items}
                  isLoading={false}
                  page={currentPage}
                  totalItems={filteredOrders.length}
                  rowsPerPage={itemsPerPage}
                  onPageChange={handlePageChange}
                />
              </div>
            </div>
          )}
        </div>
      </section>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-10 flex justify-center items-center">
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
