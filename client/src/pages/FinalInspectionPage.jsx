import { useTire } from "../context/TireContext";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import React, { useState } from "react";
import InputField from "../components/ui/InputField";

function FinalInspectionPage() {
  const { getTireByBarcode } = useTire();
  const [scannedCode, setScannedCode] = useState(""); // Estado para el código escaneado
  const [isScannerOpen, setIsScannerOpen] = useState(false); // Control del modal

  const handleScannerOpen = () => setIsScannerOpen(true);
  const handleScannerClose = () => setIsScannerOpen(false);

  const handleScan = async (scannedCode) => {
    if (!scannedCode) return; // Evitar búsquedas sin código válido
    try {
      const tire = await getTireByBarcode(scannedCode);
      console.log("Datos de la llanta escaneada:", tire);
      // Realiza alguna acción con los datos obtenidos
    } catch (error) {
      console.error("Error al buscar la llanta:", error);
    }
  };
  return (
    <>
      <div className="px-4 lg:px-14 max-w-screen-2xl mx-auto">
        <div className="text-center my-8">
          <h2 className="text-4xl font-semibold mb-2">Estación Final</h2>
        </div>

        <section>
          <div className="p-4 w-full">
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
        </section>
      </div>
    </>
  );
}

export default FinalInspectionPage;
