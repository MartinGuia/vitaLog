import * as images from "../img";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signup, errors: registerErrors } = useAuth();
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (isAuthenticated) navigate("/register");
  // }, [isAuthenticated]);

  const onSubmit = handleSubmit(async (values) => {
    signup(values);
  });

  return (
    <>
        <main className="bg-gradient-to-br from-slate-800 to-slate-900 h-screen flex justify-center items-center flex-col">
          <h1 className="text-3xl text-white mb-3 font-bold">Registrar usuario</h1>
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
          <section className="bg-primary auto h-auto p-4 rounded-2xl shadow-lg shadow-slate-100/30 max-[912px]:w-[50%] max-[430px]:w-[70%]">
            <form onSubmit={onSubmit}>
              <article className="flex justify-center">
                <img className="w-[30%] my-3" src={images.logoVB} alt="" />
              </article>
              <article className="flex flex-col items-center mb-6 mt-2">
                <div className="mb-3">
                  <label
                    htmlFor=""
                    className="flex justify-center mb-2 font-medium "
                  >
                    <h1 className="text-white">Nombre</h1>
                  </label>
                  <div className="">
                    <input
                      className="h-9 rounded-md w-96 shadow-md font-medium p-1 max-[1280px]:w-auto"
                      type="text"
                      placeholder="Nombre"
                      {...register("name", { required: true })}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs">
                        Este campo es requerido
                      </p>
                    )}
                  </div>
                </div>
                <div className="mb-3">
                  <label
                    htmlFor=""
                    className="flex justify-center mb-2 font-medium "
                  >
                    <h1 className="text-white">Apellido</h1>
                  </label>
                  <div className="">
                    <input
                      className="h-9 rounded-md w-96 shadow-md font-medium p-1 max-[1280px]:w-auto"
                      type="text"
                      placeholder="Apellido"
                      {...register("lastName", { required: true })}
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-xs">
                        Este campo es requerido
                      </p>
                    )}
                  </div>
                </div>
                <div className="mb-3">
                  <label
                    htmlFor=""
                    className="flex justify-center mb-2 font-medium "
                  >
                    <h1 className="text-white">Usuario</h1>
                  </label>
                  <div className="">
                    <input
                      className="h-9 rounded-md w-96 shadow-md font-medium p-1 max-[1280px]:w-auto"
                      type="text"
                      placeholder="Usuario"
                      {...register("userName", { required: true })}
                    />
                    {errors.userName && (
                      <p className="text-red-500 text-xs">
                        Este campo es requerido
                      </p>
                    )}
                  </div>
                </div>
                <div className="mb-3">
                  <label
                    htmlFor=""
                    className="flex justify-center mb-2 font-medium "
                  >
                    <h1 className="text-white">Departamento</h1>
                  </label>
                  <select
                    {...register("department", { required: true })}
                    className="h-9 rounded-md shadow-md font-medium p-1 max-[1280px]:w-auto text-sm"
                  >
                    <option>Seleccione una opción...</option>
                    <option value="Vendedor">Vendedor</option>
                    <option value="Almacén">Almacén</option>
                    <option value="Producción">Producción</option>
                  </select>
                </div>
                <div className="">
                  <label
                    htmlFor=""
                    className="flex justify-center mb-2 font-medium"
                  >
                    <h1 className="text-white font-medium">Contraseña</h1>
                  </label>
                  <input
                    className="h-9 rounded-md w-96 shadow-md font-medium p-1 max-[1280px]:w-auto"
                    type="password"
                    placeholder="Contraseña"
                    {...register("password", { required: true })}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-xs">
                      Este campo es requerido
                    </p>
                  )}
                </div>
              </article>
              <article className="mb-7">
                <div className="flex justify-center">
                  <button
                    className="bg-yellow-400 shadow-lg shadow-yellow-500/30 text-white rounded-md py-2 px-8"
                    type="submit"
                  >
                    Agregar
                  </button>
                </div>
              </article>
            </form>
          </section>
        </main>
    </>
  );
}

export default RegisterPage;
