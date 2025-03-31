import React from "react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import InputField from "../components/ui/InputField.jsx";
import { useForm } from "react-hook-form";
import { StepBack } from "lucide-react";
import { useClient } from "../context/ClientContext.jsx";
import Alert from "../components/ui/Alert.jsx"; // Importa tu componente de alerta

function EditClientPage() {
  const params = useParams();
  const { getClient, updateClient, errors: registerClientErrors } = useClient();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [alert, setAlert] = useState(null); // Estado para manejar la alerta

  const showAlert = (message, type = "success") => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 3000);
  };

  useEffect(() => {
    async function loadClient() {
      if (params.id) {
        const clientById = await getClient(params.id);
        if (clientById) {
          reset({
            name: clientById.name,
            alias: clientById.alias,
            address1: clientById.address1,
            city: clientById.city,
            region: clientById.region,
            zipCode: clientById.zipCode,
            country: clientById.country,
          });
        }
      }
    }
    loadClient();
  }, []);

  const onSubmit = handleSubmit(async (values) => {
    const updatedValues = Object.fromEntries(
      Object.entries(values).filter(([key, value]) => value !== "")
    );

    try {
      await updateClient(params.id, updatedValues);
      showAlert("Cliente actualizado correctamente", "success");
      // navigate("/clients");
    } catch (error) {
      console.error(error);
      showAlert("Error al actualizar cliente. Intenta nuevamente.", "error");
    }
  });

  return (
    <>
      <div className="md:px-8 px-3 py-10 max-w-screen-2xl mx-auto select-none">
        {alert && (
          <Alert
            message={alert.message}
            type={alert.type}
            onClose={() => setAlert(null)}
          />
        )}
        <div className="flex items-center gap-3 mb-6">
          <Link to="/clients">
            <button className="bg-buttonPrimaryHover hover:bg-buttonPrimary shadow-md rounded-md px-4 py-1 duration-500 hover:duration-500">
              <StepBack color="white" />
            </button>
          </Link>
          <h1 className="text-2xl md:text-4xl font-bold">Editar Cliente</h1>
        </div>
        <div className="flex top-10 absolute w-[100%]">
          {registerClientErrors.map((error, i) => (
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
              Nombre y Alias
            </h2>
            <p className="text-gray-600 font-medium">
              Actualicé el nombre de la cuenta.
            </p>
            <div className="w-[100%] mt-6 text-xl">
              <div className="flex items-center flex-col sm:w-auto sm:flex-row sm:justify-between">
                <div className="relative md:w-5/12 w-auto">
                  <InputField {...register("name", { required: true })} />
                  {errors.name && (
                    <p className="text-red-500 text-xs">
                      Este campo es requerido
                    </p>
                  )}
                </div>
                <div className="relative md:w-5/12 w-auto mt-5 sm:mt-0">
                  <InputField {...register("alias", { required: true })} />
                  {errors.alias && (
                    <p className="text-red-500 text-xs">
                      Este campo es requerido
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-lg md:text-2xl font-semibold mb-2 text-sky-900 mt-12">
              Dirección y datos
            </h2>
            <p className="text-gray-600 font-medium">
              Actualice la dirección de la cuenta. Esta dirección se mostrará en
              todas partes en el sistema al seleccionar la cuenta.
            </p>
            <div className="w-[100%] mt-6 text-xl">
              <div className="flex items-center flex-col sm:w-auto sm:flex-row sm:justify-between">
                <div className="relative w-auto sm:w-5/12">
                  <InputField {...register("address1", { required: true })} />
                  {errors.address1 && (
                    <p className="text-red-500 text-xs">
                      Este campo es requerido
                    </p>
                  )}
                </div>
                <div className="flex-col flex items-center sm:flex sm:w-[50%] sm:flex-row justify-between">
                  <div className="relative w-auto sm:w-5/12 mt-4 sm:mt-0">
                    <InputField {...register("city", { required: true })} />
                    {errors.city && (
                      <p className="text-red-500 text-xs">
                        Este campo es requerido
                      </p>
                    )}
                  </div>
                  <div className="relative w-auto sm:w-5/12 mt-4 sm:mt-0">
                    <InputField {...register("region", { required: true })} />
                    {errors.region && (
                      <p className="text-red-500 text-xs">
                        Este campo es opcional
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center flex-col sm:w-auto sm:flex-row sm:justify-between mt-5">
                <div className="flex-col flex items-center sm:flex sm:w-[50%] sm:flex-row justify-between">
                  <div className="relative w-auto sm:w-5/12 mt-4 sm:mt-0">
                    <InputField {...register("zipCode", { required: true })} />
                    {errors.zipCode && (
                      <p className="text-red-500 text-xs">
                        Este campo es requerido
                      </p>
                    )}
                  </div>
                  <div className="relative w-auto sm:w-5/12 mt-4 sm:mt-0">
                    <InputField {...register("country", { required: true })} />
                    {errors.zipCode && (
                      <p className="text-red-500 text-xs">
                        Este campo es requerido
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-14">
            <button
              className=" text-white font-medium bg-buttonSecondary py-3 px-8 rounded-md shadow-md hover:bg-buttonSecondaryHover duration-500 hover:duration-500 "
              type="submit"
            >
              Actualizar
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default EditClientPage;
