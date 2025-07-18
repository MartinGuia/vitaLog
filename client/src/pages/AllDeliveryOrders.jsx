import { Link } from "react-router-dom";
import { useDeliveryOrder } from "../context/DeliveryOrderContext.jsx";
import { useEffect, useState } from "react";
import { Printer, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import socket from "../socket";
import { removeDeliveryOrder } from "../store/slices/deliveryOrderSlice.js";
import AlertComponent from "../components/ui/AlertComponent";
import CustomTable from "../components/ui/CustomTable.jsx";
import { Input } from "@heroui/react";

function AllDeliveryOrders() {
  const { getDeliveryOrders, setAllDeliveryOrders, deleteDeliveryOrder } =
    useDeliveryOrder();
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deliveryOrderToDelete, setDeliveryOrderToDelete] = useState(null);
  const [confirmationNumber, setConfirmationNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 10;
  const dispatch = useDispatch();
  const allDeliveryOrders = useSelector((state) => state.deliveryOrders.list);
  const [alertData, setAlertData] = useState(null);

  useEffect(() => {
    getDeliveryOrders();
  }, []);

  useEffect(() => {
    socket.on("deliveryOrderDeleted", ({ id }) => {
      dispatch(removeDeliveryOrder(id));
    });

    return () => {
      socket.off("deliveryOrderDeleted");
    };
  }, [dispatch]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDeleteClick = (deliveryOrder) => {
    setDeliveryOrderToDelete(deliveryOrder);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    if (confirmationNumber === String(deliveryOrderToDelete.numero)) {
      try {
        await deleteDeliveryOrder(deliveryOrderToDelete._id);
        setAlertData({
          title: "¡Éxito!",
          description: "Nota de entrega dada de baja",
          color: "success",
        });
        setAllDeliveryOrders((prevOrders) =>
          prevOrders.filter((order) => order._id !== deliveryOrderToDelete._id)
        );
      } catch (error) {
        console.error(error);
        setAlertData({
          title: "Error!",
          description:
            "Error al dar de baja la nota de entrega. Intente de nuevo",
          color: "danger",
        });
      }
      setIsModalOpen(false);
      setDeliveryOrderToDelete(null);
      setConfirmationNumber("");
    } else {
      setAlertData({
        title: "Error!",
        description: "El número no coincide. Intente de nuevo.",
        color: "danger",
      });
    }
  };

  const filteredOrders =
    searchTerm.trim() === ""
      ? allDeliveryOrders
      : allDeliveryOrders.filter((order) =>
          String(order.numero).includes(searchTerm.trim()) ||
          order.client?.companyName
            .toLowerCase()
            .includes(searchTerm.trim().toLowerCase())
        );

  const columns = [
    { key: "numero", label: "#" },
    { key: "createdBy", label: "Recolector" },
    { key: "tires", label: "Registros" },
    { key: "client", label: "Cliente" },
    { key: "direccion", label: "Dirección" },
    { key: "formattedCreatedAT", label: "Recolección" },
    { key: "acciones", label: "Acciones" },
  ];

  const items = filteredOrders.map((order) => ({
    id: order._id,
    numero: order.numero,
    createdBy: order.createdBy.name,
    tires: order.tires.length,
    client: order.client?.companyName,
    direccion: `${order.client?.street}, ${
      order.client?.city || order.client?.municipality
    }, ${order.client?.state}, ${order.client?.zipCode}`,
    formattedCreatedAT: order.formattedCreatedAT,
    acciones: (
      <div className="flex gap-2 justify-center">
        <Link to={`/viewDeliveryOrder/${order._id}`}>
          <button className="hover:text-slate-500">
            <Printer />
          </button>
        </Link>
        <button
          className="text-red-600 hover:text-red-800"
          onClick={() => handleDeleteClick(order)}
        >
          <Trash2 />
        </button>
      </div>
    ),
  }));

  return (
    <div className="px-4 lg:px-14 mx-auto select-none">
      <div className="text-center my-8">
        <h2 className="md:text-4xl text-2xl font-bold mb-2">
          Notas de Entrega
        </h2>
      </div>

      {alertData && (
        <AlertComponent
          title={alertData.title}
          description={alertData.description}
          color={alertData.color}
          onClose={() => setAlertData(null)}
        />
      )}

      <section>
        <div className="p-4 w-full">
          {allDeliveryOrders.length === 0 ? (
            <div className="text-center text-gray-600 text-lg">
              No hay órdenes de entrega registradas
            </div>
          ) : (
            <div className="overflow-x-auto">
              <div className="flex justify-end mb-2 p-2">
                <Input
                  type="text"
                  placeholder="Buscar por número o cliente..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
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
