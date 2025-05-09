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
              Nombre y datos
            </h2>
            <p className="text-gray-600 font-medium">
              Complete el nombre de la cuenta y datos fiscales.
            </p>

            <div className="flex items-center flex-col pt-5 md:pt-2 sm:w-auto sm:flex-row sm:justify-between">
              <div className="relative w-5/6 sm:w-5/12">
                <Input
                  label="Nombre del cliente"
                  type="text"
                  variant={"underlined"}
                  {...register("companyName", { required: true })}
                />
                {/* <InputField
                    label="Dirección 1"
                    id="dirección1"
                    {...register("address1", { required: true })}
                  /> */}
                {errors.companyName && (
                  <p className="text-red-500 text-xs">
                    Este campo es requerido
                  </p>
                )}
              </div>
              <div className="flex-col flex items-center w-[100%] sm:flex sm:w-[50%] sm:flex-row justify-between">
                <div className="relative w-5/6 sm:w-5/12 mt-4 sm:mt-0">
                  <Input
                    label="Código del cliente"
                    type="text"
                    variant={"underlined"}
                    {...register("clientCode", { required: true })}
                  />
                  {/* <InputField
                      label="Ciudad"
                      id="Ciudad"
                      {...register("city", { required: true })}
                    /> */}
                  {errors.clientCode && (
                    <p className="text-red-500 text-xs">
                      Este campo es requerido
                    </p>
                  )}
                </div>
                <div className="relative w-5/6 sm:w-5/12 mt-4 sm:mt-0">
                  <Input
                    label="RFC"
                    type="text"
                    variant={"underlined"}
                    {...register("Rfc", { required: true })}
                  />
                  {/* <InputField
                      label="Región"
                      id="Region"
                      {...register("region", { required: true })}
                    /> */}
                  {errors.Rfc && (
                    <p className="text-red-500 text-xs">
                      Este campo es opcional
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-lg md:text-2xl font-semibold mb-2 text-sky-900 mt-12">
              Dirección 
            </h2>
            <p className="text-gray-600 font-medium">
              Complete los datos de dirección
            </p>
            <div className="w-[100%] pt-5 md:pt-2 text-xl">
              <div className="flex-col flex items-center sm:flex sm:w-[100%] sm:flex-row justify-between md:gap-16">
                <div className="relative w-5/6 sm:w-5/12">
                  <Input
                    label="Número Interior"
                    type="text"
                    variant={"underlined"}
                    {...register("interiorNumber", { required: true })}
                  />
                  {/* <InputField
                    label="Dirección 1"
                    id="dirección1"
                    {...register("address1", { required: true })}
                  /> */}
                  {errors.interiorNumber && (
                    <p className="text-red-500 text-xs">
                      Este campo es requerido
                    </p>
                  )}
                </div>
                <div className="relative w-5/6 sm:w-5/12 mt-4 sm:mt-0">
                  <Input
                    label="Número Externo"
                    type="text"
                    variant={"underlined"}
                    {...register("externalNumber", { required: true })}
                  />
                  {/* <InputField
                      label="Ciudad"
                      id="Ciudad"
                      {...register("city", { required: true })}
                    /> */}
                  {errors.externalNumber && (
                    <p className="text-red-500 text-xs">
                      Este campo es requerido
                    </p>
                  )}
                </div>
                <div className="relative w-5/6 sm:w-5/12 mt-4 sm:mt-0">
                  <Input
                    label="Código Postal"
                    type="text"
                    variant={"underlined"}
                    {...register("zipCode", { required: true })}
                  />
                  {/* <InputField
                      label="Región"
                      id="Region"
                      {...register("region", { required: true })}
                    /> */}
                  {errors.zipCode && (
                    <p className="text-red-500 text-xs">
                      Este campo es opcional
                    </p>
                  )}
                </div>
                <div className="relative w-5/6 sm:w-5/12 mt-4 sm:mt-0">
                  <Input
                    label="Calle"
                    type="text"
                    variant={"underlined"}
                    {...register("street", { required: true })}
                  />
                  {/* <InputField
                      label="Región"
                      id="Region"
                      {...register("region", { required: true })}
                    /> */}
                  {errors.street && (
                    <p className="text-red-500 text-xs">
                      Este campo es opcional
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-lg md:text-2xl font-semibold mb-2 text-sky-900 mt-12">
              Dirección 
            </h2>
            <p className="text-gray-600 font-medium">
              Complete la dirección de la cuenta. Esta dirección se mostrará en
              todas partes en el sistema al seleccionar la cuenta.
            </p>
            <div className="w-[100%] pt-5 md:pt-2 text-xl">
              <div className="flex-col flex items-center sm:flex sm:w-[100%] sm:flex-row justify-between md:gap-16">
                <div className="relative w-5/6 sm:w-5/12 ">
                  <Input
                    label="Colonia"
                    type="text"
                    variant={"underlined"}
                    {...register("suburb", { required: true })}
                  />
                  {/* <InputField
                    label="Dirección 1"
                    id="dirección1"
                    {...register("address1", { required: true })}
                  /> */}
                  {errors.suburb && (
                    <p className="text-red-500 text-xs">
                      Este campo es requerido
                    </p>
                  )}
                </div>
                <div className="relative w-5/6 sm:w-5/12 mt-4 sm:mt-0">
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
                <div className="relative w-5/6 sm:w-5/12 mt-4 sm:mt-0">
                  <Input
                    label="Municipio"
                    type="text"
                    variant={"underlined"}
                    {...register("municipality", { required: true })}
                  />
                  {/* <InputField
                      label="Región"
                      id="Region"
                      {...register("region", { required: true })}
                    /> */}
                  {errors.municipality && (
                    <p className="text-red-500 text-xs">
                      Este campo es opcional
                    </p>
                  )}
                </div>
                <div className="relative w-5/6 sm:w-5/12 mt-4 sm:mt-0">
                  <Input
                    label="Estado"
                    type="text"
                    variant={"underlined"}
                    {...register("state", { required: true })}
                  />
                  {/* <InputField
                      label="Región"
                      id="Region"
                      {...register("region", { required: true })}
                    /> */}
                  {errors.state && (
                    <p className="text-red-500 text-xs">
                      Este campo es opcional
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg md:text-2xl font-semibold mb-2 text-sky-900 mt-12">
              Correo
            </h2>
            <p className="text-gray-600 font-medium">
              Complete la dirección de correo electronica de la empresa
            </p>
            <div className="w-[100%] pt-5 md:pt-2 text-xl">
              <div className="flex-col flex items-center sm:flex sm:w-[100%] sm:flex-row justify-between md:gap-16">
                <div className="relative w-5/6 sm:w-5/12">
                  <Input
                    label="Correo"
                    type="email"
                    variant={"underlined"}
                    {...register("eMail", { required: true })}
                  />
                  {/* <InputField
                    label="Dirección 1"
                    id="dirección1"
                    {...register("address1", { required: true })}
                  /> */}
                  {errors.eMail && (
                    <p className="text-red-500 text-xs">
                      Este campo es requerido
                    </p>
                  )}
                </div>        
              </div>
            </div>
          </div>


          <div className="flex justify-end mt-10">
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
