import { CirclePlus, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useClient } from "../context/ClientContext";
import {
  Input,
} from "@heroui/react";
import AlertComponent from "../components/ui/AlertComponent";
import ButtonMenu from "../components/ui/ButtonMenu.jsx";

function AllClientPage() {
  const { getClients, allClients, deleteClient } = useClient();
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clientToDelete, setClientToDelete] = useState(null);
  const [confirmationName, setConfirmationName] = useState("");
  const itemsPerPage = 10; // Mostrar 10 elementos por página
  const [alertData, setAlertData] = useState(null); // Para controlar si mostrar el Alert

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

  const handleDeleteClick = (client) => {
    setClientToDelete(client);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    if (confirmationName === clientToDelete.companyName) {
      try {
        await deleteClient(clientToDelete._id);
        setAlertData({
          title: "¡Exito!",
          description: "Cliente eliminado exitosamente",
          color: "success",
        });
        getClients(); // Refresca la lista de clientes
      } catch (error) {
        console.error(error);
        setAlertData({
          title: "¡Error!",
          description: "Error al eliminar cliente. Intenta nuevamente.",
          color: "danger",
        });
      }
      setIsModalOpen(false);
      setClientToDelete(null);
      setConfirmationName("");
    } else {
      setAlertData({
        title: "¡Error!",
        description:
          "El nombre no coincide con el cliente. Intenta nuevamente.",
        color: "danger",
      });
    }
  };

  return (
    <div className="px-4 lg:px-14 mx-auto select-none">
      <div className="text-center my-8">
        <div className="flex items-center gap-3 mb-6">
          <h1 className="text-2xl md:text-4xl font-bold">Cuentas Locales</h1>
        </div>
      </div>
      {/* Alerta */}
      <div className="mb-2">
        {alertData && (
          <AlertComponent
            title={alertData.title}
            description={alertData.description}
            color={alertData.color}
            onClose={() => setAlertData(null)} // Esta es la función que se ejecutará después de 3 segundos
          />
        )}
      </div>

      <div className="flex justify-end">
        <Link to="/add-client">
          <button className="flex items-center justify-center p-2 md:pd-3 bg-buttonSecondary rounded-lg text-white cursor-pointer hover:bg-buttonSecondaryHover transition shadow-md">
            <CirclePlus className="mr-2 size-5 sm:size-6" />
            Añadir nuevo
          </button>
        </Link>
      </div>

      <section>
        <div className="mt-5 w-full">
          {allClients.length === 0 ? (
            <div className="text-center text-gray-600 text-lg">
              No hay clientes registrados
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead>
                  <tr className="bg-gray-100 text-gray-600 text-xs text-left">
                    <th className="py-2 px-6">Código De cliente</th>
                    <th className="py-2 px-6">Nombre de Cuenta</th>
                    <th className="py-2 px-6">RFC</th>
                    <th className="py-2 px-6">Número Interior</th>
                    <th className="py-2 px-6">Número Exterior</th>
                    <th className="py-2 px-6">Código Postal</th>
                    <th className="py-2 px-6">Calle</th>
                    <th className="py-2 px-6">Colonia</th>
                    <th className="py-2 px-6">Ciudad</th>
                    <th className="py-2 px-6">Municipio</th>
                    <th className="py-2 px-6">Estado</th>
                    <th className=""></th>
                  </tr>
                </thead>
                <tbody>
                  {currentOrders.map((client, index) => (
                    <tr
                      key={index}
                      className="border-t border-gray-200 text-xs"
                    >
                      <td className="px-6">{client.clientCode}</td>
                      <td className="px-6">{client.companyName}</td>
                      <td className="px-6">{client.Rfc}</td>
                      <td className="px-6">{client.interiorNumber}</td>
                      <td className="px-6">{client.externalNumber}</td>
                      <td className="px-6">{client.zipCode}</td>
                      <td className="px-6">{client.street}</td>
                      <td className="px-6">{client.suburb}</td>
                      <td className="px-6">{client.city}</td>
                      <td className="px-6">{client.municipality}</td>
                      <td className="px-6">{client.state}</td>
                      <td className="py-1">
                         <ButtonMenu
                          description="Ver y editar el cliente"
                          linkText="Ver cliente"
                          linkText2="Eliminar Cliente"
                          description2="Eliminar cliente del sistema"
                          to={`/client/${client._id}`}
                          onPress={() => handleDeleteClick(client)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {allClients.length >= 10 && (
                <div className="flex justify-between items-center mt-4 mb-4">
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
        </div>
      </section>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold mb-4">
              Confirmar eliminación del cliente
            </h3>
            <p>
              Escribe el nombre del cliente{" "}
              <strong>{clientToDelete.companyName}</strong> para confirmar:
            </p>
            <Input
              label="Nombre de cliente"
              type="text"
              variant={"underlined"}
              value={confirmationName}
              onChange={(e) => setConfirmationName(e.target.value)}
            />
            <div className="flex justify-end space-x-4 mt-4">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setConfirmationName("");
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

export default AllClientPage;
