import { useTire } from "../context/TireContext";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import React, { useState } from "react";
import InputField from "../components/ui/InputField";
import { useForm } from "react-hook-form";


function InitialInspectionPage() {
  const { getTireByBarcode } = useTire();
  const [scannedCode, setScannedCode] = useState(""); // Estado para el código escaneado
  const [tireData, setTireData] = useState(null); // Estado para los datos de la llanta
  const [error, setError] = useState(null); // Estado para errores
  const [isScannerOpen, setIsScannerOpen] = useState(false); // Control del modal
  const [isEditing, setIsEditing] = useState(false); // Control del formulario de edición

  const handleScannerOpen = () => setIsScannerOpen(true);
  const handleScannerClose = () => setIsScannerOpen(false);

  const handleScan = async (code) => {
    if (!code) return; // Validar código
    try {
      setError(null); // Limpiar errores previos
      const tire = await getTireByBarcode(code);
      setTireData(tire); // Guardar datos de la llanta en el estado
      setIsEditing(true); // Activar modo edición
      console.log("Datos de la llanta escaneada:", tire);
    } catch (err) {
      console.error("Error al buscar la llanta:", err);
      setError("No se encontró información para el código escaneado."); // Mostrar mensaje de error
      setIsEditing(false); // Desactivar modo edición
    }
  };

  return (
    <div className="px-4 lg:px-14 max-w-screen-2xl mx-auto">
      <div className="text-center my-8">
        <h2 className="text-4xl font-semibold mb-2">Estación Inicial</h2>
      </div>

      <section>
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

          {/* Mostrar formulario de edición si está en modo edición */}
          {isEditing && tireData && (
            <div className="mt-8 w-full">
              <EditTireForm tireData={tireData} />
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

const EditTireForm = ({ tireData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: tireData, // Precargar valores con datos obtenidos
  });

  const onSubmit = async (values) => {
    try {
      console.log("Datos actualizados:", values);
      alert("Datos actualizados con éxito");
      // Aquí puedes llamar a una función para actualizar los datos en el backend
    } catch (error) {
      console.error("Error al actualizar:", error);
      alert("Error al actualizar los datos");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium">Código de barras</label>
        <InputField {...register("barCode")} readOnly />
      </div>

      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium">Marca</label>
        <InputField {...register("brand", { required: true })} />
        {errors.brand && <p className="text-red-500 text-xs">Este campo es requerido</p>}
      </div>

      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium">Orden de trabajo</label>
        <InputField {...register("workOrder.numero", { required: true })} />
        {errors.workOrder && (
          <p className="text-red-500 text-xs">Este campo es requerido</p>
        )}
      </div>

      {/* Agrega más campos según sea necesario */}
      <button
        type="submit"
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md"
      >
        Guardar Cambios
      </button>
    </form>
  );
};

export default InitialInspectionPage;