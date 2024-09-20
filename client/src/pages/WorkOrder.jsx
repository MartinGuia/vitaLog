import * as images from "../img";
import { useWorkOrder } from "../context/WorkOrderContext";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function WorkOrder() {
  const { getWorkOrderById } = useWorkOrder();
  const params = useParams();
  // const [dataWorkOrder, setDataWorkOrder] = useState();
  const [name, setName] = useState();
  const [lastName, setLastName] = useState();

  const [tires, setTires] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Mostrar 10 elementos por página

  useEffect(() => {
    async function loadWorkOrder() {
      try {
        if (params.id) {
          const workOrder = await getWorkOrderById(params.id);
          if (workOrder) {
            setName(workOrder.createdBy.name);
            setLastName(workOrder.createdBy.lastName);
            setTires(workOrder.tires);
            // setDataWorkOrder(getWorkOrderById(workOrder.data));
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
    loadWorkOrder();
  }, []);

  // Calcular los elementos para la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTires = tires.slice(indexOfFirstItem, indexOfLastItem);

  // Total de páginas
  const totalPages = Math.ceil(tires.length / itemsPerPage);

  // Función para cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // if (workOrders.length === 0) <h1>No hay Ordenes de trabajo</h1>;
  return (
    // <>
    //   <div>Hola</div>
    // </>
    <>
      <div>
        <header className="w-full mt-3 flex justify-center">
          <div className=" w-[95%] p-2 flex justify-between bg-slate-200 border-l-8 border-black rounded-md">
            <section className="ml-2">
              <h1 className="font-bold text-xl">
                Número de orden de trabajo #
              </h1>
              <p className="font-medium">VITA-BAJIO S.A de C.V</p>
              <p className="font-medium text-sm">VITA-BAJIO S.A de C.V</p>
            </section>
            <section className="flex justify-end mr-2">
              <img src={images.logoVB} className="w-[45%]" alt="" />
            </section>
          </div>
        </header>
        <main className="">
          <section className="mt-4 flex justify-center">
            <div className="flex justify-between w-[95%]">
              <article className="w-[33.3%] text-sm">
                <div className="flex">
                  <p className="">Cuenta: </p>
                  <p className="font-bold ml-2">VITA-BAJIO</p>
                </div>
                <div className="mt-2">
                  <p className="flex">
                    Ubicación:
                    <span className="font-bold ml-2">Salamanca () (L)</span>
                  </p>
                  <p className="font-bold">
                    Hidalgo 1500 San Juan de La Presa, Salamanca
                  </p>
                  <p className="font-bold">Salamanca 36770</p>
                </div>
                <p className="flex mt-2">
                  Recolector:
                  <span className="font-bold ml-2">
                    {name} {lastName}
                  </span>
                </p>
              </article>
              <article className="w-[33.3%] text-sm">
                <p className="mt-2">Fecha de recolección:</p>
                <p className="mt-2">Fecha de solicitud de entrega:</p>
                <p className="mt-2">Ref #:</p>
              </article>
              <article className="w-[33.3%] text-sm">
                <p className="flex">
                  Desecho dejado en la ubicación:{" "}
                  <span className="font-bold ml-2">Sí</span>
                </p>
              </article>
            </div>
          </section>
          {/* <p className="flex mt-2 ml-10">
            Recolector:
            <span className="font-bold ml-2">
              {dataWorkOrder.createdBy.name} {dataWorkOrder.createdBy.lastName}
            </span>
          </p> */}
          <section className="mt-4">
            <div className="p-4 w-full">
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                  <thead>
                    <tr className="bg-gray-100 text-gray-600 text-sm uppercase text-left">
                      <th className="py-3 px-6">Línea</th>
                      <th className="py-3 px-6">Código de Ítem</th>
                      <th className="py-3 px-6">Medida de Casco</th>
                      <th className="py-3 px-6">Marca</th>
                      <th className="py-3 px-6">Diseño de Casco</th>
                      <th className="py-3 px-6">Banda Requerida</th>
                      <th className="py-3 px-6">DOT</th>
                      <th className="py-3 px-6">Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentTires.map((tire, index) => (
                      <tr
                        key={index}
                        className="border-t border-gray-200 hover:bg-gray-50"
                      >
                        <td className="py-3 px-6">{tire.linea}</td>
                        <td className="py-3 px-6">{tire.itemCode}</td>
                        <td className="py-3 px-6">{tire.helmetMeasurement}</td>
                        <td className="py-3 px-6">{tire.brand}</td>
                        <td className="py-3 px-6">{tire.helmetDesign}</td>
                        <td className="py-3 px-6">{tire.requiredBand}</td>
                        <td className="py-3 px-6">{tire.antiquityDot}</td>
                        <td className="py-3 px-6">
                          {tire.state ? "Activo" : "Inactivo"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {/* Paginación */}
                <div className="flex justify-between items-center mt-4">
                  <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 bg-gray-200 rounded-lg ${
                      currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    Anterior
                  </button>
                  <span>
                    Página {currentPage} de {totalPages}
                  </span>
                  <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 bg-gray-200 rounded-lg ${
                      currentPage === totalPages
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    Siguiente
                  </button>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

export default WorkOrder;
