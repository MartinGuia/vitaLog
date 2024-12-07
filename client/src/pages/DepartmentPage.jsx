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

function DepartmentPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const {
    registerDepartment,
    getDepartments,
    allDepartments,
    errors: registerDepartmentErrors,
  } = useDepartment();

  useEffect(() => {
    getDepartments();
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const onSubmit = handleSubmit(async (values) => {
    registerDepartment(values);
    closeModal(); // Cierra el modal después de enviar
  });

  // Función para asignar iconos según el nombre del departamento
  const getIcon = (departmentName) => {
    switch (departmentName.toLowerCase()) {
      case "ventas":
        return <Truck color="white" size={38} />;
      case "almacén":
        return <PackageOpen color="white" size={38} />;
      case "administración":
        return <Archive color="white" size={38} />;
      case "producción":
        return <Settings color="white" size={38} />;
      default:
        return <Archive color="white" size={38} />; // Icono por defecto
    }
  };

  return (
    <>
      <div className="md:px-8 px-3 py-10 max-w-screen-2xl mx-auto select-none">
        <div>
          <h1 className="md:text-4xl flex justify-center font-bold mb-3 text-xl sm:text-2xl">
            Departamentos
          </h1>
        </div>
        <div className="flex justify-end">
          <button
            onClick={openModal}
            className="flex p-2 text-sm sm:text-base sm:p-3 bg-indigo-400 rounded-lg text-white cursor-pointer hover:bg-indigo-700 duration-500 hover:duration-500"
          >
            <CirclePlus className="mr-2 size-5 sm:size-6" />
            Añadir nuevo
          </button>
        </div>

        <div className="flex flex-col items-center justify-center mt-10">
          <div className="w-full sm:h-auto md:w-[70%] flex flex-wrap justify-between">
            {allDepartments.map((department, i) => (
              <div
                className="w-full sm:w-[48%] flex justify-center mt-5"
                key={i}
              >
                <Link
                  className="bg-cyan-950 rounded shadow-md w-full h-20 lg:h-28 hover:-translate-y-1 hover:duration-700 duration-700 flex justify-center"
                  to={`/department/${department._id}`}
                >
                  <button>
                    <span className="text-white font-semibold text-xl">
                      {department.name}
                    </span>
                    <div className="flex justify-center mt-2">
                      {getIcon(department.name)}
                    </div>
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md">
            <h2 className="text-xl font-bold mb-4">Nuevo Departamento</h2>
            <div className="flex top-10 absolute w-[100%]">
              {registerDepartmentErrors.map((error, i) => (
                <div
                  className="bg-red-500 py-2 text-white w-[100%] flex justify-center"
                  key={i}
                >
                  {error}
                </div>
              ))}
            </div>
            <form onSubmit={onSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Nombre
                </label>
                <input
                  {...register("name", { required: true })}
                  type="text"
                  className="mt-1 p-2 w-full border rounded-lg"
                  placeholder="Ingrese el nombre del departamento"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs">
                    Este campo es requerido
                  </p>
                )}
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-700"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default DepartmentPage;
// import React from "react";
// import { useDepartment } from "../context/DepartmentContext.jsx";
// import { useForm } from "react-hook-form";
// import { Link } from "react-router-dom";
// import { StepBack, Truck, PackageOpen, Settings, Archive, CirclePlus } from "lucide-react";

// function DepartmentPage() {
//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm();
//   const { registerDepartment, errors: registerDepartmentErrors } =
//     useDepartment();

//   const onSubmit = handleSubmit(async (values) => {
//     registerDepartment(values);
//     reset();
//   });

//   return (
//     <>
//       <div className="md:px-8 px-3 py-10 max-w-screen-2xl mx-auto select-none">
//         {/* <div>
//           <Link to="/client">
//             <button className="bg-cyan-950 rounded-md px-4 py-1 duration-500 hover:bg-cyan-800 hover:duration-500">
//               <StepBack color="white" />
//             </button>
//           </Link>
//         </div> */}
//         <div>
//           <h1 className="md:text-4xl flex justify-center font-bold mb-3 text-2xl">
//             Departamentos
//           </h1>
//         </div>
//         <div className="flex justify-end">
//         {/* <Link to="/add-department"> */}
//           <button className="flex p-3 bg-indigo-400 rounded-lg text-white cursor-pointer hover:bg-indigo-700 duration-500 hover:duration-500">
//             <CirclePlus className="mr-2" />
//             Añadir nuevo
//           </button>
//         {/* </Link> */}
//       </div>
//         <div className="flex flex-col items-center justify-center mt-10">

//           <div className="w-[100%] sm:h-40 sm:w-[50%] md:w-[70%] flex flex-col items-center sm:flex-row sm:justify-between">
//             <div className="w-[100%] h-[60%] flex justify-center mt-5 sm:mt-0">
//               <button className="bg-cyan-950 rounded shadow-md w-[60%] h-20 lg:h-28 sm:w-[90%] lg:w-[60%] hover:-translate-y-1 hover:duration-700 duration-700">
//                 <span className="text-white font-semibold text-xl">Ventas</span>
//                 <div className="flex justify-center mt-2">
//                   <Truck color="white" size={38} />
//                 </div>
//               </button>
//             </div>
//             <div className="w-[100%] h-[60%] flex justify-center mt-5 sm:mt-0">
//               <button className="bg-cyan-950 rounded shadow-md w-[60%] h-20 lg:h-28 sm:w-[90%] lg:w-[60%] hover:-translate-y-1 hover:duration-700 duration-700">
//                 <span className="text-white font-semibold text-xl">
//                   Almacen
//                 </span>
//                 <div className="flex justify-center mt-2">
//                   <PackageOpen color="white" size={38} />
//                 </div>
//               </button>
//             </div>
//           </div>

//           <div className="w-[100%] sm:h-40 sm:w-[50%] md:w-[70%] flex flex-col items-center sm:flex-row sm:justify-between mt-5 sm:mt-0">
//             <div className="w-[100%] h-[60%] flex justify-center">
//               <button className="bg-cyan-950 rounded shadow-md w-[60%] h-20 lg:h-28 sm:w-[90%] lg:w-[60%] hover:-translate-y-1 hover:duration-700 duration-700">
//                 <span className="text-white font-semibold text-xl">Ventas</span>
//                 <div className="flex justify-center mt-2">
//                   <Truck color="white" size={38} />
//                 </div>
//               </button>
//             </div>
//             <div className="w-[100%] h-[60%] flex justify-center mt-5 sm:mt-0">
//               <button className="bg-cyan-950 rounded shadow-md w-[60%] h-20 lg:h-28 sm:w-[90%] lg:w-[60%] hover:-translate-y-1 hover:duration-700 duration-700">
//                 <span className="text-white font-semibold text-xl">
//                   Almacen
//                 </span>
//                 <div className="flex justify-center mt-2">
//                   <PackageOpen color="white" size={38} />
//                 </div>
//               </button>
//             </div>
//           </div>
//           {/* <div className="w-[100%] sm:h-40 sm:w-[50%] md:w-[70%] flex flex-col sm:flex-row items-center sm:justify-between">
//             <div className="w-[100%] h-[60%] flex justify-center mt-5 sm:mt-0">
//               <button className="bg-cyan-950 rounded shadow-md w-[60%] h-20 lg:h-28 sm:w-[90%] lg:w-[60%] hover:-translate-y-1 hover:duration-700 duration-700">
//                 <span className="text-white font-semibold text-xl">
//                   Producción
//                 </span>
//                 <div className="flex justify-center mt-2">
//                   <Settings color="white" size={38} />
//                 </div>
//               </button>
//             </div>
//             <div className="w-[100%] h-[60%] flex justify-center mt-5 sm:mt-0">
//               <button className="bg-cyan-950 rounded shadow-md w-[60%] h-20 lg:h-28 sm:w-[90%] lg:w-[60%] hover:-translate-y-1 hover:duration-700 duration-700">
//                 <span className="text-white font-semibold text-xl">
//                   Administración
//                 </span>
//                 <div className="flex justify-center mt-2">
//                   <Archive color="white" size={38} />
//                 </div>
//               </button>
//             </div>
//           </div> */}
//         </div>

//       </div>
//     </>
//   );
// }

// export default DepartmentPage;
