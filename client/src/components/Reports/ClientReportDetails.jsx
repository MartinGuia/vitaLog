import PaginatedTable from "../ui/PaginatedTable";
import ClientBandUsage from "../Reports/ClientBandUsage";
import TireMeasurementChart from "../Reports/TireMeasurementChart";
import ClientBrandUsageBarChart from "../Reports/ClientBrandUsageBarChart";
import ClientModelUsageBarChart from "../Reports/ClientModelUsageBarChart";
import ClientRejectionReasonsChart from "../Reports/ClientRejectionReasonsChart";

const ClientReportDetails = ({
  reportData,
  currentPage,
  rowsPerPage,
  onPageChange,
}) => {
  if (!reportData) return null;

  const tableColumns = [
    { key: "orderNumber", label: "O.T." },
    { key: "barCode", label: "Código de Barras" },
    { key: "serialNumber", label: "Quemado" },
    { key: "appliedBand", label: "Banda aplicada" },
    { key: "brand", label: "Marca" },
    { key: "helmetMeasurement", label: "Medida" },
    { key: "patch", label: "Reparaciones" },
    { key: "antiquityDot", label: "DOT" },
    { key: "status", label: "Estado" },
    { key: "rejection", label: "Rechazo" },
  ];

  const bandagBands = reportData.mostUsedBandagBands?.map((b) => ({
    ...b,
    ventas: Number(b.ventas),
  }));

  const continentalBands = reportData.mostUsedContinentalBands?.map((b) => ({
    ...b,
    ventas: Number(b.ventas),
  }));

  return (
    <div className="mt-6 space-y-10">
      {/* Encabezado del cliente */}
      <header className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          {reportData.clientName}
        </h2>
        <div className="mt-2 text-sm sm:flex sm:justify-between">
          <p>
            Total de órdenes:{" "}
            <span className="font-medium">{reportData.totalOrders}</span>
          </p>
          <p>
            Total de llantas:{" "}
            <span className="font-medium">{reportData.totalTires}</span>
          </p>
          <p>
            Total de rechazos:{" "}
            <span className="font-medium">{reportData.totalRejections}</span>
          </p>
          <p>
            Llantas procesadas con éxito:{" "}
            <span className="font-medium">
              {reportData.totalTires - reportData.totalRejections}
            </span>
          </p>
        </div>
      </header>

      {/*  Contenedor exclusivo para las gráficas */}
      <div id="chart-capture-area" className="space-y-10">
        {/* Gráficas de bandas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="w-full">
            {bandagBands?.length > 0 && (
              <ClientBandUsage
                title="Bandas Bandag más utilizadas"
                data={bandagBands}
              />
            )}
          </div>

          <div className="w-full">
            {continentalBands?.length > 0 && (
              <ClientBandUsage
                title="Bandas Continental más utilizadas"
                data={continentalBands}
              />
            )}
          </div>
        </div>

        {/* Otras gráficas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <TireMeasurementChart
            title="Medidas de llantas más usadas"
            data={reportData.tireMeasurementsUsed}
          />
          <ClientBrandUsageBarChart
            title="Top 10 marcas utilizadas"
            data={reportData.mostUsedBrands}
          />
          <ClientModelUsageBarChart
            title="Top 10 modelos utilizados"
            data={reportData.mostUsedModels}
          />
        </div>
      </div>

      <div className="w-full" id="rejection-chart-capture">
        <ClientRejectionReasonsChart
          title="Motivos de Rechazo"
          data={reportData.rejectionReasons}
        />
      </div>

      {/* Tabla fuera del contenedor que se captura */}
      {reportData.tires?.length > 0 && (
        <PaginatedTable
          columns={tableColumns}
          items={reportData.tires}
          totalItems={reportData.tires.length}
          isLoading={false}
          page={currentPage}
          rowsPerPage={rowsPerPage}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
};

export default ClientReportDetails;
