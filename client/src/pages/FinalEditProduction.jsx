import { useForm } from "react-hook-form";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useTire } from "../context/TireContext";
import { StepBack } from "lucide-react";
import InputField from "../components/ui/InputField";

function FinalEditProduction() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    // reset,
  } = useForm();
  const { updateFinalTire, errors: tireErrors } = useTire();
  const params = useParams();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (values) => {
    const updatedValues = Object.fromEntries(
      Object.entries(values).filter(([key, value]) => value !== "")
    );

    try {
      await updateFinalTire(params.id, updatedValues);
      navigate("/productionFinal");
      alert("Registro actualizado exitosamente");
    } catch (error) {
      console.error(error);
      alert("Error al actualizar el registro");
    }
  });

  return (
    <>
      <div className="md:px-8 px-3 py-10 max-w-screen-2xl mx-auto select-none">
        <div>
          <Link to={`/productionFinal`}>
            <button className="bg-cyan-950 rounded-md px-4 py-1 duration-500 hover:bg-cyan-800 hover:duration-500 sm:absolute relative">
              <StepBack color="white" />
            </button>
          </Link>
        </div>
        <div>
          <h1 className="md:text-4xl flex justify-center font-bold text-2xl">
            Editar Llanta
          </h1>
          <div className="flex absolute w-[100%]">
            {tireErrors.map((error, i) => (
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
          {/* Banda requerida, Parches usados, ancho */}
          <div>
            <div className="mt-10">
              <div className="flex mb-3">
                <h1 className="text-lg flex text-sky-900 font-semibold w-[50%] md:text-3xl md:w-[70%] lg:w-[25%] ">
                  Datos de la llanta
                </h1>
                <div className="flex items-center w-[100%]">
                  <hr className="border-[1px] w-[100%] border-sky-800 mt-1" />
                </div>
              </div>
              {/* <h1 className="font-bold text-3xl">Estado de la llanta</h1> */}
              <p>
                Especificar si la llanta sera rechazo o pasa y si se completo la
                inspección.
              </p>
            </div>
            <div className="w-[100%] flex justify-center sm:flex sm:justify-center pt-8 text-xl">
              <div className="relative w-[80%] sm:w-[40%]">
                <select
                  {...register("rejection", {
                    required: "Debe seleccionar una opción.",
                  })}
                  className="shadow-md block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="">Seleccionar...</option>
                  <option value="Rechazo">Rechazo</option>
                  <option value="Renovar">Pasa</option>
                </select>
                {errors.rejection && (
                  <p className="text-red-500 text-xs">
                    {errors.rejection.message}
                  </p>
                )}
              </div>
             
            </div>
          </div>

          <div>
            <div className="mt-10">
              <h1 className="font-bold text-xl md:text-3xl">
                Banda y razón de rechazo
              </h1>
              <p>
                Complete la banda que se uso y seleccione la razón del rechazo.
              </p>
            </div>
            <div className="w-[100%] pt-8 text-xl">
              <div className="flex items-center flex-col sm:w-auto sm:flex-row sm:justify-between">
                <div className="relative w-[90%] sm:w-[50%] ">
                  <div className="relative w-full">
                    <select
                      {...register("rejection", { required: false })}
                      className="block shadow-md w-full p-2 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      size="4" /* Controla cuántas opciones se muestran sin scroll */
                    >
                      <option className="p-2" value="">
                        Razón de rechazo ...
                      </option>
                      <option className="p-2" value="Corte de ceja">
                        Corte de ceja
                      </option>
                      <option className="p-2" value="Ceja - Miseláneos">
                        Ceja - Miseláneos
                      </option>
                      <option className="p-2" value="corte de costado">
                        corte de costado
                      </option>
                      <option
                        className="p-2"
                        value="Cortes en corona/Penetraciones"
                      >
                        cortes en corona/penetraciones
                      </option>
                      <option className="p-2" value="Rodada a baja presión">
                        Rodada a baja presión
                      </option>
                      <option
                        className="p-2"
                        value="Impacto en la banda de rodamiento"
                      >
                        Impacto en la banda de rodamiento
                      </option>
                      <option className="p-2" value="Freno bloqueado">
                        Freno bloqueado
                      </option>
                      <option className="p-2" value="Impacto en el costado">
                        Impacto en el costado
                      </option>
                      <option className="p-2" value="Picadura por piedras">
                        Picadura por piedras
                      </option>
                      <option className="p-2" value="Sobrecarga/Sobre inflado">
                        Sobrecarga/Sobre inflado
                      </option>
                      <option
                        className="p-2"
                        value="Separación de ceja por rebotes"
                      >
                        Separación de ceja por rebotes
                      </option>
                      <option
                        className="p-2"
                        value="Desgarre o desprendimiento de orilla"
                      >
                        Desgarre o desprendimiento de orilla
                      </option>
                      <option
                        className="p-2"
                        value="Incorrecta aplicación de llanta/reencauche"
                      >
                        Incorrecta aplicación de llanta/reencauche
                      </option>
                      <option className="p-2" value="Ceja quemada">
                        Ceja quemada
                      </option>
                      <option className="p-2" value="Vandalismo">
                        Vandalismo
                      </option>
                      <option className="p-2" value="Daño de ceja por montaje">
                        Daño de ceja por montaje
                      </option>
                      <option className="p-2" value="Desgastado">
                        Desgastado
                      </option>
                      <option className="p-2" value="Reparación inapropiada">
                        Reparación inapropiada
                      </option>
                      <option className="p-2" value="Redibujado muy profundo">
                        Redibujado muy profundo
                      </option>
                      <option
                        className="p-2"
                        value="Asentamiento de ceja/aro inapropiado"
                      >
                        Asentamiento de ceja/aro inapropiado
                      </option>
                      <option className="p-2" value="Marcaje incorrecto">
                        Marcaje incorrecto
                      </option>
                      <option
                        className="p-2"
                        value="Agrietamiento de hombro/Costado"
                      >
                        Agrietamiento de hombro/Costado
                      </option>
                      <option className="p-2" value="Separación de ceja">
                        Separación de ceja
                      </option>
                      <option
                        className="p-2"
                        value="Separación entre el cinturón y el casco"
                      >
                        Separación entre el cinturón y el casco
                      </option>
                      <option className="p-2" value="Defectos en el liner">
                        Defectos en el liner
                      </option>
                      <option className="p-2" value="Separación del hombro">
                        Separación del hombro
                      </option>
                      <option className="p-2" value="Grietas diagonales">
                        Grietas diagonales
                      </option>
                      <option
                        className="p-2"
                        value="Cuerdas de casco distorcionadas"
                      >
                        Cuerdas de casco distorcionadas
                      </option>
                      <option className="p-2" value="Flow Craking">
                        Flow Craking
                      </option>
                      <option
                        className="p-2"
                        value="Los años del casco exceden las especificaciones de flota"
                      >
                        Los años del casco exceden las especificaciones de flota
                      </option>
                      <option
                        className="p-2"
                        value="Reparación excede las especificaciones de la flota"
                      >
                        Reparación exvcede las especificaciones de la flota
                      </option>
                      <option
                        className="p-2"
                        value="Fallo en reparación-Sección"
                      >
                        Fallo en reparación-Sección
                      </option>
                      <option
                        className="p-2"
                        value="Fallo en reparación-Hoyo de clavo"
                      >
                        Fallo en reparación-Hoyo de clavo
                      </option>
                      <option
                        className="p-2"
                        value="Fallo en reparación-No bandag"
                      >
                        Fallo en reparación-No bandag
                      </option>
                      <option
                        className="p-2"
                        value="Fallo en reparación-Puntual"
                      >
                        Fallo en reparación-Puntual
                      </option>
                      <option className="p-2" value="Fallo en reparación-ceja">
                        Fallo en reparación-ceja
                      </option>
                      <option
                        className="p-2"
                        value="Fallo en reparación-Reparaciones grandes"
                      >
                        Fallo en reparación-Reparaciones grandes
                      </option>
                      <option
                        className="p-2"
                        value="Fallo en reparación-Reparaciones cercanas"
                      >
                        Fallo en reparación-Reparaciones cercanas
                      </option>
                      <option
                        className="p-2"
                        value="Fallo en reparación-Muchas Reparaciones"
                      >
                        Fallo en reparación-Muchas Reparaciones
                      </option>
                      <option className="p-2" value="Perforación no detectada">
                        Perforación no detectada
                      </option>
                      <option className="p-2" value="Vulcanizado inapropiado">
                        Vulcanizado inapropiado
                      </option>
                      <option
                        className="p-2"
                        value="No se encontró la separación"
                      >
                        No se encontró la separación
                      </option>
                      <option className="p-2" value="Capas dañadas en raspado">
                        Capas dañadas en raspado
                      </option>
                      <option className="p-2" value="Contaminación del caucho">
                        Contaminación del caucho
                      </option>
                      <option className="p-2" value="Sin daño notado">
                        Sin daño notado
                      </option>
                      <option
                        className="p-2"
                        value="Cables expuestos en el Inner Liner"
                      >
                        Cables expuestos en el Inner Liner
                      </option>
                      <option
                        className="p-2"
                        value="Union de inner liner abierta"
                      >
                        Union de inner liner abierta
                      </option>
                      <option className="p-2" value="Agrietamiento de liner">
                        Agrietamiento de liner
                      </option>
                      <option className="p-2" value="Separación de inner liner">
                        Separación de inner liner
                      </option>
                      <option className="p-2" value="separación de costado">
                        separación de costado
                      </option>
                      <option
                        className="p-2"
                        value="Separación entre cinturones"
                      >
                        Separación entre cinturones
                      </option>
                      <option className="p-2" value="Desgaste excesivo">
                        Desgaste excesivo
                      </option>
                      <option className="p-2" value="Cinturón / oxidado">
                        Cinturón / oxidado
                      </option>
                    </select>
                  </div>
                  {/* {errors.patch && (
                    <p className="text-red-500 text-xs">
                      {errors.rejection.message}
                    </p>
                  )} */}
                </div>
                <div className="relative w-[90%] sm:w-[40%] mt-10 sm:mt-0">
                  <select
                    {...register("helmetDesign", { required: false })}
                    className="block shadow-md w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="">Banda usada...</option>
                    <option value="HT3">HT3</option>
                    <option value="HDL">HDL</option>
                    <option value="HSC">HSC</option>
                    <option value="HSR">HSC</option>
                    <option value="HTL">HSC</option>
                  </select>
                  {/* {errors.patch && (
                    <p className="text-red-500 text-xs">
                      {errors.rejection.message}
                    </p>
                  )} */}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-14">
            <div className="flex justify-between w-[100%]">
              <button
                className="w-[10%] text-white font-medium hover:bg-vbYellow duration-500 hover:text-black bg-yellow-500 py-2 px-5 rounded-md shadow-md  hover:duration-500 "
                type="submit"
              >
                Editar
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default FinalEditProduction;
