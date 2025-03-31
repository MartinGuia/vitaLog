import { useTire } from "../context/TireContext";
import React, { useState } from "react";
import InputField from "../components/ui/InputField";
import { useNavigate, Link } from "react-router-dom";
import { StepBack } from "lucide-react";

function ScannerFinalProduction() {
  const { getTireByBarcode } = useTire();
  const [scannedCode, setScannedCode] = useState(""); // Estado para el código escaneado
  const [error, setError] = useState(null); // Estado para errores
  const navigate = useNavigate();

  const normalizeBarcode = (barcode) => {
    return barcode.replace("'", "-"); // Reemplaza apóstrofes con guiones
  };

  const handleScan = async (code) => {
    if (!code) return;
    try {
      const normalizedCode = normalizeBarcode(code);
      setError(null);
      const tire = await getTireByBarcode(normalizedCode);
      navigate(`/editFinal/${tire._id}`);
    } catch (err) {
      console.error("Error al buscar la llanta:", err);
      setError("No se encontró información para el código escaneado.");
    }
  };

  const handleKeyDown = (e) => {
    // Detecta cuando el código de barras ha terminado (presión de la tecla Enter o Tab)
    if (e.key === "Enter" || e.key === "Tab") {
      e.preventDefault(); // Prevenir comportamiento por defecto del Enter
      handleScan(scannedCode.trim()); // Buscar llanta con el código ingresado
    }
  };

  return (
    <div className="md:px-8 px-3 py-10 max-w-screen-2xl mx-auto select-none">
      <div>
        <Link to="/production">
          <button className="bg-buttonPrimaryHover hover:bg-buttonPrimary shadow-md rounded-md px-4 py-1 duration-500 hover:duration-500">
            <StepBack color="white" />
          </button>
        </Link>
        <h2 className="md:text-4xl flex justify-center font-bold mb-3 text-2xl">
          Inspección Final
        </h2>
      </div>

      <section className="h-auto">
        <div className="p-4 w-full flex justify-center flex-col items-center">
          <div className="relative md:w-5/12 w-auto mt-5 sm:mt-0">
            <InputField
              label="Código de Barras"
              id="barcode"
              value={scannedCode}
              onChange={(e) => setScannedCode(e.target.value)} // Actualizar estado
              onKeyDown={handleKeyDown} // Detectar tecla Enter o Tab
              autoFocus
            />
          </div>

          {/* Mostrar mensaje de error si hay */}
          {error && (
            <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default ScannerFinalProduction;
