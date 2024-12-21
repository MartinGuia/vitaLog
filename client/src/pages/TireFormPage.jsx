import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useTire } from "../context/TireContext";
import { useWorkOrder } from "../context/WorkOrderContext";
import InputField from "../components/ui/InputField";

function TireFormPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { errors: registerErrors } = useAuth();
  const navigate = useNavigate();
  const { closeWorkOrder } = useWorkOrder();
  const { createTire } = useTire();

  const onSubmit = handleSubmit((values) => {
    createTire(values);
    reset();
  });

  const handleClick = async () => {
    try {
      await closeWorkOrder();
      navigate("/workorders");
      // Puedes realizar acciones adicionales después de cerrar la orden de trabajo si es necesario
    } catch (error) {
      // Manejo de errores, por ejemplo, mostrar un mensaje al usuario
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
          <div>
            <div className="mt-10">
              <div className="flex mb-3">
                <h1 className="text-lg flex text-sky-900 font-semibold w-[50%] md:text-3xl md:w-[70%] lg:w-[25%] ">
                  Datos de la llanta
                </h1>
                <div className="flex items-center w-[100%]">
                  <hr className="border-[1px] w-[100%] border-sky-800 mt-1" />
                </div>
              </div>
              <h1 className="font-bold text-3xl">Codigo item y Barras</h1>
              <p>Complete los datos del registro de la llanta.</p>
            </div>
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
                <div className="relative md:w-5/12 w-auto mt-5 sm:mt-0">
                  <InputField
                    label="Codigo de barras"
                    id="codigo"
                    {...register("barCode", { required: true })}
                  />
                  {errors.barCode && (
                    <p className="text-red-500 text-xs">
                      Este campo es requerido
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* DOT Y BANDA REQUERIDA */}
          <div>
            <div className="mt-10">
              <h1 className="font-bold text-3xl">Dot y banda requerida</h1>
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
              <h1 className="font-bold text-3xl">Medida </h1>
              <p>Complete el usuario y contraseña.</p>
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
          <div className="flex justify-end mt-14 ">
            <div className="flex justify-between w-[100%] md:w-[40%]">
              <div>
                <button
                  className=" text-white font-medium bg-cyan-950 py-2 px-5 rounded-md shadow-md hover:bg-cyan-800 duration-500 hover:duration-500 "
                  type="submit"
                >
                  Agregar llanta
                </button>
              </div>
              <div>
                <button
                  className="  font-medium bg-yellow-400 py-2 px-5 rounded-md shadow-md hover:bg-yellow-500 duration-500 hover:duration-500 "
                  onClick={handleClick}
                >
                  Cerrar orden
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default TireFormPage;
