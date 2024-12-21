import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useWorkOrder } from "../context/WorkOrderContext";
import { useEffect } from "react";
import { useClient } from "../context/ClientContext";

function CreateWorkOrderPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { errors: registerErrors } = useAuth();
  const navigate = useNavigate();
  const { openWorkOrder } = useWorkOrder();
  const { getClients, allClients } = useClient();

  useEffect(() => {
    getClients();
  }, []);

  const onSubmit = handleSubmit((values) => {
    openWorkOrder(values);
    navigate("/add-tire");
  });

  return (
    <>
      <div className="md:px-8 px-3 py-10 max-w-screen-2xl mx-auto select-none">
        <div>
          <h1 className="md:text-4xl flex justify-center font-bold mb-3 text-2xl">
            Crear Orden de trabajo
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
              </div>
              <h1 className="font-bold text-3xl">Orden de trabajo</h1>
              <p>Seleccione el cliente para la orden de trabajo.</p>
            </div>
            <div className="w-[100%] pt-8 text-xl">
              <div className="flex items-center flex-col sm:w-auto sm:flex-row sm:justify-between">
              <div className="relative w-[40%] ">
                  <label className="block mb-2 text-sm font-medium">
                    Cliente
                  </label>
                  <select
                    {...register("client", { required: true })}
                    id="small"
                    className="block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option defaultValue={"Seleccionar"}>Seleccionar...</option>
                    {allClients.map((client, i) => (
                      <option key={i} value={client._id}>
                        {client.name}
                      </option>
                    ))}
                  </select>
                  {errors.address2 && (
                    <p className="text-red-500 text-xs">
                      Este campo es requerido
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="sm:flex sm:justify-center sm:mt-10">
                <button
                  className="sm:w-[20%] text-white font-medium bg-yellow-400 hover:bg-yellow-500 py-2 px-5 rounded-md shadow-md  hover:duration-500 "
                  type="submit"
                >
                  Crear orden
                </button>
              </div>
        </form>
      </div>
    </>
  );
}

export default CreateWorkOrderPage;
