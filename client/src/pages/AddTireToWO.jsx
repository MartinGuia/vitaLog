import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useTire } from "../context/TireContext";
import { useWorkOrder } from "../context/WorkOrderContext";
import InputField from "../components/ui/InputField";
import React, { useState } from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import socket from "../socket";
import { Focus } from "lucide-react";

function AddTireToWO() {
  const [scannedCode, setScannedCode] = useState(""); // Estado para el código escaneado
  const [isScannerOpen, setIsScannerOpen] = useState(false); // Control del modal
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { errors: registerErrors, user } = useAuth();
  const navigate = useNavigate();
  const { closeWorkOrder } = useWorkOrder();
  const { createTire } = useTire();

  const onSubmit = handleSubmit((values) => {
    const formData = { ...values, scannedCode };
    createTire(formData);
    reset();
    setScannedCode("");
  });

  const handleScannerOpen = () => setIsScannerOpen(true);
  const handleScannerClose = () => setIsScannerOpen(false);

  const handleClick = async () => {
    try {
      // const user = JSON.parse(localStorage.getItem("user")); // Obtener el usuario almacenado
      if (!user || !user.name) {
        console.error("No se encontró el usuario");
        return;
      }

      await closeWorkOrder({
        socketId: socket.id, // Enviar el socketId
        username: user.name, // Enviar el nombre del usuario
      });
      navigate("/createWorkOrder");
      console.log(`Orden de trabajo creada por: ${user.name}`);
    } catch (error) {
      console.error("Error al cerrar la orden de trabajo:", error.message);
    }
  };

  return (
    <>
      <div className="md:px-8 px-3 py-10 max-w-screen-2xl mx-auto select-none">
        <div>
          <h1 className="md:text-4xl flex justify-center font-bold mb-3 text-2xl">
            Añadir Llanta
          </h1>
          <div className="flex top-10 absolute w-[100%]">
            {registerErrors.map((error, i) => (
              <div
                className="bg-red-500 py-2 text-white w-[100%] flex justify-center"
                key={i}
              >
                {error}
              </div>
            ))}
          </div>
        </div>
        <form onSubmit={onSubmit}>
          <div className="mt-10">
            <div className="flex mb-3">
              <h1 className="text-lg flex text-sky-900 font-semibold w-[90%] sm:text-2xl md:text-3xl sm:w-[50%] md:w-[70%] lg:w-[25%] ">
                Datos de la llanta
              </h1>
              <div className="flex items-center w-[70%] sm:w-full">
                <hr className="border-[1px] w-full border-sky-800 mt-1"/>
              </div>
            </div>
            <h1 className="font-bold text-2xl sm:text-3xl">Codigo item y Barras</h1>
            <p>Complete los datos del registro de la llanta.</p>
          </div>
          <div className="w-[100%] pt-8 text-xl"></div>

          <div>
            <div className="w-[100%] pt-8 text-xl">
              <div className="flex items-center flex-col sm:w-auto sm:flex-row sm:justify-between">
                <div className="relative w-[40%] ">
                  <label className="block mb-2 text-sm font-medium">
                    Codigo de item
                  </label>
                  <select
                    {...register("itemCode", { required: true })}
                    id="small"
                    className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option defaultValue={"Seleccionar"}>Seleccionar...</option>
                    <option value="Reparacion">Reparación</option>
                    <option value="Ronovado">Renovado</option>
                    <option value="Desecho">Desecho</option>
                  </select>
                  {errors.address2 && (
                    <p className="text-red-500 text-xs">
                      Este campo es requerido
                    </p>
                  )}
                </div>
                <div className="relative md:w-5/12 w-auto mt-5 sm:mt-0 md:flex sm:justify-between">
                  <div className="sm:w-[85%]">
                    <InputField
                      label="Código de Barras"
                      id="barcode"
                      value={scannedCode}
                      readOnly
                      {...register("barCode", { required: true })}
                    />
                  </div>
                  {errors.barCode && (
                    <p className="text-red-500 text-xs">
                      Este campo es requerido
                    </p>
                  )}

                  <div className="flex justify-center mt-4 md:mt-0">
                    <button
                      type="button"
                      className="bg-slate-200 hover:bg-slate-300 duration-700 hover:duration-700 shadow-md px-4 py-2 rounded-md"
                      onClick={handleScannerOpen}
                    >
                      <Focus />
                    </button>
                  </div>
                </div>

                {isScannerOpen && (
                  <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-md shadow-lg z-[100]">
                      <h1 className="text-xl font-bold mb-4">
                        Escanea el código
                      </h1>
                      <BarcodeScannerComponent
                        width={300}
                        delay={300} // Reduce el número de intentos por segundo
                        videoConstraints={{
                          facingMode: "environment",
                          width: { ideal: 1280 },
                          height: { ideal: 720 },
                        }}
                        onUpdate={(err, result) => {
                          if (result) {
                            setScannedCode(result.text);
                            handleScannerClose();
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
            </div>
          </div>

          {/* DOT Y BANDA REQUERIDA */}
          <div>
            <div className="mt-10">
              <h1 className="font-bold text-2xl sm:text-3xl">Dot y banda requerida</h1>
              <p>Complete el usuario y contraseña.</p>
            </div>
            <div className="w-[100%] pt-8 text-xl">
              <div className="flex items-center flex-col sm:w-auto sm:flex-row sm:justify-between">
                <div className="relative md:w-5/12 w-auto">
                  <InputField
                    label="Antiguedad"
                    id="dot"
                    {...register("antiquityDot", { required: true })}
                  />
                  {errors.helmetMeasurement && (
                    <p className="text-red-500 text-xs">
                      Este campo es requerido
                    </p>
                  )}
                </div>
                <div className="relative md:w-5/12 w-auto mt-5 sm:mt-0">
                  <InputField
                    label="Banda requerida"
                    id="banda"
                    {...register("requiredBand", { required: true })}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-xs">
                      Este campo es requerido
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="mt-10">
              <h1 className="font-bold text-2xl sm:text-3xl">Medida y Marca</h1>
              <p>Complete la marca y medida de la llanta.</p>
            </div>
            <div className="w-[100%] pt-8 text-xl">
              <div className="flex items-center flex-col sm:w-auto sm:flex-row sm:justify-between">
                <div className="relative md:w-5/12 w-auto">
                  <InputField
                    label="Medida del casco"
                    id="medida"
                    {...register("helmetMeasurement", { required: true })}
                  />
                  {errors.helmetMeasurement && (
                    <p className="text-red-500 text-xs">
                      Este campo es requerido
                    </p>
                  )}
                </div>

                <div className="relative md:w-5/12 w-auto mt-5 sm:mt-0">
                  <InputField
                    label="Marca"
                    id="marca"
                    {...register("brand", { required: true })}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-xs">
                      Este campo es requerido
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-end mt-5">
            <button
              className="text-white font-medium bg-cyan-950 py-2 px-5 rounded-md shadow-md hover:bg-cyan-800"
              type="submit"
            >
              Agregar llanta
            </button>
            <button
              className="mt-2 sm:mt-0 sm:ml-4 font-medium bg-yellow-400 text-blue-950 py-2 px-5 rounded-md shadow-md hover:bg-vbYellow duration-500 hover:duration-500"
              onClick={handleClick}
            >
              <p>Cerrar orden</p>
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddTireToWO;
