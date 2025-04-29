import { useEffect, useState } from "react";
import { useTire } from "../context/TireContext";

function QuotesTiresPage() {
  const { getQuoteTires, tires } = useTire();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Mostrar 10 elementos por página

  useEffect(() => {
    getQuoteTires();
  }, []);

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

  if (tires.length === 0) {
    return (
      <div className="px-4 pt-4 lg:px-14 max-w-screen-2xl mx-auto select-none">
        <div className="text-center my-8">
          <h2 className="md:text-4xl flex justify-center font-bold mb-3 text-2xl">
            Llantas a facturar
          </h2>
        </div>
        <div className="flex items-center justify-center h-64">
          <h1 className="text-2xl font-bold text-gray-500">No hay registros</h1>
        </div>
      </div>
    );
  }
  //   if (tires.length === 0) <h1>No hay registros</h1>;

  return (
    <>
      <div className="px-4 pt-4 lg:px-14 max-w-screen-2xl mx-auto select-none">
      <div className="text-center my-8">
          <h2 className="md:text-4xl flex justify-center font-bold mb-3 text-2xl">
            Llantas a facturar
          </h2>
        </div>
        <main>
          <section>
            <div className="p-4 w-full">
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                  <thead className="bg-blue-600 text-white text-xs sm:text-sm">
                    <tr>
                      <th className="py-3 px-4 text-center font-medium">#</th>
                      <th className="py-3 px-4 text-center font-medium">
                        Orden de trabajo
                      </th>
                      <th className="py-3 px-4 font-medium">Código de Ítem</th>
                      <th className="py-3 px-4 font-medium">
                        Código de Barras
                      </th>
                      <th className="py-3 px-4 font-medium">Medida de Casco</th>
                      <th className="py-3 px-4 font-medium">Marca</th>
                      <th className="py-3 px-4 font-medium">Banda aplicada</th>
                      <th className="py-3 px-4 font-medium">DOT</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 text-center text-xs sm:text-sm">
                    {currentOrders.map((tire, index) => (
                      <tr
                        key={index}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="py-3 px-4">{tire.linea}</td>
                        <td className="py-3 px-4">{tire.workOrder.numero}</td>
                        <td className="py-3 px-4">{tire.itemCode}</td>
                        <td className="py-3 px-4">{tire.barCode}</td>
                        <td className="py-3 px-4">{tire.helmetMeasurement}</td>
                        <td className="py-3 px-4">{tire.brand}</td>
                        <td className="py-3 px-4">
                          {tire.appliedBand || tire.appliedBandBandag || "-"}
                        </td>
                        <td className="py-3 px-4">{tire.antiquityDot}</td>
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
        </main>
      </div>
    </>
  );
}

export default QuotesTiresPage;
