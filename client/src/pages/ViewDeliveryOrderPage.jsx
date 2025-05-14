import * as images from "../img";
import { useDeliveryOrder } from "../context/DeliveryOrderContext.jsx";
import { PDFDownloadLink } from "@react-pdf/renderer";
import DeliveryOrderPDF from "../components/PDF/DeliveryOrderPDF.jsx";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { StepBack, Check, X } from "lucide-react";

function ViewDeliveryOrderPage() {
  const { getDeliveryOrder } = useDeliveryOrder();
  const { id } = useParams();

  const [deliveryOrder, setDeliveryOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    async function loadDeliveryOrder() {
      try {
        if (id) {
          const order = await getDeliveryOrder(id);
          if (order) setDeliveryOrder(order);
        }
      } catch (error) {
        console.error(error);
      }
    }

    loadDeliveryOrder();
  }, [id]);

  if (!deliveryOrder) return <h1 className="text-center mt-10">Cargando orden...</h1>;

  const tires = deliveryOrder.tires || [];
  const totalPages = Math.ceil(tires.length / itemsPerPage);
  const currentOrders = tires.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="px-4 pt-4 lg:px-14 max-w-screen-2xl mx-auto select-none">
      <div className="flex items-center gap-3 mb-6">
        <Link to={`/allDeliveryOrders`}>
          <button className="bg-buttonPrimaryHover hover:bg-buttonPrimary shadow-md rounded-md px-4 py-1 duration-500 hover:duration-500">
            <StepBack color="white" />
          </button>
        </Link>
        <h1 className="text-2xl md:text-4xl font-bold">
          Imprimir Orden De Entrega
        </h1>
      </div>

      <header className="w-full mt-3 flex justify-center">
        <div className="w-full p-2 flex justify-between border-b-2 border-blue-600">
          <section>
            <h1 className="font-bold text-xl text-blue-700">
              Orden de Entrega: <span>{deliveryOrder.numero}</span>
            </h1>
            <p className="font-medium">VITA-BAJIO S.A de C.V</p>
            <p className="font-medium text-sm">
              Hidalgo 1500 San Juan de La Presa, Salamanca
            </p>
          </section>
          <section className="flex justify-end mr-2">
            <img
              src={images.logoVB}
              className="w-auto size-20 sm:size-auto sm:w-[45%]"
              alt="logo"
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
                    {deliveryOrder.createdBy.name}{" "}
                    {deliveryOrder.createdBy.lastName}
                  </span>
                </p>
                <p>
                  Fecha:{" "}
                  <span className="font-semibold">
                    {deliveryOrder.formattedCreatedAt}
                  </span>
                </p>
              </div>
            </article>
            <article className="sm:flex sm:justify-end sm:w-[50%]">
              <div>
                <h2>Envíe a:</h2>
                <div>
                  <p className="font-bold">
                    {deliveryOrder.client.companyName}
                  </p>
                  <div className="text-xs">
                    <p>{deliveryOrder.client.street}</p>
                    <p>
                      {deliveryOrder.client.state},{" "}
                      {deliveryOrder.client.city ||
                        deliveryOrder.client.municipality}
                    </p>
                    <p>{deliveryOrder.client.zipCode}</p>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section className="p-4 w-full">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead>
                <tr className="bg-blue-600 text-white text-sm text-center">
                  <th className="py-3">#</th>
                  <th className="py-3">Orden de trabajo</th>
                  <th className="py-3 px-6">Código de Ítem</th>
                  <th className="py-3 px-6">Código de Barras</th>
                  <th className="py-3 px-6">Medida de Casco</th>
                  <th className="py-3 px-6">Marca</th>
                  <th className="py-3 px-6">Modelo</th>
                  <th className="py-3 px-6">Quemado</th>
                  <th className="py-3 px-6">Banda aplicada</th>
                  <th className="py-3 px-6">DOT</th>
                  <th className="py-3 px-6">Status</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {currentOrders.map((tire, index) => (
                  <tr key={index} className="border-t border-gray-200 text-sm">
                    <td className="py-3 px-2 border-r-2">{tire.linea}</td>
                    <td className="py-3">{tire.workOrder.numero}</td>
                    <td className="py-3 px-6">{tire.itemCode}</td>
                    <td className="py-3 px-6">{tire.barCode}</td>
                    <td className="py-3 px-6">{tire.helmetMeasurement}</td>
                    <td className="py-3 px-6">{tire.brand}</td>
                    <td className="py-3 px-6">{tire.modelTire}</td>
                    <td className="py-3 px-6">{tire.serialNumber}</td>
                    <td className="py-3 px-6">
                      {tire.appliedBand || tire.appliedBandBandag || "-"}
                    </td>
                    <td className="py-3 px-6">{tire.antiquityDot}</td>
                    <td className="py-3 px-6">
                      {tire.status === "Rechazo" ? (
                        <div className="flex justify-center">
                          <X color="#ff0000" />
                        </div>
                      ) : tire.status === "Pasa" ? (
                        <div className="flex justify-center">
                          <Check color="#00bb00" />
                        </div>
                      ) : tire.status === "Sin Costo" ? (
                        "Sin Costo"
                      ) : (
                        "Falta Inspección"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

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
        </section>
         <div>
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
  );
}

export default ViewDeliveryOrderPage;