import React, { useState } from "react";
import { useClient } from "../context/ClientContext"; // Asegúrate de que esta ruta sea correcta

const ReportByClientPage = () => {
    const { getClientReport, allClients, getClients } = useClient();

    const [clientId, setClientId] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [reportData, setReportData] = useState(null);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!clientId || !startDate || !endDate) {
        alert("Debes seleccionar cliente y fechas.");
        return;
      }
  
      const report = await getClientReport({ clientId, startDate, endDate });
      setReportData(report);
    };
  
    // Cargar clientes al iniciar
    React.useEffect(() => {
      getClients();
    }, []);
  
    return (
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Generar reporte por cliente</h2>
  
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block">Cliente:</label>
            <select
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
              className="border p-2 rounded w-full"
            >
              <option value="">Selecciona un cliente</option>
              {allClients &&
                allClients.map((client) => (
                  <option key={client._id} value={client._id}>
                    {client.companyName}
                  </option>
                ))}
            </select>
          </div>
  
          <div>
            <label className="block">Fecha inicio:</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border p-2 rounded w-full"
            />
          </div>
  
          <div>
            <label className="block">Fecha fin:</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border p-2 rounded w-full"
            />
          </div>
  
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Generar Reporte
          </button>
        </form>
  
        {reportData && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Reporte:</h3>
            <p>Total órdenes: {reportData[0]?.totalOrders}</p>
            <p>Total llantas: {reportData[0]?.totalTires}</p>
            <p>Total rechazos: {reportData[0]?.totalRejections}</p>
  
            <table className="w-full mt-4 border">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-1">Código</th>
                  <th className="border p-1">Marca</th>
                  <th className="border p-1">Modelo</th>
                  <th className="border p-1">Banda Solicitada</th>
                  <th className="border p-1">Banda Aplicada</th>
                  <th className="border p-1">Milimetraje</th>
                  <th className="border p-1">Rechazo</th>
                </tr>
              </thead>
              <tbody>
                {reportData[0]?.tires.map((tire, index) => (
                  <tr key={index}>
                    <td className="border p-1">{tire.barCode}</td>
                    <td className="border p-1">{tire.brand}</td>
                    <td className="border p-1">{tire.model}</td>
                    <td className="border p-1">{tire.requiredBand}</td>
                    <td className="border p-1">{tire.appliedBand}</td>
                    <td className="border p-1">{tire.millimeterFootage}</td>
                    <td className="border p-1">{tire.rejection || "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
};

export default ReportByClientPage;
