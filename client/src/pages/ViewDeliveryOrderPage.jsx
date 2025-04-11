import * as images from "../img";
import { useDeliveryOrder } from "../context/DeliveryOrderContext.jsx";
import { PDFDownloadLink } from "@react-pdf/renderer";
import DeliveryOrderPDF from "../components/PDF/DeliveryOrderPDF.jsx";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { StepBack } from "lucide-react";

function ViewDeliveryOrderPage() {
  const { getDeliveryOrder } = useDeliveryOrder();
  const params = useParams();
  const [tire, setTire] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Mostrar 10 elementos por página
  const [numero, setNumero] = useState();
  const [name, setName] = useState();
  const [lastName, setLastName] = useState();
  const [date, setDate] = useState();
  const [deliveryOrder, setDeliveryOrder] = useState();
  const [clientName, setNameClient] = useState();
  const [clientAddress, setClientAddress] = useState();
  const [clientRegion, setClientRegion] = useState();
  const [clientCity, setClientCity] = useState();
  const [clientZipCode, setClientZipCode] = useState();

  // Validar datos y calcular total de páginas
  const totalPages = Math.ceil(tire.length / itemsPerPage);

  // Obtener los datos de la página actual
  const currentOrders = tire.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Cambiar de página
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (tire.length === 0) <h1>No hay registros</h1>;

  useEffect(() => {
    async function loadDeliveryOrder() {
      try {
        if (params.id) {
          const deliveryOrder = await getDeliveryOrder(params.id);
          if (deliveryOrder) {
            setTire(deliveryOrder.tires);
            setNumero(deliveryOrder.numero);
            setName(deliveryOrder.createdBy.name);
            setLastName(deliveryOrder.createdBy.lastName);
            setDeliveryOrder(deliveryOrder);
            setDate(deliveryOrder.formattedCreatedAt);
            setNameClient(deliveryOrder.client.name);
            setClientAddress(deliveryOrder.client.address1);
            setClientRegion(deliveryOrder.client.region);
            setClientCity(deliveryOrder.client.city);
            setClientZipCode(deliveryOrder.client.zipCode);
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
    loadDeliveryOrder();
  }, []);

  return (
    <>
      <div className="px-4 pt-4 lg:px-14 max-w-screen-2xl mx-auto select-none">
        <div className="flex items-center gap-3 mb-6">
          <Link to={`/allDeliveryOrders`}>
            <button className="bg-buttonPrimaryHover hover:bg-buttonPrimary shadow-md rounded-md px-4 py-1 duration-500 hover:duration-500">
              <StepBack color="white" />
            </button>
          </Link>

          <h1 className="text-2xl md:text-4xl font-bold">Imprimir Orden De Entrega</h1>
        </div>
        {/* <div>
          <Link to={`/allDeliveryOrders`}>
            <button className="bg-cyan-950 rounded-md px-4 py-1 duration-500 hover:bg-cyan-800 hover:duration-500">
              <StepBack color="white" />
            </button>
          </Link>
        </div> */}
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
        <main>
          <section className="mt-4">
            <div className="bg-gray-100 sm:flex sm:justify-evenly rounded p-3">
              <article className="sm:w-[50%]">
                <h2 className="text-lg font-semibold">
                  Detalles de la Recolección
                </h2>

                <div>
                  <p>
                    Conductor:{" "}
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
                      <th className="py-3 flex-1"></th>
                      <th className="py-3 flex-1 text-center">
                        Orden de trabajo
                      </th>
                      <th className="py-3 px-6">Código de Ítem</th>
                      <th className="py-3 px-6">Código de Barras</th>
                      <th className="py-3 px-6">Estado</th>
                      <th className="py-3 px-6">Medida de Casco</th>
                      <th className="py-3 px-6">Marca</th>
                      <th className="py-3 px-6">Banda aplicada</th>
                      <th className="py-3 px-6">DOT</th>
                      {/* <th className="py-3 px-6"></th> */}
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    {currentOrders.map((tire, index) => (
                      <tr key={index} className="border-t border-gray-200">
                        <td className="py-3 px-2">{tire.linea}</td>
                        <td className="py-3 px-6 flex-1">
                          {tire.workOrder.numero}
                        </td>
                        <td className="py-3 px-6">{tire.itemCode}</td>
                        <td className="py-3 px-6">{tire.barCode}</td>
                        <td className="py-3 px-6">{tire.status}</td>
                        <td className="py-3 px-6">{tire.helmetMeasurement}</td>
                        <td className="py-3 px-6">{tire.brand}</td>
                        <td className="py-3 px-6">
                          {tire.appliedBand || tire.appliedBandBandag || "-"}
                        </td>
                        <td className="py-3 px-6">{tire.antiquityDot}</td>
                        {/* <td className="sm:flex py-2 px-3 justify-between">
                              <Link to={`/tire/${tire._id}`}>
                                <button className="text-blue-600 hover:text-blue-800 ">
                                  <UserRoundPen />
                                </button>
                              </Link>
                            </td> */}
                      </tr>
                    ))}
                  </tbody>
                </table>
                {/* Mostrar paginación solo si hay 10 o más usuarios */}
                {tire.length >= 10 && (
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
            {deliveryOrder && (
              <PDFDownloadLink
                document={<DeliveryOrderPDF deliveryOrder={deliveryOrder} />}
                fileName={`OrdenEntrega_${deliveryOrder.numero}.pdf`}
              >
                {({ loading }) =>
                  loading ? (
                    "Generando PDF..."
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

export default ViewDeliveryOrderPage;
