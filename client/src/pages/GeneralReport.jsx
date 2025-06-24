import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import AnnualTireRenewalChart from "../components/Reports/AnnualTireRenewalChart";
import AnnualClientRenewalChart from "../components/Reports/AnnualClientRenewalChart";
import AnnualRejectionReasonsChart from "../components/Reports/AnnualRejectionReasonsChart";
import AnnualTopBrandChart from "../components/Reports/AnnualTopBrandChart";
import AnnualTopModelChart from "../components/Reports/AnnualTopModelChart";
import AnnualTopMeasurementChart from "../components/Reports/AnnualTopMeasurementChart";
import AnnualAllBandsChart from "../components/Reports/AnnualAllBandsChart";
import html2canvas from "html2canvas";
import { PDFDownloadLink } from "@react-pdf/renderer";
import GeneralReportPDF from "../components/PDF/GeneralReportPDF";

function GeneralReport() {
  const { getReport } = useAuth();
  const [year, setYear] = useState("");
  const [report, setReport] = useState(null);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const [reportImage, setReportImage] = useState(null);
  const [bandsImage, setBandsImage] = useState(null);
  const [renewalImage, setRenewalImage] = useState(null);
  const [rejectionImage, setRejectionImage] = useState(null);
  const [clientImage, setClientImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!year) {
      setErrors(["Debes ingresar un año"]);
      return;
    }

    setLoading(true);
    setErrors([]);
    const result = await getReport(parseInt(year), setErrors);
    setReport(result);
    setLoading(false);
  };

  const generateReportImage = async () => {
    await new Promise((resolve) => setTimeout(resolve, 500)); // esperar 500ms

    const renewalElement = document.getElementById("annual-renewal-chart");
    const summaryElement = document.getElementById("annual-summary-report");
    const bandsElement = document.getElementById("annual-bands-report");
    const rejectionsElement = document.getElementById(
      "annual-rejection-report"
    );
    const clientsElement = document.getElementById("annual-clients-report");

    if (renewalElement) {
      const canvasRenewal = await html2canvas(renewalElement, {
        scale: 3, // aumenta la resolución
        useCORS: true,
      });
      // const canvasRenewal = await html2canvas(renewalElement, { scale: 2, useCORS: true });
      setRenewalImage(canvasRenewal.toDataURL("image/png"));
    }

    if (rejectionsElement) {
      const canvasSummary = await html2canvas(rejectionsElement, {
        scale: 2,
        useCORS: true,
      });
      setRejectionImage(canvasSummary.toDataURL("image/png"));
    }
    if (clientsElement) {
      const canvasSummary = await html2canvas(clientsElement, {
        scale: 2,
        useCORS: true,
      });
      setClientImage(canvasSummary.toDataURL("image/png"));
    }

    if (summaryElement) {
      const canvasSummary = await html2canvas(summaryElement, {
        scale: 2,
        useCORS: true,
      });
      setReportImage(canvasSummary.toDataURL("image/png"));
    }

    if (bandsElement) {
      await new Promise((r) => setTimeout(r, 300)); // pequeño delay
      const canvasBands = await html2canvas(bandsElement, {
        scale: 3,
        useCORS: true,
      });
      setBandsImage(canvasBands.toDataURL("image/png"));
    }
  };

  return (
    <div className="md:px-8 px-3 py-10 max-w-screen-2xl mx-auto select-none">
      <h1 className="text-2xl font-bold mb-4">Reporte General Anual</h1>

      <form onSubmit={handleSubmit} className="mb-6 flex items-center gap-4">
        <input
          type="number"
          placeholder="Ingresa un año (ej. 2024)"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="border px-3 py-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Obtener Reporte
        </button>
      </form>

      {errors.length > 0 && (
        <div className="bg-red-100 text-red-700 p-3 mb-4 rounded">
          {errors.map((err, idx) => (
            <p key={idx}>{err}</p>
          ))}
        </div>
      )}

      {loading && <p className="text-gray-600">Cargando reporte...</p>}

      {report && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">
            Resumen por mes del {report.year}
          </h2>

          <div id="annual-renewal-chart">
            <AnnualTireRenewalChart monthlySummary={report.monthlySummary} />
          </div>

          <div id="annual-clients-report">
            <AnnualClientRenewalChart monthlySummary={report.monthlySummary} />
          </div>

          <div id="annual-rejection-report">
            <AnnualRejectionReasonsChart data={report.rejectionReasons} />
          </div>

          <div id="annual-summary-report">
            <AnnualTopBrandChart data={report.mostUsedBrands} />
            <AnnualTopModelChart data={report.mostUsedModels} />
            <AnnualTopMeasurementChart data={report.tireMeasurementsUsed} />
          </div>
          <div id="annual-bands-report">
            {/* Gráficas de bandas en otra hoja */}
            <AnnualAllBandsChart
              continentalBands={report.mostUsedContinentalBands}
              bandagBands={report.mostUsedBandagBands}
            />
          </div>

          {/* <table className="w-full border text-sm">
            <thead className="bg-gray-200">
              <tr>
                <th className="border p-2">Mes</th>
                <th className="border p-2">Órdenes</th>
                <th className="border p-2">Llantas</th>
                <th className="border p-2">Rechazos</th>
                <th className="border p-2">Clientes</th>
              </tr>
            </thead>
            <tbody>
              {report.monthlySummary.map((month) => (
                <tr key={month.month}>
                  <td className="border p-2">{month.month}</td>
                  <td className="border p-2">{month.totalOrders}</td>
                  <td className="border p-2">{month.totalTires}</td>
                  <td className="border p-2">{month.totalRejections}</td>
                  <td className="border p-2">
                    {month.clients.map((c) => (
                      <div key={c.clientId}>
                        <strong>{c.clientName}</strong>: {c.totalTires} llantas,{" "}
                        {c.totalRejections} rechazos
                      </div>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table> */}

          {/* Puedes añadir más tablas o gráficas con otras estadísticas globales */}
        </div>
      )}
      {report && (
        <>
          <button
            onClick={generateReportImage}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md"
          >
            Capturar reporte para PDF
          </button>

          {reportImage && (
            <PDFDownloadLink
              document={
                <GeneralReportPDF
                  year={report.year}
                  reportImage={reportImage}
                  bandsImage={bandsImage}
                  clientImage={clientImage}
                  renewalImage={renewalImage}
                  rejectionImage={rejectionImage}
                />
              }
              fileName={`Reporte_Anual_${report.year}.pdf`}
              className="btn-download"
            >
              {({ loading }) =>
                loading ? "Generando PDF..." : "Descargar PDF"
              }
            </PDFDownloadLink>
          )}
        </>
      )}
    </div>
  );
}

export default GeneralReport;
