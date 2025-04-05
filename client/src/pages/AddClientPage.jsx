import { useForm } from "react-hook-form";
import { useClient } from "../context/ClientContext";
import { StepBack } from "lucide-react";
import { Link } from "react-router-dom";
import Alert from "../components/ui/Alert.jsx"; // Importa tu componente de alerta}
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@heroui/react";

function AddClientPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { registerClient, errors: registerClientErrors } = useClient();
  const [alert, setAlert] = useState(null); // Estado para manejar la alerta
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (values) => {
    registerClient(values);
    setAlert({
      message: "Cliente registrado exitosamente",
      type: "success",
      onAccept: () => navigate(`/clients`), // Redirige tras cerrar la alerta
    });
  });

  return (
    <>
      <div className="md:px-8 px-3 py-10 max-w-screen-2xl mx-auto select-none">
        <div>
          <div className="flex items-center gap-3 mb-6">
            <Link to="/clients">
              <button className="bg-buttonPrimaryHover hover:bg-buttonPrimary shadow-md rounded-md px-4 py-1 duration-500 hover:duration-500">
                <StepBack color="white" />
              </button>
            </Link>
            <h1 className="text-2xl md:text-4xl font-bold">
              Añadir Cuenta Local
            </h1>
          </div>
          {alert && (
            <Alert
              message={alert.message}
              type={alert.type}
              onAccept={alert.onAccept} // Maneja el cierre de la alerta con redirección
            />
          )}
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
        </div>
        <form onSubmit={onSubmit}>
          <div>
            <h2 className="text-lg md:text-2xl font-semibold mb-2 text-sky-900 mt-12">
              Nombre y Alias
            </h2>
            <p className="text-gray-600 font-medium">
              Complete el nombre de la cuenta.
            </p>
            <div className="w-[100%] pt-8 text-xl">
              <div className="flex items-center flex-col sm:w-auto sm:flex-row sm:justify-between">
                <div className="relative md:w-5/12 w-auto">
                  <Input
                    label="Nombre"
                    type="text"
                    variant={"underlined"}
                    {...register("name", { required: true })}
                  />
                  {/* <InputField
                    label="Nombre"
                    id="nombre"
                    {...register("name", { required: true })}
                  /> */}
                  {errors.name && (
                    <p className="text-red-500 text-xs">
                      Este campo es requerido
                    </p>
                  )}
                </div>
                <div className="relative md:w-5/12 w-auto mt-5 sm:mt-0">
                  <Input
                    label="Alias"
                    type="text"
                    variant={"underlined"}
                    {...register("alias", { required: true })}
                  />
                  {/* <InputField
                    label="Alias"
                    id="alias"
                    {...register("alias", { required: true })}
                  /> */}
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
              Complete la dirección de la cuenta. Esta dirección se mostrará en
              todas partes en el sistema al seleccionar la cuenta.
            </p>
            <div className="w-[100%] pt-8 text-xl">
              <div className="flex items-center flex-col sm:w-auto sm:flex-row sm:justify-between">
                <div className="relative w-auto sm:w-5/12">
                  <Input
                    label="Dirección"
                    type="text"
                    variant={"underlined"}
                    {...register("address1", { required: true })}
                  />
                  {/* <InputField
                    label="Dirección 1"
                    id="dirección1"
                    {...register("address1", { required: true })}
                  /> */}
                  {errors.address1 && (
                    <p className="text-red-500 text-xs">
                      Este campo es requerido
                    </p>
                  )}
                </div>
                <div className="flex-col flex items-center sm:flex sm:w-[50%] sm:flex-row justify-between">
                  <div className="relative w-auto sm:w-5/12 mt-4 sm:mt-0">
                    <Input
                      label="Ciudad"
                      type="text"
                      variant={"underlined"}
                      {...register("city", { required: true })}
                    />
                    {/* <InputField
                      label="Ciudad"
                      id="Ciudad"
                      {...register("city", { required: true })}
                    /> */}
                    {errors.city && (
                      <p className="text-red-500 text-xs">
                        Este campo es requerido
                      </p>
                    )}
                  </div>
                  <div className="relative w-auto sm:w-5/12 mt-4 sm:mt-0">
                    <Input
                      label="Región"
                      type="text"
                      variant={"underlined"}
                      {...register("region", { required: true })}
                    />
                    {/* <InputField
                      label="Región"
                      id="Region"
                      {...register("region", { required: true })}
                    /> */}
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
                    <Input
                      label="Código Postal"
                      type="text"
                      variant={"underlined"}
                      {...register("zipCode", { required: true })}
                    />
                    {/* <InputField
                      label="Codigo Postal"
                      id="CodigoPostal"
                      {...register("zipCode", { required: true })}
                    /> */}
                    {errors.zipCode && (
                      <p className="text-red-500 text-xs">
                        Este campo es requerido
                      </p>
                    )}
                  </div>
                  <div className="relative w-auto sm:w-5/12 mt-4 sm:mt-0">
                    <Input
                      label="País"
                      type="text"
                      variant={"underlined"}
                      {...register("country", { required: true })}
                    />
                    {/* <InputField
                      label="País"
                      id="País"
                      {...register("country", { required: true })}
                    /> */}
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

export default AddClientPage;
