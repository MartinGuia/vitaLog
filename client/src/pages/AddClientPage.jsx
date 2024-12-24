import InputField from "../components/ui/InputField";
import { useForm } from "react-hook-form";
import { useClient } from "../context/ClientContext";
import { StepBack } from "lucide-react";
import { Link } from "react-router-dom";

function AddClientPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { registerClient, errors: registerClientErrors } = useClient();

  const onSubmit = handleSubmit(async (values) => {
    registerClient(values);
    reset();
  });

  return (
    <>
      <div className="md:px-8 px-3 py-10 max-w-screen-2xl mx-auto select-none">
        <div>
          <Link to="/clients">
            <button className="bg-cyan-950 rounded-md px-4 py-1 duration-500 hover:bg-cyan-800 hover:duration-500">
              <StepBack color="white" />
            </button>
          </Link>
        </div>
        <div>
          <h1 className="md:text-4xl flex justify-center font-bold mb-3 text-2xl">
            Añadir cuenta local
          </h1>
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
            <div className="mt-10">
              <div className="flex mb-3">
                <h1 className="text-lg flex text-sky-900 font-semibold w-[50%] md:text-3xl md:w-[70%] lg:w-[25%] ">
                  Nombre y Dirección
                </h1>
                <div className="flex items-center w-[100%]">
                  <hr className="border-[1px] w-[100%] border-sky-800 mt-1" />
                </div>
              </div>
              <h1 className="font-bold text-3xl">Nombres</h1>
              <p>
                Complete el nombre de la cuenta y establezca el segmento y el
                número de cliente del renovador.
              </p>
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
                    label="Alias"
                    id="alias"
                    {...register("alias", { required: true })}
                  />
                  {errors.alias && (
                    <p className="text-red-500 text-xs">
                      Este campo es requerido
                    </p>
                  )}
                </div>
              </div>
              {/* <div className="flex items-center flex-col mt-5 sm:w-auto sm:flex-row sm:justify-between">
              <div className="relative md:w-5/12 w-auto">
                <InputField label="Segmento" id="segmento" />
              </div>
              <div className="relative md:w-5/12 w-auto mt-5 sm:mt-0">
                <InputField label="N.° de clte renovador" id="numerocliente" />
              </div>
            </div> */}
            </div>
          </div>
          <div>
            <div className="mt-10">
              <h1 className="font-bold text-3xl">Dirección</h1>
              <p>
                Complete la dirección de la cuenta. Puedes utilizar la función
                de búsqueda. Esta dirección se mostrará en todas partes en el
                sistema al seleccionar la cuenta.
              </p>
            </div>
            <div className="w-[100%] pt-8 text-xl">
              <div className="flex items-center flex-col sm:w-auto sm:flex-row sm:justify-between">
                <div className="relative w-auto sm:w-5/12">
                  <InputField
                    label="Dirección 1"
                    id="dirección1"
                    {...register("address1", { required: true })}
                  />
                  {errors.address1 && (
                    <p className="text-red-500 text-xs">
                      Este campo es requerido
                    </p>
                  )}
                </div>
                <div className="flex-col flex items-center sm:flex sm:w-[50%] sm:flex-row justify-between">
                  <div className="relative w-auto sm:w-5/12 mt-4 sm:mt-0">
                    <InputField
                      label="Ciudad"
                      id="Ciudad"
                      {...register("city", { required: true })}
                    />
                    {errors.city && (
                      <p className="text-red-500 text-xs">
                        Este campo es requerido
                      </p>
                    )}
                  </div>
                  <div className="relative w-auto sm:w-5/12 mt-4 sm:mt-0">
                    <InputField
                      label="Región"
                      id="Region"
                      {...register("region", { required: true })}
                    />
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
                    <InputField
                      label="Codigo Postal"
                      id="CodigoPostal"
                      {...register("zipCode", { required: true })}
                    />
                    {errors.zipCode && (
                      <p className="text-red-500 text-xs">
                        Este campo es requerido
                      </p>
                    )}
                  </div>
                  <div className="relative w-auto sm:w-5/12 mt-4 sm:mt-0">
                    <InputField
                      label="País"
                      id="País"
                      {...register("country", { required: true })}
                    />
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

export default AddClientPage;

// import * as images from "../img";
// import { useForm } from "react-hook-form";
// import { useAuth } from "../context/AuthContext";

// function RegisterPage() {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();
//   const { signup, errors: registerErrors } = useAuth();
// // const navigate = useNavigate();

// // useEffect(() => {
// //   if (isAuthenticated) navigate("/register");
// // }, [isAuthenticated]);

//   const onSubmit = handleSubmit(async (values) => {
//     signup(values);
//   });

//   return (
//     <>
//         <main className="bg-gradient-to-br from-slate-800 to-slate-900 h-screen flex justify-center items-center flex-col">
//           <h1 className="text-3xl text-white mb-3 font-bold">Registrar usuario</h1>
//           <div className="flex top-10 absolute w-[100%]">
//             {registerErrors.map((error, i) => (
//               <div
//                 className="bg-red-500 py-2 text-white w-[100%] flex justify-center"
//                 key={i}
//               >
//                 {error}
//               </div>
//             ))}
//           </div>
//           <section className="bg-primary auto h-auto p-4 rounded-2xl shadow-lg shadow-slate-100/30 max-[912px]:w-[50%] max-[430px]:w-[70%]">
//             <form onSubmit={onSubmit}>
//               <article className="flex justify-center">
//                 <img className="w-[30%] my-3" src={images.logoVB} alt="" />
//               </article>
//               <article className="flex flex-col items-center mb-6 mt-2">
//                 <div className="mb-3">
//                   <label
//                     htmlFor=""
//                     className="flex justify-center mb-2 font-medium "
//                   >
//                     <h1 className="text-white">Nombre</h1>
//                   </label>
//                   <div className="">
//                     <input
//                       className="h-9 rounded-md w-96 shadow-md font-medium p-1 max-[1280px]:w-auto"
//                       type="text"
//                       placeholder="Nombre"
//                       {...register("name", { required: true })}
//                     />
//                     {errors.name && (
//                       <p className="text-red-500 text-xs">
//                         Este campo es requerido
//                       </p>
//                     )}
//                   </div>
//                 </div>
//                 <div className="mb-3">
//                   <label
//                     htmlFor=""
//                     className="flex justify-center mb-2 font-medium "
//                   >
//                     <h1 className="text-white">Apellido</h1>
//                   </label>
//                   <div className="">
//                     <input
//                       className="h-9 rounded-md w-96 shadow-md font-medium p-1 max-[1280px]:w-auto"
//                       type="text"
//                       placeholder="Apellido"
//                       {...register("lastName", { required: true })}
//                     />
//                     {errors.lastName && (
//                       <p className="text-red-500 text-xs">
//                         Este campo es requerido
//                       </p>
//                     )}
//                   </div>
//                 </div>
//                 <div className="mb-3">
//                   <label
//                     htmlFor=""
//                     className="flex justify-center mb-2 font-medium "
//                   >
//                     <h1 className="text-white">Usuario</h1>
//                   </label>
//                   <div className="">
//                     <input
//                       className="h-9 rounded-md w-96 shadow-md font-medium p-1 max-[1280px]:w-auto"
//                       type="text"
//                       placeholder="Usuario"
//                       {...register("userName", { required: true })}
//                     />
//                     {errors.userName && (
//                       <p className="text-red-500 text-xs">
//                         Este campo es requerido
//                       </p>
//                     )}
//                   </div>
//                 </div>
//                 <div className="mb-3">
//                   <label
//                     htmlFor=""
//                     className="flex justify-center mb-2 font-medium "
//                   >
//                     <h1 className="text-white">Departamento</h1>
//                   </label>
//                   <select
//                     {...register("department", { required: true })}
//                     className="h-9 rounded-md shadow-md font-medium p-1 max-[1280px]:w-auto text-sm"
//                   >
//                     <option>Seleccione una opción...</option>
//                     <option value="Vendedor">Vendedor</option>
//                     <option value="Almacén">Almacén</option>
//                     <option value="Producción">Producción</option>
//                   </select>
//                 </div>
//                 <div className="">
//                   <label
//                     htmlFor=""
//                     className="flex justify-center mb-2 font-medium"
//                   >
//                     <h1 className="text-white font-medium">Contraseña</h1>
//                   </label>
//                   <input
//                     className="h-9 rounded-md w-96 shadow-md font-medium p-1 max-[1280px]:w-auto"
//                     type="password"
//                     placeholder="Contraseña"
//                     {...register("password", { required: true })}
//                   />
//                   {errors.password && (
//                     <p className="text-red-500 text-xs">
//                       Este campo es requerido
//                     </p>
//                   )}
//                 </div>
//               </article>
//               <article className="mb-7">
//                 <div className="flex justify-center">
//                   <button
//                     className="bg-yellow-400 shadow-lg shadow-yellow-500/30 text-white rounded-md py-2 px-8"
//                     type="submit"
//                   >
//                     Agregar
//                   </button>
//                 </div>
//               </article>
//             </form>
//           </section>
//         </main>
//     </>
//   );
// }

// export default RegisterPage;