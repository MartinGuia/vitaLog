import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import InputField from "../components/ui/InputField";
import { useTire } from "../context/TireContext";
import { StepBack } from "lucide-react";

function EditTirePage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { updateTire, getTire, errors: tireErrors } = useTire();
  const params = useParams();
  const navigate = useNavigate();
  const [workOrder, setWorkOrder] = useState();

  useEffect(() => {
    async function loadTire() {
      if (params.id) {
        const tire = await getTire(params.id);
        if (tire) {
          setWorkOrder(tire.workOrder._id);
          reset({
            itemCode: tire.itemCode,
            barCode: tire.barCode,
            helmetMeasurement: tire.helmetMeasurement,
            brand: tire.brand,
            helmetDesign: tire.helmetDesign,
            requiredBand: tire.requiredBand,
            antiquityDot: tire.antiquityDot,
          });
        }
      }
    }
    loadTire();
  }, []);

  const onSubmit = handleSubmit(async (values) => {
    const updatedValues = Object.fromEntries(
      Object.entries(values).filter(([key, value]) => value !== "")
    );

    try {
      await updateTire(params.id, updatedValues);
      navigate("/workorders");
      alert("Registro actualizado exitosamente");
    } catch (error) {
      console.error(error);
      alert("Error al actualizar el registro");
    }
  });

  return (
    <>
      <div className="md:px-8 px-3 py-10 max-w-screen-2xl mx-auto select-none">
        <div className="flex items-center gap-3 mb-6">
          <Link to={`/workOrder/${workOrder}`}>
            <button className="bg-buttonPrimaryHover hover:bg-buttonPrimary shadow-md rounded-md px-4 py-1 duration-500 hover:duration-500">
              <StepBack color="white" />
            </button>
          </Link>
          <h1 className="text-2xl md:text-4xl font-bold">
            Editar Registro
          </h1>
        </div>
        <div className="flex top-10 absolute w-[100%]">
          {tireErrors.map((error, i) => (
            <div
              className="bg-red-500 py-2 text-white w-[100%] flex justify-center"
              key={i}
            >
              {error}
            </div>
          ))}
        </div>
        <form onSubmit={onSubmit}>
          <div>
            <h2 className="text-lg md:text-2xl font-semibold mb-2 text-sky-900 mt-12">
              Servicio y Código de Barras
            </h2>
            <p className="text-gray-600 font-medium">
              Complete el registro de la llanta.
            </p>

            <div className="w-[100%] pt-5 text-xl">
              <div className="flex items-center flex-col sm:w-auto sm:flex-row sm:justify-between">
                <div className="relative w-[40%] ">
                  <label className="block mb-2 text-sm font-medium">
                    Servicio
                  </label>
                  <select
                    {...register("itemCode")}
                    className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value={"itemCode"}>Seleccionar...</option>
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
                  <label htmlFor="" className="text-sm">
                    Codigo de barras
                  </label>
                  <InputField
                    // label="Codigo de barras"
                    // id="codigo"
                    {...register("barCode")}
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
            <div className="mt-8">
              <h2 className="text-lg md:text-2xl font-semibold mb-2 text-sky-900 mt-12">
                DOT y banda requerida
              </h2>
              <p className="text-gray-600 font-medium">
                Complete usuario y banda requerida.
              </p>
            </div>
            <div className="w-[100%] pt-8 text-xl">
              <div className="flex items-center flex-col sm:w-auto sm:flex-row sm:justify-between">
                <div className="relative md:w-5/12 w-auto">
                  <label htmlFor="" className="text-sm">
                    DOT
                  </label>
                  <InputField
                    {...register("antiquityDot")}
                  />
                  {errors.helmetMeasurement && (
                    <p className="text-red-500 text-xs">
                      Este campo es requerido
                    </p>
                  )}
                </div>
                <div className="relative md:w-5/12 w-auto mt-5 sm:mt-0">
                  <label htmlFor="" className="text-sm">
                    Banda requerida
                  </label>
                  <InputField
                    {...register("requiredBand")}
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
            <div className="mt-8">
              <h2 className="text-lg md:text-2xl font-semibold mb-2 text-sky-900 mt-12">
                Medida y Marca
              </h2>
              <p className="text-gray-600 font-medium">
                Complete medida y marca
              </p>
            </div>
            <div className="w-[100%] pt-8 text-xl">
              <div className="flex items-center flex-col sm:w-auto sm:flex-row sm:justify-between">
                <div className="relative md:w-5/12 w-auto">
                  <label htmlFor="" className="text-sm">
                    Medida
                  </label>
                  <InputField
                    // label="Medida del casco"
                    // id="medida"
                    {...register("helmetMeasurement")}
                  />
                  {errors.helmetMeasurement && (
                    <p className="text-red-500 text-xs">
                      Este campo es requerido
                    </p>
                  )}
                </div>

                <div className="relative md:w-5/12 w-auto mt-5 sm:mt-0">
                  <label htmlFor="" className="text-sm">
                    Marca
                  </label>
                  <InputField
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
            <div className="flex justify-end ">
              <button
                className=" text-white font-medium bg-buttonSecondary py-3 px-8 rounded-md shadow-md hover:bg-buttonSecondaryHover duration-500 hover:duration-500 "
                type="submit"
              >
                Actualizar
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default EditTirePage;
