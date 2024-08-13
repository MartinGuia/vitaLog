import * as images from "../img";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useTire } from "../context/TireContext";
import { useWorkOrder } from "../context/WorkOrderContext";
import { useEffect, useRef } from "react";

function TireFormPage({ orderId }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
      } = useForm();
      const { errors: registerErrors } = useAuth();
      const navigate = useNavigate();
      const {closeWorkOrder} = useWorkOrder()
    
      const {createTire} = useTire()
    
      const barCodeRef = useRef(null);

  useEffect(() => {
    // Enfoca automáticamente el campo de código de barras cuando el componente se monta
    if (barCodeRef.current) {
      barCodeRef.current.focus();
    }
  }, []);
      const onSubmit = handleSubmit((values) => {
        createTire(values);
        reset();
        
      });


      const handleClick = async () => {
        try {
          await closeWorkOrder();
          navigate("/workorders");
          // Puedes realizar acciones adicionales después de cerrar la orden de trabajo si es necesario
        } catch (error) {
          // Manejo de errores, por ejemplo, mostrar un mensaje al usuario
          console.error('Error al cerrar la orden de trabajo:', error.message);
        }
        
      };
    
      return (
        <>
            <main className="bg-gradient-to-br from-slate-800 to-slate-900 h-screen flex justify-center items-center ">
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
              <section className="bg-primary w-[80%] h-auto rounded-2xl shadow-lg shadow-slate-100/30 max-[912px]:w-[50%] max-[430px]:w-[70%]">
                <form onSubmit={onSubmit}>
                  <article className="flex justify-center">
                    <img className="w-auto my-3" src={images.logoVB} alt="" />
                  </article>
                  <article className="flex flex-col mb-6 mt-2">
                    <div className="flex justify-evenly">
                      <div className="mb-3">
                        <label
                          htmlFor=""
                          className="flex justify-center mb-2 font-medium "
                        >
                          <h1 className="text-white">Código de item</h1>
                        </label>
                        <select
                          {...register("itemCode", { required: true })}
                          className="h-9 rounded-md shadow-md font-medium p-1 w-auto text-sm"
                        >
                          <option>Seleccione una opción...</option>
                          <option value="Reparacion">Reparación</option>
                          <option value="Ronovado">Renovado</option>
                          <option value="Desecho">Desecho</option>
                        </select>
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor=""
                          className="flex justify-center mb-2 font-medium "
                        >
                          <h1 className="text-white">Medida de casco</h1>
                        </label>
                        <div className="">
                          <input
                            className="h-9 rounded-md w-auto shadow-md font-medium p-1"
                            type="text"
                            placeholder="Medida Casco"
                            {...register("helmetMeasurement", { required: true })}
                          />
                          {errors.lastName && (
                            <p className="text-red-500 text-xs">
                              Este campo es requerido
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-evenly">
                      <div className="mb-3">
                        <label
                          htmlFor=""
                          className="flex justify-center mb-2 font-medium "
                        >
                          <h1 className="text-white">Marca</h1>
                        </label>
                        <div className="">
                          <input
                            className="h-9 rounded-md w-auto shadow-md font-medium p-1 max-[1280px]:w-auto"
                            type="text"
                            placeholder="Marca"
                            {...register("brand", { required: true })}
                          />
                          {errors.userName && (
                            <p className="text-red-500 text-xs">
                              Este campo es requerido
                            </p>
                          )}
                        </div>
                      </div>
                      {/* <div className="flex justify-center mt-4">
                <div className="mb-3">
                  <label
                    htmlFor="barCode"
                    className="flex justify-center mb-2 font-medium"
                  >
                    <h1 className="text-white">Código de Barras</h1>
                  </label>
                  <div className="">
                    <input
                      className="h-9 rounded-md w-auto shadow-md font-medium p-1"
                      type="text"
                      id="barCode"
                      placeholder="Código de Barras"
                      {...register("barCode", { required: true })}
                      ref={barCodeRef}  // Enlaza el campo con la referencia
                    />
                    {errors.barCode && (
                      <p className="text-red-500 text-xs">
                        Este campo es requerido
                      </p>
                    )}
                  </div>
                </div>
              </div> */}
                      <div className="mb-3">
                        <label
                          htmlFor=""
                          className="flex justify-center mb-2 font-medium "
                        >
                          <h1 className="text-white">Diseño del casco</h1>
                        </label>
                        <div className="">
                          <input
                            className="h-9 rounded-md w-auto shadow-md font-medium p-1"
                            type="text"
                            placeholder="Diseño del casco"
                            {...register("helmetDesign", { required: true })}
                          />
                          {errors.name && (
                            <p className="text-red-500 text-xs">
                              Este campo es requerido
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-evenly">
                      <div className="">
                        <label
                          htmlFor=""
                          className="flex justify-center mb-2 font-medium"
                        >
                          <h1 className="text-white font-medium">Antigüedad/Dot</h1>
                        </label>
                        <input
                          className="h-9 rounded-md w-96 shadow-md font-medium p-1 max-[1280px]:w-auto"
                          type="text"
                          placeholder="Antiguedad/Dot"
                          {...register("antiquityDot", { required: true })}
                        />
                        {errors.password && (
                          <p className="text-red-500 text-xs">
                            Este campo es requerido
                          </p>
                        )}
                      </div>
                      <div className="">
                        <label
                          htmlFor=""
                          className="flex justify-center mb-2 font-medium"
                        >
                          <h1 className="text-white font-medium">
                            Banda requerida
                          </h1>
                        </label>
                        <input
                          className="h-9 rounded-md w-96 shadow-md font-medium p-1 max-[1280px]:w-auto"
                          type="text"
                          placeholder="Banda"
                          {...register("requiredBand", { required: true })}
                        />
                        {errors.password && (
                          <p className="text-red-500 text-xs">
                            Este campo es requerido
                          </p>
                        )}
                      </div>
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
                    <br />
                    <div className="flex justify-center">
                      <button
                        className="bg-yellow-400 shadow-lg shadow-yellow-500/30 text-white rounded-md py-2 px-8"
                        onClick={handleClick}
                      >
                        cerrar orden de trabajo
                      </button>
                    </div>
                  </article>
                </form>
              </section>
            </main>
        </>
      );
}

export default TireFormPage