import { useWorkOrder } from "../context/WorkOrderContext.jsx";
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { UserRoundPen, StepBack, Trash2, Check, X } from "lucide-react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import WorkOrderPDF from "../components/PDF/WorkOrderPDF.jsx";
import { useAuth } from "../context/AuthContext";
import { useTire } from "../context/TireContext.jsx";
import socket from "../socket";

function ViewWorkOrder() {
  const { getWorkOrderById, closeWorkOrder, reOpenWorkOrder } = useWorkOrder();
  const params = useParams();
  const { getRoles, user } = useAuth();
  const { deleteTire } = useTire();

  const [workOrder, setWorkOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [roleMaster, setRoleMaster] = useState();
  const [roleAdminP, setRoleAdminP] = useState();
  const [roleAdminF, setRoleAdminF] = useState();
  const [roleSeller, setRoleSeller] = useState();

  const [showModal, setShowModal] = useState(false);
  const [tireToDelete, setTireToDelete] = useState(null);
  const [confirmationText, setConfirmationText] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const res = await getRoles();

      if (res) {
        for (const role of res) {
          if (role.name === "Master") {
            setRoleMaster(role._id);
          } else if (role.name === "AdministradorP") {
            setRoleAdminP(role._id);
          } else if (role.name === "AdministradorF") {
            setRoleAdminF(role._id);
          } else if (role.name === "Vendedor") {
            setRoleSeller(role._id);
          }
          // else if (role.name === "Almacenista") {
          //   setRoleA(role._id);
          // }
        }
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    async function loadWorkOrder() {
      if (params.id) {
        try {
          const fetchedWorkOrder = await getWorkOrderById(params.id);
          setWorkOrder(fetchedWorkOrder);
        } catch (error) {
          console.error(error);
        }
      }
    }
    loadWorkOrder();
  }, [params.id, getWorkOrderById]);

  const tires = workOrder?.tires || [];
  const totalPages = Math.ceil(tires.length / itemsPerPage);
  const currentOrders = tires.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const openDeleteModal = (tireId) => {
    setTireToDelete(tireId);
    setShowModal(true);
    setConfirmationText("");
  };

  const handleConfirmDelete = async () => {
    if (confirmationText.toLowerCase() === "si" && tireToDelete) {
      await deleteTire(tireToDelete);
      setShowModal(false);
      setTireToDelete(null);

      // Refrescar orden de trabajo
      const updatedWorkOrder = await getWorkOrderById(params.id);
      setWorkOrder(updatedWorkOrder);
    } else {
      alert("Escribe 'si' para confirmar.");
    }
  };

  const handleOpenWorkOrder = async () => {
    try {
      await reOpenWorkOrder({ workOrderId: workOrder._id });
      navigate("/add-tire");
    } catch (error) {
      console.error("Error al reabrir la orden:", error.message);
    }
  };

  const handleClick = async () => {
    try {
      if (!user || !user.name) {
        console.error("No se encontró el usuario");
        return;
      }

      await closeWorkOrder({
        socketId: socket.id,
        username: user.name,
      });

      console.log(`Orden de trabajo cerrada por: ${user.name}`);

      navigate(-1); // 👈 Ir una página atrás
    } catch (error) {
      console.error("Error al cerrar la orden de trabajo:", error.message);
    }
  };

  if (!workOrder)
    return <h1 className="text-center mt-10">Cargando orden de trabajo...</h1>;

  const { numero, formattedCreatedAt, createdBy, client } = workOrder;

  if (tires.length === 0) <h1>No hay Ordenes de trabajo</h1>;

  return (
    <div className="px-4 pt-4 lg:px-14 max-w-screen-2xl mx-auto select-none">
      <div className="flex items-center gap-3 mb-6">
        {user.role === roleMaster ||
        user.role === roleAdminP ||
        user.role === roleAdminF ? (
          <Link to="/workOrders">
            <button className="bg-buttonPrimaryHover hover:bg-buttonPrimary shadow-md rounded-md px-4 py-1 duration-500">
              <StepBack color="white" />
            </button>
          </Link>
        ) : (
          <Link to={`/workOrderByUser/${user.id || user._id}`}>
            <button className="bg-buttonPrimaryHover hover:bg-buttonPrimary shadow-md rounded-md px-4 py-1 duration-500">
              <StepBack color="white" />
            </button>
          </Link>
        )}
        <h1 className="text-2xl md:text-4xl font-bold">Imprimir Orden</h1>
      </div>

      {user.role === roleMaster ||
      user.role === roleAdminP ||
      user.role === roleSeller ? (
        <>
          {workOrder?.isOpen ? (
            <div className="flex justify-end flex-col md:flex-row my-4">
              <button
                className="bg-buttonTertiary hover:bg-buttonTertiaryHover text-white mt-2 sm:mt-0 sm:ml-4 font-medium py-2 px-5 rounded-md shadow-md duration-500 hover:duration-500"
                onClick={handleClick}
              >
                Cerrar orden
              </button>

              <Link to={`/add-tire`}>
                <button className="bg-buttonSecondary text-white cursor-pointer hover:bg-buttonSecondaryHover transition mt-2 sm:mt-0 sm:ml-4 font-medium py-2 px-5 rounded-md shadow-md duration-500 hover:duration-500">
                  Agregar llantas
                </button>
              </Link>
            </div>
          ) : (
            <div className="flex justify-end my-4">
              <button
                className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-5 rounded-md shadow-md duration-500"
                onClick={handleOpenWorkOrder}
              >
                Abrir orden
              </button>
            </div>
          )}
        </>
      ) : null}

      <main>
        <section className="mt-4">
          <div className="bg-gray-100 sm:flex sm:justify-evenly rounded p-3">
            <article className="sm:w-[50%]">
              <h2 className="text-lg font-semibold">
                Detalles de la Recolección
              </h2>
              <div>
                <p className="font-semibold text-xl text-blue-700">
                  Orden de Trabajo: <span className="font-bold">{numero}</span>
                </p>
                <p>
                  Recolector:{" "}
                  <span className="font-medium">
                    {createdBy?.name} {createdBy?.lastName}
                  </span>
                </p>
                <p>
                  Fecha:{" "}
                  <span className="font-semibold">{formattedCreatedAt}</span>
                </p>
              </div>
            </article>
            <article className="sm:flex sm:justify-end sm:w-[50%]">
              <div>
                <h2>Envíe a:</h2>
                <div>
                  <p className="font-bold">{client?.companyName}</p>
                  <div className="text-xs">
                    <p>{client?.street}</p>
                    <p>
                      {client?.state}, {client?.city || client?.municipality}
                    </p>
                    <p>{client?.zipCode}</p>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section>
          <div className="p-4 w-full">
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead>
                  <tr className="bg-blue-600 text-white text-sm text-center">
                    <th className="py-3 px-1">Línea</th>
                    <th className="py-3 px-3">Código de Ítem</th>
                    <th className="py-3 px-6">Código de Barras</th>
                    <th className="py-3 px-6">Medida de Casco</th>
                    <th className="py-3 px-6">Marca</th>
                    <th className="py-3 px-6">Modelo</th>
                    <th className="py-3 px-6">Banda Requerida</th>
                    <th className="py-3 px-6">Quemado</th>
                    <th className="py-3 px-6">DOT</th>
                    <th className="py-3 px-6">Estatus</th>
                    <th className="py-3 px-6"></th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {currentOrders.map((tire, index) => (
                    <tr key={index} className="border-t border-gray-200">
                      <td className="py-3 px-1">{tire.linea}</td>
                      <td className="py-3 px-3">{tire.itemCode}</td>
                      <td className="py-3 px-6">{tire.barCode}</td>
                      <td className="py-3 px-6">{tire.helmetMeasurement}</td>
                      <td className="py-3 px-6">{tire.brand}</td>
                      <td className="py-3 px-6">{tire.modelTire}</td>
                      <td className="py-3 px-6">{tire.requiredBand}</td>
                      <td className="py-3 px-6">{tire.serialNumber}</td>
                      <td className="py-3 px-6">{tire.antiquityDot}</td>
                      <td className=" text-center">
                        {tire.status === "Rechazo" ? (
                          <div className="flex justify-center">
                            <X color="#ff0000" />
                          </div>
                        ) : tire.status === "Pasa" ? (
                          <div className="flex justify-center">
                            <Check color="#ff0000" />
                          </div>
                        ) : tire.status === "Sin Costo" ? (
                          "Sin Costo"
                        ) : (
                          "Falta Inspección"
                        )}
                      </td>
                      <td className="py-3 px-6">
                        {user.role === roleMaster ||
                        user.role === roleAdminP ? (
                          <>
                            <Link to={`/editTireAdminPage/${tire._id}`}>
                              <button className="text-blue-600 hover:text-blue-800 md:mr-2">
                                <UserRoundPen />
                              </button>
                            </Link>

                            <button
                              onClick={() => openDeleteModal(tire._id)}
                              className="text-red-600 hover:text-red-800 md:ml-2"
                            >
                              <Trash2 />
                            </button>
                          </>
                        ) : user.role === roleSeller ? (
                          <>
                            <Link to={`/editTireSeller/${tire._id}`}>
                              <button className="text-blue-600 hover:text-blue-800 md:mr-2">
                                <UserRoundPen />
                              </button>
                            </Link>

                            <button
                              onClick={() => openDeleteModal(tire._id)}
                              className="text-red-600 hover:text-red-800 md:ml-2"
                            >
                              <Trash2 />
                            </button>
                          </>
                        ) : null}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* Mostrar paginación solo si hay 10 o más usuarios */}
              {tires.length >= 10 && (
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
        <div className="mb-10">
          {/* Tu diseño actual */}
          {workOrder && (
            <PDFDownloadLink
              document={<WorkOrderPDF workOrder={workOrder} />}
              fileName={`OrdenTrabajo_${workOrder.numero}.pdf`}
            >
              {({ loading }) =>
                loading ? (
                  <button className="flex mt-2 sm:mt-0 shadow p-2 text-sm sm:text-base sm:p-3 bg-red-400 rounded-lg text-white cursor-pointer hover:bg-red-600 duration-500 hover:duration-500">
                    Generando PDF...
                  </button>
                ) : (
                  <button className="flex mt-2 sm:mt-0 shadow p-2 text-sm sm:text-base sm:p-3 bg-red-400 rounded-lg text-white cursor-pointer hover:bg-red-600 duration-500 hover:duration-500">
                    Descargar PDF
                  </button>
                )
              }
            </PDFDownloadLink>
          )}
        </div>
      </main>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Confirmar eliminación</h2>
            <p className="mb-2">
              ¿Estás seguro de que deseas eliminar esta llanta?
            </p>
            <p className="mb-2 text-sm ">
              Escribe <span className="font-bold">si</span> para confirmar:
            </p>
            <input
              type="text"
              value={confirmationText}
              onChange={(e) => setConfirmationText(e.target.value)}
              className="w-full border px-3 py-2 rounded mb-4"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
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

export default ViewWorkOrder;
