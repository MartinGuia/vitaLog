import { useForm } from "react-hook-form";
// import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useTire } from "../context/TireContext";
import { StepBack } from "lucide-react";

function FirstEditProduction() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    // reset,
  } = useForm();
  const { updateTire, getTire, errors: tireErrors } = useTire();
  const params = useParams();
  const navigate = useNavigate();
  // const [workOrder, setWorkOrder] = useState();

  // useEffect(() => {
  //   async function loadTire() {
  //     if (params.id) {
  //       const tire = await getTire(params.id);
  //       if (tire) {
  //         setWorkOrder(tire.workOrder);
  //          reset({
  //            itemCode: tire.itemCode,
  //            barCode: tire.barCode,
  //            helmetMeasurement: tire.helmetMeasurement,
  //            brand: tire.brand,
  //            helmetDesign: tire.helmetDesign,
  //            requiredBand: tire.requiredBand,
  //            antiquityDot: tire.antiquityDot,
  //          });
  //       }
  //     }
  //   }
  //   loadTire();
  // }, []);

  const onSubmit = handleSubmit(async (values) => {
    const updatedValues = Object.fromEntries(
      Object.entries(values).filter(([key, value]) => value !== "")
    );

    try {
      await updateTire(params.id, updatedValues);
      navigate("/productionInitial");
      alert("Registro actualizado exitosamente");
    } catch (error) {
      console.error(error);
      alert("Error al actualizar el registro");
    }
  });
  return (
    <>
      <div className="md:px-8 px-3 py-10 max-w-screen-2xl mx-auto select-none">
        <div>
          <Link to={`/productionInitial`}>
            <button className="bg-cyan-950 rounded-md px-4 py-1 duration-500 hover:bg-cyan-800 hover:duration-500">
              <StepBack color="white" />
            </button>
          </Link>
        </div>
        <div>
          <h1 className="md:text-4xl flex justify-center font-bold mb-3 text-2xl">
            Editar registro
          </h1>
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
              {/* <h1 className="font-bold text-3xl">Estado de la llanta</h1> */}
              <p>Especificar si la llanta sera rechazo o pasa.</p>
            </div>
            <div className="w-[100%] pt-8 text-xl">
              <div className="relative w-[40%] ">
                <select
                  {...register("rejection", {
                    required: "Debe seleccionar una opción.",
                  })}
                  className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="">Seleccionar...</option>
                  <option value="Rechazo">Rechazo</option>
                  <option value="Renovar">Pasa</option>
                </select>
                {errors.rejection && (
                  <p className="text-red-500 text-xs">
                    {errors.rejection.message}
                  </p>
                )}
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
                  Editar
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default FirstEditProduction;
