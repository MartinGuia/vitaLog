import { useForm } from "react-hook-form";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useTire } from "../context/TireContext";
import { StepBack } from "lucide-react";
import { Select, SelectItem, Input } from "@heroui/react";

function EditRepairsPage() {
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

  const repairs = [
    { value: "B120", label: "B120" },
    { value: "B122", label: "B122" },
    { value: "B124", label: "B124" },
    { value: "B140", label: "B140" },
    { value: "B142", label: "B142" },
    { value: "B144", label: "B144" },
    { value: "Brake Skid", label: "Brake Skid" },
    { value: "Liner", label: "Liner" },
    { value: "MP10", label: "MP10" },
    { value: "SP-8", label: "SP-8" },
    { value: "Talón", label: "Talón" },
    { value: "165 CT-10", label: "165 CT-10" },
    { value: "170 CT-20", label: "170 CT-20" },
    { value: "172 CT-22", label: "172 CT-22" },
    { value: "174 CT-24", label: "174 CT-24" },
    { value: "180 CT-40", label: "180 CT-40" },
    { value: "182 CT-42", label: "182 CT-42" },
    { value: "184 CT-44", label: "184 CT-44" },
    { value: "RAD 120", label: "RAD 120" },
    { value: "RAD 122", label: "RAD 122" },
    { value: "RAD 124", label: "RAD 124" },
    { value: "RAD 140", label: "RAD 140" },
    { value: "RAD 142", label: "RAD 142" },
    { value: "RAD 144", label: "RAD 144" },
  ];

  return (
    <>
      <div className="md:px-8 px-3 py-10 max-w-screen-2xl mx-auto select-none">
        <div className="flex items-center gap-3 mb-6">
          <Link to={`/productionRepairs`}>
            <button className="bg-cyan-950 rounded-md px-4 py-1 duration-500 hover:bg-cyan-800 hover:duration-500">
              <StepBack color="white" />
            </button>
          </Link>
          <h1 className="text-2xl md:text-4xl font-bold">Reparaciones</h1>
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
          <h2 className="text-lg md:text-2xl font-semibold mb-3 text-sky-900">
            Estado de la llanta
          </h2>
          <p className="text-gray-600 mb-4">
            Especificar las reparaciones y la cantidad de cada una.
          </p>
          <div>
            <div className="w-[100%] pt-5 text-xl">
              <div className="flex items-center flex-col sm:w-auto sm:flex-row sm:justify-between">
                <div className=" w-[80%] sm:w-[40%]">
                  <div className="relative w-full">
                    <Select
                      className="shadow-md rounded-xl"
                      items={repairs}
                      label="Reparaciones"
                      placeholder="Selecciona un parche"
                      {...register("patch", { required: false })}
                    >
                      {(repair) => (
                        <SelectItem key={repair.value}>
                          {repair.label}
                        </SelectItem>
                      )}
                    </Select>
                  </div>
                  {/* {errors.patch && (
                    <p className="text-red-500 text-xs">
                      {errors.rejection.message}
                    </p>
                  )} */}
                </div>
                <div className="relative md:w-5/12 w-auto">
                  <Input
                    label="Cantidad"
                    className="shadow-md rounded-xl"
                    {...register("numberPatches", { required: false })}
                  />
                  {/* {errors.numberPatches && (
                    <p className="text-red-500 text-xs">
                      Este campo es requerido
                    </p>
                  )} */}
                </div>
              </div>

              <div className="flex items-center flex-col sm:w-auto sm:flex-row sm:justify-between mt-6">
                <div className="w-[80%] sm:w-[40%]">
                  <Select
                    className="shadow-md rounded-xl"
                    items={repairs}
                    label="Reparaciones"
                    placeholder="Selecciona un parche"
                    {...register("patch2", { required: false })}
                  >
                    {(repair) => (
                      <SelectItem key={repair.value}>{repair.label}</SelectItem>
                    )}
                  </Select>

                  {/* {errors.patch2 && (
                    <p className="text-red-500 text-xs">
                      {errors.rejection.message}
                    </p>
                  )} */}
                </div>
                <div className="relative md:w-5/12 w-auto">
                  <Input
                    label="Cantidad"
                    className="shadow-md rounded-xl"
                    {...register("numberPatches2", { required: false })}
                  />
                  {/* {errors.numberPatches2 && (
                    <p className="text-red-500 text-xs">
                      Este campo es requerido
                    </p>
                  )} */}
                </div>
              </div>

              <div className="flex items-center flex-col sm:w-auto sm:flex-row sm:justify-between mt-6">
                <div className="relative w-[80%] sm:w-[40%] ">
                  <Select
                    className="shadow-md rounded-xl"
                    items={repairs}
                    label="Reparaciones"
                    placeholder="Selecciona un parche"
                    {...register("patch3", { required: false })}
                  >
                    {(repair) => (
                      <SelectItem key={repair.value}>{repair.label}</SelectItem>
                    )}
                  </Select>
                  {/* {errors.patch3 && (
                    <p className="text-red-500 text-xs">
                      {errors.patch3.message}
                    </p>
                  )} */}
                </div>
                <div className="relative md:w-5/12 w-auto ">
                  <Input
                    label="Cantidad"
                    className="shadow-md rounded-xl"
                    {...register("numberPatches3", { required: false })}
                  />
                  {/* {errors.numberPatches3 && (
                    <p className="text-red-500 text-xs">
                      Este campo es requerido
                    </p>
                  )} */}
                </div>
              </div>

              <div className="flex items-center flex-col sm:w-auto sm:flex-row sm:justify-between mt-6">
                <div className="relative w-[80%] sm:w-[40%] ">
                  <Select
                    className="shadow-md rounded-xl"
                    items={repairs}
                    label="Reparaciones"
                    placeholder="Selecciona un parche"
                    {...register("patch4", { required: false })}
                  >
                    {(repair) => (
                      <SelectItem key={repair.value}>{repair.label}</SelectItem>
                    )}
                  </Select>
                  {/* <Select
                    className="max-w-xs shadow rounded-xl"
                    label="Reparaciones"
                    placeholder="Selecciona un parche"
                    selectionMode="multiple"
                    {...register("patch4", { required: false })}
                  >
                    {repairs.map((repair) => (
                      <SelectItem key={repair.value} value={repair.value}>
                        {repair.label}
                      </SelectItem>
                    ))}
                  </Select> */}
                  {/* {errors.rejection && (
                    <p className="text-red-500 text-xs">
                      {errors.rejection.message}
                    </p>
                  )} */}
                </div>
                <div className="relative md:w-5/12 w-auto sm:mt-0">
                  <Input
                    label="Cantidad"
                    className="sm shadow-md rounded-xl"
                    {...register("numberPatches4", { required: false })}
                  />
                  {/* {errors.numberPatches4 && (
                    <p className="text-red-500 text-xs">
                      Este campo es requerido
                    </p>
                  )} */}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-start mt-10">
            <button
              className="text-white font-medium bg-cyan-950 py-3 px-10 rounded-md shadow-md hover:bg-cyan-800 duration-500 hover:duration-500"
              type="submit"
            >
              Editar
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default EditRepairsPage;
