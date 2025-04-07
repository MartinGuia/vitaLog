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
import { Input, Select, SelectItem } from "@heroui/react";

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

  const services = [
    { value: "Reparación", label: "Reparación" },
    { value: "Renovado", label: "Renovado" },
    { value: "Desecho", label: "Desecho" },
  ];

  const bandContinental = [
    { value: "HT3", label: "HT3" },
    { value: "HDL", label: "HDL" },
    { value: "HSC", label: "HSC" },
    { value: "HSR", label: "HSR" },
    { value: "HTL", label: "HTL" },
  ];

  const hullMeasurements = [
    { value: "11R22.5", label: "11R22.5" },
    { value: "11R24.5", label: "11R24.5" },
    { value: "295/75R22.5", label: "295/75R22.5" },
    { value: "275/80R22.5", label: "275/80R22.5" },
    { value: "295/80R22.5", label: "295/80R22.5" },
    { value: "315/80R22.5", label: "315/80R22.5" },
    { value: "12R22.5", label: "12R22.5" },
    { value: "305/75R24.5", label: "305/75R24.5" },
    { value: "225/70R19.5", label: "225/70R19.5" },
    { value: "275/80R24.5", label: "275/80R24.5" },
    { value: "285/75R24.5", label: "285/75R24.5" },
    { value: "225/95-17", label: "225/95-17" },
    { value: "750-17", label: "750-17" },
    { value: "215/75R17.5", label: "215/75R17.5" },
    { value: "205/75R16", label: "205/75R16" },
    { value: "215/85R16", label: "215/85R16" },
    { value: "215/65R16", label: "215/65R16" },
    { value: "225/70R22.5", label: "225/70R22.5" },
    { value: "225/75R16", label: "225/75R16" },
    { value: "225/80R22.5", label: "225/80R22.5" },
    { value: "235/75R17.5", label: "235/75R17.5" },
    { value: "235/80R17", label: "235/80R17" },
    { value: "245/70R19.5", label: "245/70R19.5" },
    { value: "255/70R19.5", label: "255/70R19.5" },
    { value: "1100-20", label: "1100-20" },
    { value: "245/75R19.5", label: "245/75R19.5" },
    { value: "275/75R24.5", label: "275/75R24.5" },
    { value: "275/80R4.5", label: "275/80R4.5" },
    { value: "285/75R22.5", label: "285/75R22.5" },
    { value: "255/75R22.5", label: "255/75R22.5" },
    { value: "12-00-20", label: "12-00-20" },
    { value: "275/95R22.5", label: "275/95R22.5" },
    { value: "305/75R22.5", label: "305/75R22.5" },
    { value: "295/60R22.5", label: "295/60R22.5" },
    { value: "225/95R17", label: "225/95R17" },
    { value: "750-16", label: "750-16" },
    { value: "10R22.5", label: "10R22.5" },
    { value: "8.25R20", label: "8.25R20" },
    { value: "750R15", label: "750R15" },
    { value: "750R17", label: "750R17" },
    { value: "195R15", label: "195R15" },
    { value: "245/70R17", label: "245/70R17" },
    { value: "235/85R16", label: "235/85R16" },
    { value: "245/75R17", label: "245/75R17" },
    { value: "255/70R22.5", label: "255/70R22.5" },
    { value: "275/80R17", label: "275/80R17" },
    { value: "11-00-20", label: "11-00-20" },
    { value: "1100R20", label: "1100R20" },
    { value: "255/65R17", label: "255/65R17" },
    { value: "265/70R17", label: "265/70R17" },
    { value: "295/75R17", label: "295/75R17" },
    { value: "245/70R17.5", label: "245/70R17.5" },
    { value: "275/70R22.5", label: "275/70R22.5" },
    { value: "275/75R22.5", label: "275/75R22.5" },
    { value: "255/70R16", label: "255/70R16" },
    { value: "305/85R22.5", label: "305/85R22.5" },
    { value: "225/75R19.5", label: "225/75R19.5" },
    { value: "275/8022.5", label: "275/8022.5" },
    { value: "255/75R19.5", label: "255/75R19.5" },
    { value: "225/70R17.5", label: "225/70R17.5" },
    { value: "245/75R17.5", label: "245/75R17.5" },
    { value: "235/80R17.5", label: "235/80R17.5" },
    { value: "12.00R24.0", label: "12.00R24.0" },
    { value: "235/75R15", label: "235/75R15" },
    { value: "245/70R19,5", label: "245/70R19,5" },
    { value: "265/70R17.5", label: "265/70R17.5" },
    { value: "235/70R17.5", label: "235/70R17.5" },
    { value: "295/75R22,5", label: "295/75R22,5" },
    { value: "265/70R19.5", label: "265/70R19.5" },
    { value: "275/80R22,5", label: "275/80R22,5" },
    { value: "235/75R19.5", label: "235/75R19.5" },
    { value: "255/80R22.5", label: "255/80R22.5" },
    { value: "275/80R24,5", label: "275/80R24,5" },
    { value: "215/75R17,5", label: "215/75R17,5" },
    { value: "235/75R17", label: "235/75R17" },
    { value: "215/70R17.5", label: "215/70R17.5" },
    { value: "215/60R16", label: "215/60R16" },
  ];

  return (
    <>
      <div className="md:px-8 px-3 py-10 max-w-screen-2xl mx-auto select-none">
        <div className="flex items-center gap-3 mb-6">
          <h1 className="text-2xl md:text-4xl font-bold">Añadir Llanta</h1>
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
          <div className="mt-8">
            <h2 className="text-lg md:text-2xl font-semibold mb-3 text-sky-900">
              Datos de la llanta
            </h2>
            <p className="text-gray-600 font-medium">
              Complete los datos del registro de la llanta.
            </p>
          </div>

          <div>
            <div className="w-[100%] pt-8 text-xl">
              <div className="flex items-center flex-col sm:w-auto sm:flex-row sm:justify-between">
                <div className="relative w-[40%] ">
                  <label className="block mb-2 text-sm font-medium">
                    Servicio
                  </label>
                  <Select
                    className="shadow-md rounded-xl"
                    label="Servicio"
                    placeholder="Servicios..."
                    items={services}
                    {...register("itemCode", {
                      required: "Debe seleccionar un Servicio.",
                    })}
                  >
                    {services.map((service) => (
                      <SelectItem key={service.value} value={service.value}>
                        {service.label}
                      </SelectItem>
                    ))}
                  </Select>
                  {/* <select
                    {...register("itemCode", {
                      required: "Debe seleccionar un Servicio.",
                    })}
                    id="small"
                    className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option defaultValue={"Seleccionar"}>Seleccionar...</option>
                    <option value="Reparación">Reparación</option>
                    <option value="Renovado">Renovado</option>
                    <option value="Desecho">Desecho</option>
                  </select> */}
                  {errors.itemCode && (
                    <p className="text-red-500 text-xs">
                      Este campo es requerido
                    </p>
                  )}
                </div>
                <div className="relative md:w-5/12 w-auto mt-5 sm:mt-0 md:flex sm:justify-between">
                  <div className="sm:w-[85%]">
                    <Input
                      label="Código de Barras"
                      id="barcode"
                      value={scannedCode}
                      readOnly
                      variant={"underlined"}
                      {...register("barCode", { required: true })}
                    />
                    {/* <InputField
                      label="Código de Barras"
                      id="barcode"
                      value={scannedCode}
                      readOnly
                      {...register("barCode", { required: true })}
                    /> */}
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
                        width={600}
                        delay={600} // Reduce el número de intentos por segundo
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
            <div className="mt-8">
              <h2 className="text-lg md:text-2xl font-semibold mb-3 text-sky-900">
                DOT y Banda Requerida
              </h2>
              <p className="text-gray-600 font-medium">
                Complete el dot y la banda requerida.
              </p>
            </div>
            <div className="w-[100%] pt-8 text-xl">
              <div className="flex items-center flex-col sm:w-auto sm:flex-row sm:justify-between">
                <div className="relative md:w-5/12 w-auto">
                  <Input
                    label="DOT"
                    type="text"
                    variant={"underlined"}
                    {...register("antiquityDot", { required: true })}
                  />
                  {errors.antiquityDot && (
                    <p className="text-red-500 text-xs">
                      Este campo es requerido
                    </p>
                  )}
                </div>

                <div className="relative md:w-5/12 w-auto mt-5 sm:mt-0">
                  <Select
                    className="shadow-md rounded-xl "
                    items={bandContinental}
                    label="banda requerida"
                    placeholder="Banda requerida..."
                    {...register("requiredBand", {
                      required: "Debe seleccionar un Rol.",
                    })}
                  >
                    {bandContinental.map((bandC) => (
                      <SelectItem key={bandC.value} value={bandC.value}>
                        {bandC.label}
                      </SelectItem>
                    ))}
                  </Select>
                  {/* <select
                    {...register("requiredBand", { required: false })}
                    className="block shadow-md w-full p-2 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option className="p-1" value="">
                      Banda usada...
                    </option>
                    <option className="p-1" value="HT3">
                      HT3
                    </option>
                    <option className="p-1" value="HDL">
                      HDL
                    </option>
                    <option className="p-1" value="HSC">
                      HSC
                    </option>
                    <option className="p-1" value="HSR">
                      HSR
                    </option>
                    <option className="p-1" value="HTL">
                      HTL
                    </option>
                  </select> */}
                  {errors.requiredBand && (
                    <p className="text-red-500 text-xs">
                      Este campo es requerido
                    </p>
                  )}
                </div>
                {/* <div className="relative md:w-5/12 w-auto mt-5 sm:mt-0">
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
                </div> */}
              </div>
            </div>
          </div>

          <div>
            <div className="mt-8">
              <h2 className="text-lg md:text-2xl font-semibold mb-3 text-sky-900">
                Medida, Marca y Modelo
              </h2>
              <p className="text-gray-600 font-medium">
                Complete la marca de la llanta, la medida del casco y el modelo.
              </p>
            </div>
            <div className="w-[100%] pt-8 text-xl">
              <div className="flex items-center flex-col sm:w-auto sm:flex-row sm:justify-between">
                <div className="relative md:w-1/4 w-[50%]">
                  <Select
                    className="shadow-md rounded-xl"
                    items={hullMeasurements}
                    label="Medidas del casco"
                    placeholder="Medidas..."
                    {...register("helmetMeasurement", {
                      required: "Debe seleccionar un Rol.",
                    })}
                  >
                    {hullMeasurements.map((measurement) => (
                      <SelectItem
                        key={measurement.value}
                        value={measurement.value}
                      >
                        {measurement.label}
                      </SelectItem>
                    ))}
                  </Select>
                  {/* <InputField
                    label="Medida del casco"
                    id="medida"
                    {...register("helmetMeasurement", { required: true })}
                  /> */}
                  {errors.helmetMeasurement && (
                    <p className="text-red-500 text-xs">
                      Este campo es requerido
                    </p>
                  )}
                </div>

                <div className="relative md:w-1/4 w-auto mt-5 sm:mt-0">
                  <Input
                    label="Marca"
                    variant={"underlined"}
                    {...register("brand", { required: true })}
                  />
                  {/* <InputField
                    label="Marca"
                    id="marca"
                    {...register("brand", { required: true })}
                  /> */}
                  {errors.brand && (
                    <p className="text-red-500 text-xs">
                      Este campo es requerido
                    </p>
                  )}
                </div>

                <div className="relative md:w-1/4 w-auto mt-5 sm:mt-0">
                  <Input
                    label="Modelo"
                    variant={"underlined"}
                    {...register("modelTire", { required: true })}
                  />
                  {/* <InputField
                    label="Modelo"
                    id="modelo"
                    {...register("modelTire", { required: true })}
                  /> */}
                  {errors.modelTire && (
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
              className="bg-buttonSecondary hover:bg-buttonSecondaryHover text-white font-medium py-2 px-5 rounded-md shadow-md"
              type="submit"
            >
              Agregar llanta
            </button>
            <button
              className="bg-buttonTertiary hover:bg-buttonTertiaryHover text-white mt-2 sm:mt-0 sm:ml-4 font-medium py-2 px-5 rounded-md shadow-md duration-500 hover:duration-500"
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
