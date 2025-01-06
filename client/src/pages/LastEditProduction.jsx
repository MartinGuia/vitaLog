import { useForm } from "react-hook-form";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useTire } from "../context/TireContext";
import { StepBack } from "lucide-react";
import InputField from "../components/ui/InputField";


function LastEditProduction() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    // reset,
  } = useForm();
  const { updateTire, errors: tireErrors } = useTire();
  const params = useParams();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (values) => {
    const updatedValues = Object.fromEntries(
      Object.entries(values).filter(([key, value]) => value !== "")
    );

    try {
      await updateTire(params.id, updatedValues);
      navigate("/productionFinal");
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
            Editar Llanta
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
          {/* Banda requerida, Parches usados, ancho */}
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

export default LastEditProduction;
