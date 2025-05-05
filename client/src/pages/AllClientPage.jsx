import { CirclePlus, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useClient } from "../context/ClientContext";
import Alert from "../components/ui/Alert"; // Importa tu componente de alerta
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Input,
  cn,
} from "@heroui/react";

export const DeleteDocumentIcon = (props) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M21.07 5.23c-1.61-.16-3.22-.28-4.84-.37v-.01l-.22-1.3c-.15-.92-.37-2.3-2.71-2.3h-2.62c-2.33 0-2.55 1.32-2.71 2.29l-.21 1.28c-.93.06-1.86.12-2.79.21l-2.04.2c-.42.04-.72.41-.68.82.04.41.4.71.82.67l2.04-.2c5.24-.52 10.52-.32 15.82.21h.08c.38 0 .71-.29.75-.68a.766.766 0 0 0-.69-.82Z"
        fill="currentColor"
      />
      <path
        d="M19.23 8.14c-.24-.25-.57-.39-.91-.39H5.68c-.34 0-.68.14-.91.39-.23.25-.36.59-.34.94l.62 10.26c.11 1.52.25 3.42 3.74 3.42h6.42c3.49 0 3.63-1.89 3.74-3.42l.62-10.25c.02-.36-.11-.7-.34-.95Z"
        fill="currentColor"
        opacity={0.399}
      />
      <path
        clipRule="evenodd"
        d="M9.58 17a.75.75 0 0 1 .75-.75h3.33a.75.75 0 0 1 0 1.5h-3.33a.75.75 0 0 1-.75-.75ZM8.75 13a.75.75 0 0 1 .75-.75h5a.75.75 0 0 1 0 1.5h-5a.75.75 0 0 1-.75-.75Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};

export const EditDocumentIcon = (props) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M15.48 3H7.52C4.07 3 2 5.06 2 8.52v7.95C2 19.94 4.07 22 7.52 22h7.95c3.46 0 5.52-2.06 5.52-5.52V8.52C21 5.06 18.93 3 15.48 3Z"
        fill="currentColor"
        opacity={0.4}
      />
      <path
        d="M21.02 2.98c-1.79-1.8-3.54-1.84-5.38 0L14.51 4.1c-.1.1-.13.24-.09.37.7 2.45 2.66 4.41 5.11 5.11.03.01.08.01.11.01.1 0 .2-.04.27-.11l1.11-1.12c.91-.91 1.36-1.78 1.36-2.67 0-.9-.45-1.79-1.36-2.71ZM17.86 10.42c-.27-.13-.53-.26-.77-.41-.2-.12-.4-.25-.59-.39-.16-.1-.34-.25-.52-.4-.02-.01-.08-.06-.16-.14-.31-.25-.64-.59-.95-.96-.02-.02-.08-.08-.13-.17-.1-.11-.25-.3-.38-.51-.11-.14-.24-.34-.36-.55-.15-.25-.28-.5-.4-.76-.13-.28-.23-.54-.32-.79L7.9 10.72c-.35.35-.69 1.01-.76 1.5l-.43 2.98c-.09.63.08 1.22.47 1.61.33.33.78.5 1.28.5.11 0 .22-.01.33-.02l2.97-.42c.49-.07 1.15-.4 1.5-.76l5.38-5.38c-.25-.08-.5-.19-.78-.31Z"
        fill="currentColor"
      />
    </svg>
  );
};

function AllClientPage() {
  const { getClients, allClients, deleteClient } = useClient();
  const [currentPage, setCurrentPage] = useState(1);
  const [alert, setAlert] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clientToDelete, setClientToDelete] = useState(null);
  const [confirmationName, setConfirmationName] = useState("");
  const itemsPerPage = 10; // Mostrar 10 elementos por página
  const iconClasses =
    "text-xl text-default-500 pointer-events-none flex-shrink-0";

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

  const showAlert = (message, type = "success") => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 1000);
  };

  const handleDeleteClick = (client) => {
    setClientToDelete(client);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    if (confirmationName === clientToDelete.companyName) {
      try {
        await deleteClient(clientToDelete._id);
        showAlert("Cliente eliminado exitosamente", "success");
        getClients(); // Refresca la lista de clientes
      } catch (error) {
        console.error(error);
        showAlert("Error al eliminar el cliente. Intenta nuevamente.", "error");
      }
      setIsModalOpen(false);
      setClientToDelete(null);
      setConfirmationName("");
    } else {
      showAlert("El nombre no coincide. Cliente no eliminado.", "error");
    }
  };

  return (
    <div className="px-4 lg:px-14 mx-auto select-none">
      <div className="text-center my-8">
        <h2 className="md:text-4xl flex justify-center font-bold mb-3 text-2xl">
          Cuentas Locales
        </h2>
        {/* Alerta */}
        {alert && <Alert message={alert.message} type={alert.type} />}
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
                        <Dropdown>
                          <DropdownTrigger>
                            <Button variant="bordered"><Menu/></Button>
                          </DropdownTrigger>
                          <DropdownMenu
                            aria-label="Dropdown menu with description"
                            variant="faded"
                          >
                            <DropdownItem
                              key="edit"
                              showDivider
                              description="Ver y editar cliente"
                              // startContent={
                              // }
                            >
                              <Link
                                to={`/client/${client._id}`}
                                className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                              >
                                <EditDocumentIcon className={cn(iconClasses, "text-primary")} />
                                Ver Cliente
                              </Link>
                            </DropdownItem>
                            <DropdownItem
                              key="delete"
                              className="text-danger flex items-center gap-2"
                              color="danger"
                              onClick={() => handleDeleteClick(client)}
                              description="Eliminar cliente de la BD"
                              startContent={
                                <DeleteDocumentIcon
                                  className={cn(iconClasses, "text-danger")}
                                />
                              }
                            >
                              Eliminar Cliente
                            </DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {allClients.length >= 10 && (
                <div className="flex justify-between items-center mt-4 ">
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
