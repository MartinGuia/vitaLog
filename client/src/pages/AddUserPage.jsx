import { useForm } from "react-hook-form";
import { StepBack } from "lucide-react";
import { Link } from "react-router-dom";
import { useDepartment } from "../context/DepartmentContext.jsx";
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { Input, Select, SelectItem } from "@heroui/react";
import AlertComponent from "../components/ui/AlertComponent";

function AddUserPage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [alertData, setAlertData] = useState(null); // Para controlar si mostrar el Alert

  const { getDepartments, allDepartments } = useDepartment();

  const { signup, getRoles, allRoles, errors: registerErrors } = useAuth();

  useEffect(() => {
    getDepartments();
    getRoles();
  }, []);

  const onSubmit = handleSubmit(async (values) => {
    signup(values);
    reset();
    setAlertData({
      title: "¡Exito!",
      description: "Usuario registrado exitosamente",
      color: "success",
    });
    navigate(`/departments`)
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

        <div className="flex items-center gap-3 mb-6">
          <Link to="/departments">
            <button className="bg-buttonPrimaryHover hover:bg-buttonPrimary shadow-md rounded-md px-4 py-1 duration-500 hover:duration-500">
              <StepBack color="white" />
            </button>
          </Link>
          <h1 className="text-2xl md:text-4xl font-bold">Añadir Usuario</h1>
        </div>
        {alertData && (
          <AlertComponent
            title={alertData.title}
            description={alertData.description}
            color={alertData.color}
            onClose={() => setAlertData(null)} // Esta es la función que se ejecutará después de 3 segundos
          />
        )}
        <form onSubmit={onSubmit}>
          <div>
            <h2 className="text-lg md:text-2xl font-semibold mb-3 text-sky-900">
              Datos de usuario
            </h2>
            <p className="text-gray-600 font-medium">
              Complete el nombre y apellido del usuario.
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

                  {errors.name && (
                    <p className="text-red-500 text-xs">
                      Este campo es requerido
                    </p>
                  )}
                </div>
                <div className="relative md:w-5/12 w-auto mt-5 sm:mt-0">
                  <Input
                    label="Apellido"
                    type="text"
                    variant={"underlined"}
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
            <div className="mt-8">
              <h2 className="text-lg md:text-2xl font-semibold mb-3 text-sky-900">
                Usuario y Contraseña
              </h2>
              <p className="text-gray-600 font-medium">
                Complete el usuario y contraseña.
              </p>
            </div>
            <div className="w-[100%] pt-8 text-xl">
              <div className="flex items-center flex-col sm:w-auto sm:flex-row sm:justify-between">
                <div className="relative md:w-5/12 w-auto">
                  <Input
                    label="Usuario"
                    type="text"
                    variant={"underlined"}
                    {...register("userName", { required: true })}
                  />

                  {errors.userName && (
                    <p className="text-red-500 text-xs">
                      Este campo es requerido
                    </p>
                  )}
                </div>
                <div className="relative md:w-5/12 w-auto mt-5 sm:mt-0">
                  <Input
                    label="Contraseña"
                    type="text"
                    variant={"underlined"}
                    {...register("password", { required: true })}
                  />

                  {errors.password && (
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
            <div className="mt-8">
              <h2 className="text-lg md:text-2xl font-semibold mb-3 text-sky-900">
                Rol y Departamento
              </h2>
              <p className="text-gray-600 font-medium">
                Complete el rol y el departamento del usuario.
              </p>
            </div>
            <div className="w-[100%] pt-8 text-xl">
              <div className="flex flex-col items-center sm:flex-row sm:justify-between">
                <div className="relative w-[80%] md:w-[40%]">
                  <Select
                    className="shadow-md rounded-xl "
                    // items={allDepartments}
                    label="Departamentos"
                    placeholder="Selecciona un departamento"
                    {...register("department", {
                      required: "Debe seleccionar un departamento.",
                    })}
                  >
                    {allDepartments.map((department) => (
                      <SelectItem key={department._id} value={department._id}>
                        {department.name}
                      </SelectItem>
                    ))}
                  </Select>

                  {errors.department && (
                    <p className="text-red-500 text-base">
                      {errors.department.message}
                    </p>
                  )}
                </div>
                <div className="relative w-[80%] md:w-[40%] mt-5 md:mt-0">
                  <Select
                    className="shadow-md rounded-xl "
                    items={allRoles}
                    label="Roles"
                    placeholder="Selecciona un rol"
                    {...register("role", {
                      required: "Debe seleccionar un Rol.",
                    })}
                  >
                    {allRoles.map((role) => (
                      <SelectItem key={role._id} value={role._id}>
                        {role.name}
                      </SelectItem>
                    ))}
                  </Select>
                  {errors.role && (
                    <p className="text-red-500 text-base">
                      {errors.role.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-14">
            <button
              className=" text-white font-medium bg-buttonSecondary py-2 px-5 rounded-md shadow-md hover:bg-buttonSecondaryHover duration-500 hover:duration-500 "
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
