import React, { useState, useEffect } from "react";
import { useDepartment } from "../context/DepartmentContext.jsx";
import { useForm } from "react-hook-form";
import {
  Truck,
  PackageOpen,
  Settings,
  Archive,
  CirclePlus,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "@heroui/react";

//  Componente para los iconos de los departamentos
const DepartmentIcon = ({ name }) => {
  const icons = {
    ventas: <Truck className="text-white" size={38} />,
    almacén: <PackageOpen className="text-white" size={38} />,
    administración: <Archive className="text-white" size={38} />,
    producción: <Settings className="text-white" size={38} />,
  };
  return (
    icons[name.toLowerCase()] || <Archive className="text-white" size={38} />
  );
};

//  Componente del Modal
const DepartmentModal = ({
  isOpen,
  onClose,
  onSubmit,
  register,
  errors,
  serverErrors,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md">
        <h2 className="text-xl font-bold mb-4">Nuevo Departamento</h2>

        {/*  Mensajes de error */}
        {serverErrors.length > 0 && (
          <div className="bg-red-500 py-2 text-white text-center mb-4 rounded">
            {serverErrors.map((error, i) => (
              <p key={i}>{error}</p>
            ))}
          </div>
        )}

        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <Input
              {...register("name", { required: "Este campo es requerido" })}
              label="Ingrese el nombre del departamento"
              type="text"
              variant={"underlined"}
            />
            {errors.name && (
              <p className="text-red-500 text-xs">{errors.name.message}</p>
            )}
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-white rounded-lg bg-red-600 hover:bg-red-700 font-semibold duration-500 hover:duration-500"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white rounded-lg bg-buttonPrimaryHover hover:bg-buttonPrimary duration-500 hover:duration-500 font-medium"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

//  Componente Principal
function AllDepartmentsPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const {
    registerDepartment,
    getDepartments,
    allDepartments,
    errors: registerDepartmentErrors,
  } = useDepartment();

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getDepartments();
  }, []);

  const onSubmit = handleSubmit(async (values) => {
    registerDepartment(values);
    reset();
    setIsModalOpen(false);
  });

  return (
    <div className="md:px-8 px-3 py-10 max-w-screen-2xl mx-auto select-none">
      <h1 className="md:text-4xl text-2xl font-bold text-center mb-6">
        Departamentos
      </h1>

      {/*  Botones superiores */}
      <div className="flex justify-end mt-6">
        <div className="sm:w-[80%] lg:w-[50%] 2xl:w-[30%] flex flex-col items-end md:flex-row md:justify-between gap-3">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center p-2 md:pd-3 bg-buttonSecondary rounded-lg text-white cursor-pointer hover:bg-buttonSecondaryHover transition"
          >
            <CirclePlus className="mr-2 size-5 sm:size-6" />
            Nuevo departamento
          </button>
          <Link to="/register">
            <button className="flex items-center justify-center p-2 md:pd-3 bg-buttonTertiary rounded-lg text-white cursor-pointer hover:bg-buttonTertiaryHover transition">
              <CirclePlus className="mr-2 size-5 sm:size-6" />
              Nuevo usuario
            </button>
          </Link>
        </div>
      </div>

      {/* Lista de departamentos */}
      <div className="flex flex-col items-center justify-center mt-5">
        {allDepartments?.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">
            No hay departamentos registrados
          </p>
        ) : (
          <div className="w-full sm:h-auto md:w-[70%] flex flex-wrap justify-between">
            {allDepartments.map((department) => (
              <Link
                key={department._id}
                to={`/department/${department._id}`}
                className="w-full sm:w-[48%] flex justify-center mt-5"
              >
                <button className="bg-colorPrimary rounded-lg shadow-md w-full h-24 lg:h-32 hover:-translate-y-1 transition transform flex flex-col items-center justify-center p-3">
                  <span className="text-white font-semibold text-lg">
                    {department.name}
                  </span>
                  <DepartmentIcon name={department.name} />
                </button>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/*  Modal para agregar nuevo departamento */}
      <DepartmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={onSubmit}
        register={register}
        errors={errors}
        serverErrors={registerDepartmentErrors}
      />
    </div>
  );
}

export default AllDepartmentsPage;