import { CirclePlus } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useWorkOrder } from "../context/WorkOrderContext";

function ClientPage() {
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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTires = tires.slice(indexOfFirstItem, indexOfLastItem);

  // Total de páginas
  const totalPages = Math.ceil(tires.length / itemsPerPage);

  // Función para cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div className="px-4 lg:px-14 max-w-screen-2xl mx-auto ">
      <div className="text-center my-8">
        <h2 className="text-4xl font-semibold mb-2">Nuestros clientes</h2>
      </div>
      <div className="flex justify-end">
        <Link to="/add-client">
          <button className="flex p-3 bg-indigo-400 rounded-lg text-white cursor-pointer hover:bg-indigo-700 duration-500 hover:duration-500">
            <CirclePlus className="mr-2" />
            Añadir nuevo
          </button>
        </Link>
      </div>
      <section>
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
    </div>
  );
}

export default ClientPage;
