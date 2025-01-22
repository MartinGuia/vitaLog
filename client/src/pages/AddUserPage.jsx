import InputField from "../components/ui/InputField.jsx";
import { useForm } from "react-hook-form";
import { StepBack } from "lucide-react";
import { Link } from "react-router-dom";
import { useDepartment } from "../context/DepartmentContext.jsx";
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import Alert from "../components/ui/Alert.jsx"; // Importa tu componente de alerta
import { useNavigate } from "react-router-dom";

function AddUserPage() {
  const [alert, setAlert] = useState(null); // Estado para manejar la alerta
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { getDepartments, allDepartments } = useDepartment();

  const { signup, getRoles, allRoles, errors: registerErrors } = useAuth();

  useEffect(() => {
    getDepartments();
    getRoles();
  }, []);

  const onSubmit = handleSubmit(async (values) => {
    signup(values);
    setAlert({
      message: "Usuario actualizado exitosamente",
      type: "success",
      onAccept: () => navigate(`/departments`), // Redirige tras cerrar la alerta
    });
  });

  return (
    <>
      <div className="md:px-8 px-3 py-10 max-w-screen-2xl mx-auto select-none">
        <div className="flex justify-center w-[100%]">
          {registerErrors.map((error, i) => (
            <div
              className="bg-red-500 py-2 text-white flex justify-center w-[50%] rounded-md"
              key={i}
            >
              {error}
            </div>
          ))}
        </div>
        {alert && (
          <Alert
            message={alert.message}
            type={alert.type}
            onAccept={alert.onAccept} // Maneja el cierre de la alerta con redirección
          />
        )}
        <div>
          <Link to="/departments">
            <button className="bg-cyan-950 rounded-md px-4 py-1 duration-500 hover:bg-cyan-800 hover:duration-500">
              <StepBack color="white" />
            </button>
          </Link>
        </div>
        <div>
          <h1 className="md:text-4xl flex justify-center font-bold mb-3 text-2xl">
            Añadir Usuarios
          </h1>
        </div>
        <form onSubmit={onSubmit}>
          <div>
            <div className="mt-10">
              <div className="flex mb-3">
                <h1 className="text-lg flex text-sky-900 font-semibold w-[50%] md:text-3xl md:w-[70%] lg:w-[25%] ">
                  Datos de usuario
                </h1>
                <div className="flex items-center w-[100%]">
                  <hr className="border-[1px] w-[100%] border-sky-800 mt-1" />
                </div>
              </div>
              <h1 className="font-bold text-3xl">Nombres</h1>
              <p>Complete el nombre y apellido del usuario.</p>
            </div>
            <div className="w-[100%] pt-8 text-xl">
              <div className="flex items-center flex-col sm:w-auto sm:flex-row sm:justify-between">
                <div className="relative md:w-5/12 w-auto">
                  <InputField
                    label="Nombre"
                    id="nombre"
                    {...register("name", { required: true })}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs">
                      Este campo es requerido
                    </p>
                  )}
                </div>
                <div className="relative md:w-5/12 w-auto mt-5 sm:mt-0">
                  <InputField
                    label="Apellido"
                    id="apellido"
                    {...register("lastName", { required: true })}
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

          {/* Apartado de usuario y contraseña */}
          <div>
            <div className="mt-10">
              <h1 className="font-bold text-3xl">Usuario y Contraseña</h1>
              <p>Complete el usuario y contraseña.</p>
            </div>
            <div className="w-[100%] pt-8 text-xl">
              <div className="flex items-center flex-col sm:w-auto sm:flex-row sm:justify-between">
                <div className="relative md:w-5/12 w-auto">
                  <InputField
                    label="Usuario"
                    id="usuario"
                    {...register("userName", { required: true })}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs">
                      Este campo es requerido
                    </p>
                  )}
                </div>
                <div className="relative md:w-5/12 w-auto mt-5 sm:mt-0">
                  <InputField
                    label="Contraseña"
                    id="contraseña"
                    {...register("password", { required: true })}
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
          {/* Fin del apaertado de usuario y contraseña */}

          <div>
            <div className="mt-10">
              <h1 className="font-bold text-3xl">Rol y Departamento</h1>
              <p>Complete el rol y el departamento del usuario.</p>
            </div>
            <div className="w-[100%] pt-8 text-xl">
              <div className="flex flex-col items-center sm:flex-row sm:justify-between">
                <div className="relative w-[40%] ">
                  <label className="block mb-2 text-sm font-medium">
                    Departamento
                  </label>
                  <select
                    {...register("department", {
                      required: "Debe seleccionar un departamento.",
                    })}
                    id="small"
                    className="block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option defaultValue={"Seleccionar"}>Seleccionar...</option>
                    {allDepartments.map((department, i) => (
                      <option key={i} value={department._id}>
                        {department.name}
                      </option>
                    ))}
                  </select>
                  {errors.address2 && (
                    <p className="text-red-500 text-xs">
                      Este campo es requerido
                    </p>
                  )}
                </div>
                <div className="relative w-[40%] ">
                  <label className="block mb-2 text-sm font-medium">Rol</label>
                  <select
                    {...register("role", {
                      required: "Debe seleccionar un rol.",
                    })}
                    className="block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option defaultValue={"Seleccionar"}>Seleccionar...</option>
                    {allRoles.map((role, i) => (
                      <option key={i} value={role._id}>
                        {role.name}
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

          <div className="flex justify-end mt-14">
            <button
              className=" text-white font-medium bg-cyan-950 py-2 px-5 rounded-md shadow-md hover:bg-cyan-800 duration-500 hover:duration-500 "
              type="submit"
            >
              Registrar
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddUserPage;
