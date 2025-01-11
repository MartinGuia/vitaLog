import { useForm } from "react-hook-form";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useTire } from "../context/TireContext";
import { StepBack } from "lucide-react";
import InputField from "../components/ui/InputField";

function SecondEditProduction() {
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
      navigate("/productionRepairs");
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
          <Link to={`/productionRepairs`}>
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
              <h1 className="font-bold text-3xl">Reparaciones y cantidad</h1>
              <p>Complete el usuario y contraseña.</p>
            </div>
            <div className="w-[100%] pt-8 text-xl">
              <div className="flex items-center flex-col sm:w-auto sm:flex-row sm:justify-between">
                <div className=" w-[80%] sm:w-[40%]">
                  <div className="relative w-full">
                    <select
                      {...register("patch", { required: false })}
                      className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      size="4" /* Controla cuántas opciones se muestran sin scroll */
                    >
                      <option value="">Razón de rechazo ...</option>
                      <option value="B120">B120</option>
                      <option value="B122">B122</option>
                      <option value="B124">B124</option>
                      <option value="B140">B140</option>
                      <option value="B142">B142</option>
                      <option value="B144">B144</option>
                      <option value="Brake Skid">Brake Skid</option>
                      <option value="Liner">Liner</option>
                      <option value="MP10">MP10</option>
                      <option value="SP-8">SP-8</option>
                    </select>
                  </div>
                  {/* {errors.patch && (
                    <p className="text-red-500 text-xs">
                      {errors.rejection.message}
                    </p>
                  )} */}
                </div>
                <div className="relative md:w-5/12 w-auto mt-5 sm:mt-0">
                  <InputField
                    label="Cantidad"
                    id="Cantidad"
                    {...register("numberPatches", { required: false })}
                  />
                  {/* {errors.numberPatches && (
                    <p className="text-red-500 text-xs">
                      Este campo es requerido
                    </p>
                  )} */}
                </div>
              </div>

              <div className="flex items-center flex-col sm:w-auto sm:flex-row sm:justify-between mt-10">
                <div className="w-[80%] sm:w-[40%]">
                  <select
                    {...register("patch2", { required: false })}
                    className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    size="4" /* Controla cuántas opciones se muestran sin scroll */
                  >
                    <option value="">Razón de rechazo ...</option>
                    <option value="B120">B120</option>
                    <option value="B122">B122</option>
                    <option value="B124">B124</option>
                    <option value="B140">B140</option>
                    <option value="B142">B142</option>
                    <option value="B144">B144</option>
                    <option value="Brake Skid">Brake Skid</option>
                    <option value="Liner">Liner</option>
                    <option value="MP10">MP10</option>
                    <option value="SP-8">SP-8</option>
                  </select>
                  {/* {errors.patch2 && (
                    <p className="text-red-500 text-xs">
                      {errors.rejection.message}
                    </p>
                  )} */}
                </div>
                <div className="relative md:w-5/12 w-auto mt-5 sm:mt-0">
                  <InputField
                    label="Cantidad"
                    id="Cantidad2"
                    {...register("numberPatches2", { required: false })}
                  />
                  {/* {errors.numberPatches2 && (
                    <p className="text-red-500 text-xs">
                      Este campo es requerido
                    </p>
                  )} */}
                </div>
              </div>

              <div className="flex items-center flex-col sm:w-auto sm:flex-row sm:justify-between mt-10">
                <div className="relative w-[80%] sm:w-[40%] ">
                  <select
                    {...register("patch3", { required: false })}
                    className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    size="4" /* Controla cuántas opciones se muestran sin scroll */
                  >
                    <option value="">Razón de rechazo ...</option>
                    <option value="B120">B120</option>
                    <option value="B122">B122</option>
                    <option value="B124">B124</option>
                    <option value="B140">B140</option>
                    <option value="B142">B142</option>
                    <option value="B144">B144</option>
                    <option value="Brake Skid">Brake Skid</option>
                    <option value="Liner">Liner</option>
                    <option value="MP10">MP10</option>
                    <option value="SP-8">SP-8</option>
                    <option value="Talón">Talón</option>
                    <option value="165 CT-10">165 CT-10</option>
                    <option value="170 CT-20">170 CT-20</option>
                    <option value="172 CT-22">172 CT-22</option>
                    <option value="174 CT-24">174 CT-24</option>
                    <option value="180 CT-40">180 CT-40</option>
                    <option value="182 CT-42">182 CT-42</option>
                    <option value="184 CT-44">184 CT-44</option>
                    <option value="RAD 120">RAD 120</option>
                    <option value="RAD 122">RAD 122</option>
                    <option value="RAD 124">RAD 124</option>
                    <option value="RAD 140">RAD 140</option>
                    <option value="RAD 142">RAD 142</option>
                    <option value="RAD 144">RAD 144</option>
                  </select>
                  {/* {errors.patch3 && (
                    <p className="text-red-500 text-xs">
                      {errors.patch3.message}
                    </p>
                  )} */}
                </div>
                <div className="relative md:w-5/12 w-auto mt-5 sm:mt-0">
                  <InputField
                    label="Cantidad"
                    id="Cantidad3"
                    {...register("numberPatches3", { required: false })}
                  />
                  {/* {errors.lastName && (
                    <p className="text-red-500 text-xs">
                      Este campo es requerido
                    </p>
                  )} */}
                </div>
              </div>

              <div className="flex items-center flex-col sm:w-auto sm:flex-row sm:justify-between mt-10">
                <div className="relative w-[80%] sm:w-[40%] ">
                  <select
                    {...register("patch4", { required: false })}
                    className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    size="4" /* Controla cuántas opciones se muestran sin scroll */
                  >
                    <option value="">Razón de rechazo ...</option>
                    <option value="B120">B120</option>
                    <option value="B122">B122</option>
                    <option value="B124">B124</option>
                    <option value="B140">B140</option>
                    <option value="B142">B142</option>
                    <option value="B144">B144</option>
                    <option value="Brake Skid">Brake Skid</option>
                    <option value="Liner">Liner</option>
                    <option value="MP10">MP10</option>
                    <option value="SP-8">SP-8</option>
                  </select>
                  {/* {errors.rejection && (
                    <p className="text-red-500 text-xs">
                      {errors.rejection.message}
                    </p>
                  )} */}
                </div>
                <div className="relative md:w-5/12 w-auto mt-5 sm:mt-0">
                  <InputField
                    label="Cantidad"
                    id="Cantidad4"
                    {...register("numberPatches4", { required: false })}
                  />
                  {/* {errors.lastName && (
                    <p className="text-red-500 text-xs">
                      Este campo es requerido
                    </p>
                  )} */}
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

export default SecondEditProduction;
