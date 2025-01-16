import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useWorkOrder } from "../context/WorkOrderContext";
import { useEffect } from "react";
import { useClient } from "../context/ClientContext";
import { useDeliveryOrder } from "../context/DeliveryOrderContext";

function DeliveryOrderPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { errors: registerErrors } = useAuth();
  const navigate = useNavigate();
  const { openDeliveryOrder } = useDeliveryOrder();
  const { getClients, allClients } = useClient();

  useEffect(() => {
    getClients();
  }, []);

  const onSubmit = handleSubmit((values) => {
    openDeliveryOrder(values);
    navigate("/add-tires");
  });

  return (
    <>
      <div className="px-4 lg:px-14 max-w-screen-2xl mx-auto select-none">
        <div className="text-center my-8">
          <h1 className="md:text-4xl flex justify-center font-bold mb-3 text-2xl">
            Crear Orden de Entrega
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
          <div className="p-4 w-full">
            <div className="mt-10">
              <div className="flex mb-3"></div>
              <h1 className="font-bold text-3xl">Orden de entrega</h1>
              <p>Seleccione el cliente para la orden de entrega.</p>
            </div>
            <div className="w-[100%] pt-8 text-xl flex justify-center">
              <div className="flex items-center flex-col lg:w-[30%] lg:flex-row lg:justify-between">
                <div className="relative w-[100%]">
                  <label className="block mb-2 text-sm font-medium">
                    Cliente
                  </label>
                  <select
                    {...register("client", { required: "Debe seleccionar un cliente." })}
                    id="small"
                    className="block w-full p-2 mb-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="">Seleccionar...</option>
                    {allClients.map((client, i) => (
                      <option key={i} value={client._id}>
                        {client.name}
                      </option>
                    ))}
                  </select>
                  {errors.client && (
                    <p className="text-red-500 text-base">
                      {errors.client.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="sm:flex sm:justify-center sm:mt-10">
            <button
              className="sm:w-[20%] text-white font-medium bg-yellow-400 hover:bg-yellow-500 py-2 px-5 rounded-md shadow-md hover:duration-500"
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

export default DeliveryOrderPage