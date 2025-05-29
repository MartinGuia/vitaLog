import { useState, useEffect } from "react";
import { useClient } from "../context/ClientContext";
import { DateInput } from "@heroui/react";
import { CalendarDate } from "@internationalized/date";
import CardComponent from "../components/ui/CardComponent";
import AlertComponent from "../components/ui/AlertComponent";
import PaginatedTable from "../components/ui/PaginatedTable";
import { Link } from "react-router-dom";
import { StepBack } from "lucide-react";

const CalendarIcon = (props) => (
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
      d="M7.75 2.5a.75.75 0 0 0-1.5 0v1.58c-1.44.115-2.384.397-3.078 1.092c-.695.694-.977 1.639-1.093 3.078h19.842c-.116-1.44-.398-2.384-1.093-3.078c-.694-.695-1.639-.977-3.078-1.093V2.5a.75.75 0 0 0-1.5 0v1.513C15.585 4 14.839 4 14 4h-4c-.839 0-1.585 0-2.25.013z"
      fill="currentColor"
    />
    <path
      clipRule="evenodd"
      d="M2 12c0-.839 0-1.585.013-2.25h19.974C22 10.415 22 11.161 22 12v2c0 3.771 0 5.657-1.172 6.828C19.657 22 17.771 22 14 22h-4c-3.771 0-5.657 0-6.828-1.172C2 19.657 2 17.771 2 14zm15 2a1 1 0 1 0 0-2a1 1 0 0 0 0 2m0 4a1 1 0 1 0 0-2a1 1 0 0 0 0 2m-4-5a1 1 0 1 1-2 0a1 1 0 0 1 2 0m0 4a1 1 0 1 1-2 0a1 1 0 0 1 2 0m-6-3a1 1 0 1 0 0-2a1 1 0 0 0 0 2m0 4a1 1 0 1 0 0-2a1 1 0 0 0 0 2"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);

const ReportByClientPage = () => {
  const { getClientReport, allClients, getClients } = useClient();
  const [formState, setFormState] = useState({
    clientId: "",
    startDate: null,
    endDate: null,
  });
  const [reportData, setReportData] = useState(null);
  const [alertData, setAlertData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 8; // 8 llantas por página como solicitaste

  useEffect(() => {
    getClients();
  }, []);

  const formatDate = (calendarDate) => {
    if (!calendarDate) return "";
    return `${calendarDate.year}-${String(calendarDate.month).padStart(
      2,
      "0"
    )}-${String(calendarDate.day).padStart(2, "0")}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formState.clientId || !formState.startDate || !formState.endDate) {
      setAlertData({
        title: "¡Error!",
        description: "Debes completar todos los campos obligatorios.",
        color: "danger",
      });
      return;
    }

    const formattedStart = formatDate(formState.startDate);
    const formattedEnd = formatDate(formState.endDate);

    try {
      const report = await getClientReport({
        clientId: formState.clientId,
        startDate: formattedStart,
        endDate: formattedEnd,
      });
      setReportData(report);
      setCurrentPage(1); // Resetear a la primera página al cargar nuevos datos
    } catch (error) {
      setAlertData({
        title: "Error",
        description: "Ocurrió un error al generar el reporte.",
        color: "danger",
      });
    }
  };

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

  return (
    <div className="md:px-8 px-3 py-10 max-w-screen-2xl mx-auto select-none">
      <div className="flex items-center gap-3 mb-6">
        <Link to="/reports">
          <button className="bg-buttonPrimaryHover hover:bg-buttonPrimary shadow-md rounded-md px-4 py-1 duration-500 hover:duration-500">
            <StepBack color="white" />
          </button>
        </Link>
        <h2 className="text-2xl font-bold">Reporte por cliente</h2>
      </div>

      <CardComponent>
        {alertData && (
          <AlertComponent
            title={alertData.title}
            description={alertData.description}
            color={alertData.color}
            onClose={() => setAlertData(null)}
          />
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="md:col-span-1">
              <label className="block text-sm font-medium mb-1">
                Cliente *
              </label>
              <select
                value={formState.clientId}
                onChange={(e) =>
                  setFormState({ ...formState, clientId: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Selecciona un cliente</option>
                {allClients?.map((client) => (
                  <option key={client._id} value={client._id}>
                    {client.companyName}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              <DateInput
                label="Fecha Inicio *"
                labelPlacement="outside"
                value={formState.startDate}
                onChange={(date) =>
                  setFormState({ ...formState, startDate: date })
                }
                placeholderValue={new CalendarDate(2024, 1, 1)}
                startContent={
                  <CalendarIcon className="text-xl text-gray-400" />
                }
                className="w-full"
              />
              <DateInput
                label="Fecha Fin *"
                labelPlacement="outside"
                value={formState.endDate}
                onChange={(date) =>
                  setFormState({ ...formState, endDate: date })
                }
                placeholderValue={new CalendarDate(2024, 12, 31)}
                startContent={
                  <CalendarIcon className="text-xl text-gray-400" />
                }
                className="w-full"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 shadow"
            >
              Generar Reporte
            </button>
          </div>
        </form>
      </CardComponent>

      {reportData && (
        <div className="mt-6 space-y-6">
           <header className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800">{reportData.clientName}</h2>
            <div className="mt-2 text-sm sm:flex sm:justify-between">
              <p>
                Total de órdenes:{" "}
                <span className="font-medium">
                  {reportData.totalOrders}
                </span>
              </p>
              <p>
                Total de llantas:{" "}
                <span className="font-medium">{reportData.totalTires}</span>
              </p>
              <p>
                Total de rechazos:{" "}
                <span className="font-medium">
                  {reportData.totalRejections}
                </span>
              </p>
            </div>
          </header>

          {reportData?.tires?.length > 0 && (
            <PaginatedTable
              columns={tableColumns}
              items={reportData.tires}
              totalItems={reportData.tires.length}
              isLoading={false}
              page={currentPage}
              rowsPerPage={rowsPerPage}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default ReportByClientPage;