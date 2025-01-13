import { useTire } from "../context/TireContext";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import React, { useState } from "react";
import InputField from "../components/ui/InputField";
import { Link, useNavigate } from "react-router-dom";

function SecondInspectionPage() {
  const { getTireByBarcode } = useTire();
  const [scannedCode, setScannedCode] = useState(""); // Estado para el código escaneado
  const [tireData, setTireData] = useState(null); // Estado para los datos de la llanta
  const [error, setError] = useState(null); // Estado para errores
  const [isScannerOpen, setIsScannerOpen] = useState(false); // Control del modal
  const [isEditing, setIsEditing] = useState(false); // Control del formulario de edición
  const navigate = useNavigate();

  const handleScannerOpen = () => setIsScannerOpen(true);
  const handleScannerClose = () => setIsScannerOpen(false);

  const handleScan = async (code) => {
    if (!code) return; // Validar código
    try {
      setError(null); // Limpiar errores previos
      const tire = await getTireByBarcode(code);
      navigate(`/editRepairs/${tire._id}`);
      // setTireData(tire); // Guardar datos de la llanta en el estado
      // setIsEditing(true); // Activar modo edición
      // console.log("Datos de la llanta escaneada:", tire);
    } catch (err) {
      console.error("Error al buscar la llanta:", err);
      setError("No se encontró información para el código escaneado."); // Mostrar mensaje de error
      setIsEditing(false); // Desactivar modo edición
    }
  };
  return (
    <div className="px-4 lg:px-14 max-w-screen-2xl mx-auto">
      <div className="text-center my-8">
        <h2 className="text-4xl font-semibold mb-2">Reparaciones</h2>
      </div>

      <section className="h-auto">
        <div className="p-4 w-full flex justify-center flex-col items-center">
          <div className="relative md:w-5/12 w-auto mt-5 sm:mt-0">
            <InputField
              label="Código de Barras"
              id="barcode"
              value={scannedCode}
              readOnly
            />
            <button
              type="button"
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
              onClick={handleScannerOpen}
            >
              Escanear Código de Barras
            </button>
          </div>

          {/* Mostrar mensaje de error si hay */}
          {error && (
            <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}

          {isScannerOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
              <div className="bg-white p-6 rounded-md shadow-lg z-[100]">
                <h1 className="text-xl font-bold mb-4">Escanea el código</h1>
                <BarcodeScannerComponent
                  width={500}
                  height={500}
                  onUpdate={(err, result) => {
                    if (result) {
                      const scannedValue = result.text; // Código escaneado
                      setScannedCode(scannedValue); // Actualizar el estado
                      handleScan(scannedValue); // Llamar a handleScan con el código
                      handleScannerClose(); // Cerrar el escáner
                    } else if (err) {
                      console.error("Error al escanear:", err);
                      setError("Error al escanear el código.");
                    }
                  }}
                />
                <button
                  className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md"
                  onClick={handleScannerClose}
                >
                  Cerrar
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Mostrar formulario de edición si está en modo edición */}
        {/* {isEditing && tireData && (
          <>
          
          </>
          // <div className="mt-8 ">
          //   <Link
          //     to={`/editInitial/${tireData._id}`}
          //     className="w-full h-32 flex justify-center"
          //   >
          //     <button className="bg-slate-100 w-[50%] h-[20] p-2 shadow rounded-lg hover:-translate-y-2 hover:duration-500 duration-500">
          //       <div className="">
          //         <h1 className="text-lg font-semibold">
          //           Ir a la llanta de la orden de trabajo:{" "}
          //           {tireData.workOrder.numero}
          //         </h1>
          //       </div>
          //       <div>
          //         <div className="flex justify-end items-end">
          //           Registrada por: <p className="ml-2 font-semibold"> {tireData.user.name}</p>
          //         </div>
          //       </div>
          //     </button>
          //   </Link>
          // </div>
        )} */}
      </section>
    </div>
  );
}

export default SecondInspectionPage;