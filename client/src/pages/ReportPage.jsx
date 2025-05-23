import ReportByContinental from "../components/Reports/ReportByContinental";
import ReportByBandag from "../components/Reports/ReportByBandag";

function ReportPage() {
  return (
    <div className="md:px-8 px-3 py-10 max-w-screen-2xl mx-auto select-none">
      <div className="flex items-center gap-3 mb-6">
        <h1 className="text-2xl md:text-4xl font-bold">Reporte de llantas</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ReportByContinental />
        <ReportByBandag />
      </div>
    </div>
  );
}

export default ReportPage;
