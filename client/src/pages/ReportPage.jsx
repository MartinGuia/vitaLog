import ReportByContinental from "../components/Reports/ReportByContinental";
import ReportByBandag from "../components/Reports/ReportByBandag";
import { Button } from "@heroui/react";
import { Link } from "react-router-dom";

export const ClipboardDataIcon = ({
  fill = "currentColor",
  size,
  height,
  width,
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size || width || 24}
      height={size || height || 24}
      fill={fill}
      viewBox="0 0 17 17"
      {...props}
    >
      <path d="M4 11a1 1 0 1 1 2 0v1a1 1 0 1 1-2 0v-1zm6-4a1 1 0 1 1 2 0v5a1 1 0 1 1-2 0V7zM7 9a1 1 0 0 1 2 0v3a1 1 0 1 1-2 0V9z" />
      <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
      <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
    </svg>
  );
};

function ReportPage() {
  return (
    <div className="md:px-8 px-3 py-10 max-w-screen-2xl mx-auto select-none">
      <div className="flex items-center gap-3 mb-6">
        <h1 className="text-2xl md:text-4xl font-bold">Reporte de llantas</h1>
      </div>
      <div className="mb-7 flex justify-end">
        <Link to={"/reportByClient"}>
          <Button
            className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-800 text-white rounded-lg shadow-lg"
            endContent={<ClipboardDataIcon />}
          >
            Reporte por cliente
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ReportByContinental />
        <ReportByBandag />
      </div>
    </div>
  );
}

export default ReportPage;
