import { useTire } from "../context/TireContext";
import React, { useState } from "react";
import InputField from "../components/ui/InputField";
import { useNavigate, Link } from "react-router-dom";
import { StepBack } from "lucide-react";

function ScannerInspectionPage() {
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
      navigate(`/editRepairs/${tire._id}`);
    } catch (err) {
      console.error("Error al buscar la llanta:", err);
      setError("No se encontró información para el código escaneado.");
    }
  };

  // Manejar entrada del teclado (para escáner físico)
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
          <button className="bg-cyan-950 rounded-md px-4 py-1 duration-500 hover:bg-cyan-800 hover:duration-500">
            <StepBack color="white" />
          </button>
        </Link>
        <h2 className="md:text-4xl flex justify-center font-bold mb-3 text-2xl">
          Reparaciones
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

        {/* Mostrar formulario de edición si está en modo edición */}
        {/* {isEditing && tireData && (
          
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

export default ScannerInspectionPage;
