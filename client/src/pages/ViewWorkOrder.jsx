import * as images from "../img";
import { useWorkOrder } from "../context/WorkOrderContext.jsx";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { UserRoundPen, StepBack, Check, X } from "lucide-react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import WorkOrderPDF from "../components/PDF/WorkOrderPDF.jsx";
import { useAuth } from "../context/AuthContext";

function ViewWorkOrder() {
  const { getWorkOrderById } = useWorkOrder();
  const params = useParams();
  // const [dataWorkOrder, setDataWorkOrder] = useState();
  const [name, setName] = useState();
  const [lastName, setLastName] = useState();
  const [numero, setNumero] = useState();
  const [tires, setTires] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Mostrar 10 elementos por página
  const [date, setDate] = useState();
  const [workOrder, setWorkOrder] = useState();
  const [clientName, setNameClient] = useState();
  const [clientAddress, setClientAddress] = useState();
  const [clientRegion, setClientRegion] = useState();
  const [clientCity, setClientCity] = useState();
  const [clientZipCode, setClientZipCode] = useState();
  const [roleMaster, setRoleMaster] = useState();
  const [roleAdminP, setRoleAdminP] = useState();
  const { getRoles, user } = useAuth();
  const [workOrdersByUser, setWorkOrdersByUser] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const res = await getRoles();

      if (res) {
        for (const role of res) {
          if (role.name === "Master") {
            setRoleMaster(role._id);
          } else if (role.name === "AdministradorP") {
            setRoleAdminP(role._id);
          }
          // } else if (role.name === "Operador") {
          //   setRoleProduction(role._id);
          // } else if (role.name === "Vendedor") {
          //   setRoleSeller(role._id);
          // } else if (role.name === "Almacenista") {
          //   setRoleA(role._id);
          // }
        }
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    async function loadWorkOrder() {
      try {
        if (params.id) {
          const workOrder = await getWorkOrderById(params.id);
          if (workOrder) {
            setName(workOrder.createdBy.name);
            setLastName(workOrder.createdBy.lastName);
            setTires(workOrder.tires);
            setNumero(workOrder.numero);
            setDate(workOrder.formattedCreatedAt);
            setWorkOrder(workOrder);
            setNameClient(workOrder.client.name);
            setClientAddress(workOrder.client.address1);
            setClientRegion(workOrder.client.region);
            setClientCity(workOrder.client.city);
            setClientZipCode(workOrder.client.zipCode);
            // setStatus(workOrder.tires)
          }
          setWorkOrdersByUser(user.id || user._id);
        }
      } catch (error) {
        console.error(error);
      }
    }
    loadWorkOrder();
  }, []);

  // Validar datos y calcular total de páginas
  const totalPages = Math.ceil(tires.length / itemsPerPage);

  // Obtener los datos de la página actual
  const currentOrders = tires.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Cambiar de página
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (tires.length === 0) <h1>No hay Ordenes de trabajo</h1>;
  return (
    <>
      <div className="px-4 pt-4 lg:px-14 max-w-screen-2xl mx-auto select-none">
        <div className="flex items-center gap-3 mb-6">
          {user.role === roleMaster || user.role === roleAdminP ? (
            <Link to={`/workOrders`}>
              <button className="bg-buttonPrimaryHover hover:bg-buttonPrimary shadow-md rounded-md px-4 py-1 duration-500 hover:duration-500">
                <StepBack color="white" />
              </button>
            </Link>
          ) : (
            <Link to={`/workOrderByUser/${workOrdersByUser}`}>
              <button className="bg-buttonPrimaryHover hover:bg-buttonPrimary shadow-md rounded-md px-4 py-1 duration-500 hover:duration-500">
                <StepBack color="white" />
              </button>
            </Link>
          )}

          <h1 className="text-2xl md:text-4xl font-bold">Imprimir Orden</h1>
        </div>

        <header className="w-full mt-3 flex justify-center">
          <div className=" w-full p-2 flex justify-between border-b-2 border-blue-600 ">
            <section className="">
              <h1 className="font-bold text-xl text-blue-700">
                Orden de Entrega: <span>{numero}</span>
              </h1>
              <p className="font-medium">VITA-BAJIO S.A de C.V</p>
              <p className="font-medium text-sm">
                Hidalgo 1500 San Juan de La Presa, Salamanca
              </p>
            </section>
            <section className="flex justify-end mr-2 ">
              <img
                src={images.logoVB}
                className="w-auto size-20  sm:size-auto sm:w-[45%]"
                alt=""
              />
            </section>
          </div>
        </header>
        <main className="">
          <section className="mt-4">
            <div className="bg-gray-100 sm:flex sm:justify-evenly rounded p-3">
              <article className="sm:w-[50%]">
                <h2 className="text-lg font-semibold">
                  Detalles de la Recolección
                </h2>

                <div>
                  <p>
                    Recolector:{" "}
                    <span className="font-medium">
                      {name} {lastName}
                    </span>
                  </p>
                  <p>
                    Fecha: <span className="font-semibold">{date}</span>
                  </p>
                </div>
              </article>
              <article className="sm:flex sm:justify-end sm:w-[50%]">
                <div>
                  <h2>Envíe a:</h2>
                  <div>
                    <p className="font-bold">{clientName}</p>
                    <div className="text-xs">
                      <p>{clientAddress}</p>
                      <p>
                        {clientRegion}, {clientCity}
                      </p>
                      <p>{clientZipCode}</p>
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
                      <th className="py-3 px-6">Código de Ítem</th>
                      <th className="py-3 px-6">Código de Barras</th>
                      <th className="py-3 px-6">Medida de Casco</th>
                      <th className="py-3 px-6">Marca</th>
                      <th className="py-3 px-6">Banda Requerida</th>
                      <th className="py-3 px-6">DOT</th>
                      <th className="py-3 px-6">Estatus</th>
                      <th className="py-3 px-6"></th>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    {currentOrders.map((tire, index) => (
                      <tr key={index} className="border-t border-gray-200">
                        <td className="py-3 px-1">{tire.linea}</td>
                        <td className="py-3 px-6">{tire.itemCode}</td>
                        <td className="py-3 px-6">{tire.barCode}</td>
                        <td className="py-3 px-6">{tire.helmetMeasurement}</td>
                        <td className="py-3 px-6">{tire.brand}</td>
                        <td className="py-3 px-6">{tire.requiredBand}</td>
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
                          ) : (
                            "Falta Inspección"
                          )}
                        </td>
                        <td className="sm:flex py-2 px-3 justify-between">
                          {user.role === roleMaster ||
                          user.role === roleAdminP ? (
                            <Link to={`/tire/${tire._id}`}>
                              <button className="text-blue-600 hover:text-blue-800 ">
                                <UserRoundPen />
                              </button>
                            </Link>
                          ) : null}
                          {/* <Link to={`/tire/${tire._id}`}>
                            <button className="text-blue-600 hover:text-blue-800 ">
                              <UserRoundPen />
                            </button>
                          </Link> */}
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
          <div>
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
      </div>
    </>
  );
}

export default ViewWorkOrder;
