import { useForm } from "react-hook-form";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useTire } from "../context/TireContext";
import { StepBack } from "lucide-react";
import InputField from "../components/ui/InputField";

function EditFinalPage() {
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
      // navigate("/productionFinal");
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
          <h1 className="md:text-4xl flex justify-center font-bold mb-3 text-2xl">
            Inspección Final
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
                  {...register("status", {
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
                    {...register("appliedBand", { required: false })}
                    className="block shadow-md w-full p-2 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    size="4" /* Controla cuántas opciones se muestran sin scroll */
                  >
                    <option className="p-1" value="">
                      Banda usada...
                    </option>
                    <option className="p-1" value="HT3">
                      HT3
                    </option>
                    <option className="p-1" value="HDL">
                      HDL
                    </option>
                    <option className="p-1" value="HSC">
                      HSC
                    </option>
                    <option className="p-1" value="HSR">
                      HSR
                    </option>
                    <option className="p-1" value="HTL">
                      HTL
                    </option>
                  </select>
                  
                  <select
                    {...register("appliedBandBandag", { required: false })}
                    className="block shadow-md w-full mt-3 p-2 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    size="4" /* Controla cuántas opciones se muestran sin scroll */
                  >
                    <option className="p-1" value="">
                      Banda usada...
                    </option>
                    <option className="p-1" value="B123 FUELTECH - 220">
                      B123 FUELTECH - 220
                    </option>
                    <option className="p-1" value="B123 FUELTECH - 230">
                      B123 FUELTECH - 230
                    </option>
                    <option className="p-1" value="B197 - 230">
                      B197 - 230
                    </option>
                    <option className="p-1" value="B197 - 210">
                      B197 - 210
                    </option>
                    <option className="p-1" value="B197 - 220">
                      B197 - 220
                    </option>
                    <option className="p-1" value="B440 - 250">
                      B440 - 250
                    </option>
                    <option className="p-1" value="B440 - 240">
                      B440 - 240
                    </option>
                    <option className="p-1" value="B440 - 230">
                      B440 - 230
                    </option>
                    <option className="p-1" value="B440 - 220">
                      B440 - 220
                    </option>
                    <option className="p-1" value="B440 - 210">
                      B440 - 210
                    </option>
                    <option className="p-1" value="B710 - 230">
                      B710 - 230
                    </option>
                    <option className="p-1" value="B710 - 220">
                      B710 - 220
                    </option>
                    <option className="p-1" value="B710 - 210">
                      B710 - 210
                    </option>
                    <option className="p-1" value="B713 FUELTECH - 240">
                      B713 FUELTECH - 240
                    </option>
                    <option className="p-1" value="B713 FUELTECH - 230">
                      B713 FUELTECH - 230
                    </option>
                    <option className="p-1" value="B713 FUELTECH - 220">
                      B713 FUELTECH - 220
                    </option>
                    <option className="p-1" value="B713 FUELTECH - 210">
                      B713 FUELTECH - 210
                    </option>
                    <option className="p-1" value="B736 - 230">
                      B736 - 230
                    </option>
                    <option className="p-1" value="B736 - 270">
                      B736 - 270
                    </option>
                    <option className="p-1" value="B736 - 240">
                      B736 - 240
                    </option>
                    <option className="p-1" value="B736 - 250">
                      B736 - 250
                    </option>
                    <option className="p-1" value="B736 - 260">
                      B736 - 260
                    </option>
                    <option className="p-1" value="BDL - 210">
                      BDL - 210
                    </option>
                    <option className="p-1" value="BDL - 230">
                      BDL - 230
                    </option>
                    <option className="p-1" value="BDL - 220">
                      BDL - 220
                    </option>
                    <option className="p-1" value="BDM - 220">
                      BDM - 220
                    </option>
                    <option className="p-1" value="BDM - 230">
                      BDM - 230
                    </option>
                    <option className="p-1" value="BDM - 240">
                      BDM - 240
                    </option>
                    <option className="p-1" value="BDM - 250">
                      BDM - 250
                    </option>
                    <option className="p-1" value="BDR AS - 230">
                      BDR AS - 230
                    </option>
                    <option className="p-1" value="BDR HG - 260">
                      BDR HG - 260
                    </option>
                    <option className="p-1" value="BDR HG - 230">
                      BDR HG - 230
                    </option>
                    <option className="p-1" value="BDR HG - 240">
                      BDR HG - 240
                    </option>
                    <option className="p-1" value="BDV - 260">
                      BDV - 260
                    </option>
                    <option className="p-1" value="BDV - 210">
                      BDV - 210
                    </option>
                    <option className="p-1" value="BDV - 230">
                      BDV - 230
                    </option>
                    <option className="p-1" value="BDV - 240">
                      BDV - 240
                    </option>
                    <option className="p-1" value="BDV - 220">
                      BDV - 220
                    </option>
                    <option className="p-1" value="Brawny Rib - 600">
                      Brawny Rib - 600
                    </option>
                    <option className="p-1" value="Brawny Rib - 800">
                      Brawny Rib - 800
                    </option>
                    <option className="p-1" value="Brawny Rib - 750">
                      Brawny Rib - 750
                    </option>
                    <option className="p-1" value="Brawny Rib - 700">
                      Brawny Rib - 700
                    </option>
                    <option className="p-1" value="Brawny Rib - 850">
                      Brawny Rib - 850
                    </option>
                    <option className="p-1" value="Brawny Trac - 150">
                      Brawny Trac - 150
                    </option>
                    <option className="p-1" value="Brawny Trac - 140">
                      Brawny Trac - 140
                    </option>
                    <option className="p-1" value="BRMS - 240">
                      BRMS - 240
                    </option>
                    <option className="p-1" value="BRMS2 - 250">
                      BRMS2 - 250
                    </option>
                    <option className="p-1" value="BRR13 - 230">
                      BRR13 - 230
                    </option>
                    <option className="p-1" value="BRR13 - 250">
                      BRR13 - 250
                    </option>
                    <option className="p-1" value="BRR13 - 260">
                      BRR13 - 260
                    </option>
                    <option className="p-1" value="BRR13 - 240">
                      BRR13 - 240
                    </option>
                    <option className="p-1" value="BRR13 - 220">
                      BRR13 - 220
                    </option>
                    <option className="p-1" value="BRSS - 230">
                      BRSS - 230
                    </option>
                    <option className="p-1" value="BRSS - 200">
                      BRSS - 200
                    </option>
                    <option className="p-1" value="BRSS - 220">
                      BRSS - 220
                    </option>
                    <option className="p-1" value="BRSS 210">
                      BRSS 210
                    </option>
                    <option className="p-1" value="BSS - 230">
                      BSS - 230
                    </option>
                    <option className="p-1" value="BSS - 220">
                      BSS - 220
                    </option>
                    <option className="p-1" value="BTL - 230">
                      BTL - 230
                    </option>
                    <option className="p-1" value="BTL - 220">
                      BTL - 220
                    </option>
                    <option className="p-1" value="BTL - 210">
                      BTL - 210
                    </option>
                    <option className="p-1" value="BTL SA - 210">
                      BTL SA - 210
                    </option>
                    <option className="p-1" value="BTL SA - 220">
                      BTL SA - 220
                    </option>
                    <option className="p-1" value="BTL SA - 230">
                      BTL SA - 230
                    </option>
                    <option className="p-1" value="BTL SA2 - 230">
                      BTL SA2 - 230
                    </option>
                    <option className="p-1" value="BTL SA2 - 240">
                      BTL SA2 - 240
                    </option>
                    <option className="p-1" value="BTL SA2 - 210">
                      BTL SA2 - 210
                    </option>
                    <option className="p-1" value="BTL SA2 - 220">
                      BTL SA2 - 220
                    </option>
                    <option className="p-1" value="BTL3 - 240">
                      BTL3 - 240
                    </option>
                    <option className="p-1" value="BTL3 - 220">
                      BTL3 - 220
                    </option>
                    <option className="p-1" value="BTL3 - 230">
                      BTL3 - 230
                    </option>
                    <option className="p-1" value="BTL3 - 250">
                      BTL3 - 250
                    </option>
                    <option className="p-1" value="BTR SA - 260">
                      BTR SA - 260
                    </option>
                    <option className="p-1" value="BTR - 230">
                      BTR - 230
                    </option>
                    <option className="p-1" value="BTR SA - 240">
                      BTR SA - 240
                    </option>
                    <option className="p-1" value="BTR SA - 250">
                      BTR SA - 250
                    </option>
                    <option className="p-1" value="BTRA SA s - 220">
                      BTRA SA s - 220
                    </option>
                    <option className="p-1" value="BZY - 9">
                      BZY - 9
                    </option>
                    <option className="p-1" value="BZY - 8.5">
                      BZY - 8.5
                    </option>
                    <option className="p-1" value="BZY - 8">
                      BZY - 8
                    </option>
                    <option className="p-1" value="BZY - 10.5">
                      BZY - 10.5
                    </option>
                    <option className="p-1" value="CT (Comercial Traction) - 600">
                      CT (Comercial Traction) - 600
                    </option>
                    <option className="p-1" value="CT (Comercial Traction) - 800">
                      CT (Comercial Traction) - 800
                    </option>
                    <option className="p-1" value="D4300 - 9">
                      D4300 - 9
                    </option>
                    <option className="p-1" value="D4300 - 9.5">
                      D4300 - 9.5
                    </option>
                    <option className="p-1" value="D4300 10.5">
                      D4300 10.5
                    </option>
                    <option className="p-1" value="D4300 - 8.5">
                      D4300 - 8.5
                    </option>
                    <option className="p-1" value="D4300 - 250">
                      D4300 - 250
                    </option>
                    <option className="p-1" value="DR5.3 - 210">
                      DR5.3 - 210
                    </option>
                    <option className="p-1" value="DR5.3 - 220">
                      DR5.3 - 220
                    </option>
                    <option className="p-1" value="DR5.3 - 230">
                      DR5.3 - 230
                    </option>
                    <option className="p-1" value="DR5.3 - 240">
                      DR5.3 - 240
                    </option>
                    <option className="p-1" value="DR5.3 - 200">
                      DR5.3 - 200
                    </option>
                    <option className="p-1" value="ECL Drive - 8.5">
                      ECL Drive - 8.5
                    </option>
                    <option className="p-1" value="Econo Drive - 9.5">
                      Econo Drive - 9.5
                    </option>
                    <option className="p-1" value="Econo Drive - 9">
                      Econo Drive - 9
                    </option>
                    <option className="p-1" value="Econo Drive - 8">
                      Econo Drive - 8
                    </option>
                    <option className="p-1" value="Econo Drive - 8.5">
                      Econo Drive - 8.5
                    </option>
                    <option className="p-1" value="Econo Drive 10.5">
                      Econo Drive 10.5
                    </option>
                    <option className="p-1" value="FCR-T2 - 220">
                      FCR-T2 - 220
                    </option>
                    <option className="p-1" value="FCR-T2 - 210">
                      FCR-T2 - 210
                    </option>
                    <option className="p-1" value="FCR-T2 - 240">
                      FCR-T2 - 240
                    </option>
                    <option className="p-1" value="FCR-T2 - 230">
                      FCR-T2 - 230
                    </option>
                    <option className="p-1" value="Highway (HW) - 3">
                      Highway (HW) - 3
                    </option>
                    <option className="p-1" value="Highway (HW) - 8">
                      Highway (HW) - 8
                    </option>
                    <option className="p-1" value="Highway (HW) - 6">
                      Highway (HW) - 6
                    </option>
                    <option className="p-1" value="LIGHT S - 190">
                      LIGHT S - 190
                    </option>
                    <option className="p-1" value="LIGHT S - 150">
                      LIGHT S - 150
                    </option>
                    <option className="p-1" value="LIGHT S - 200">
                      LIGHT S - 200
                    </option>
                    <option className="p-1" value="LIGHT S - 180">
                      LIGHT S - 180
                    </option>
                    <option className="p-1" value="LIGHT S - 215">
                      LIGHT S - 215
                    </option>
                    <option className="p-1" value="LIGHT S - 165">
                      LIGHT S - 165
                    </option>
                    <option className="p-1" value="LIGHT S - 140">
                      LIGHT S - 140
                    </option>
                    <option className="p-1" value="LIGHT S - 210">
                      LIGHT S - 210
                    </option>
                    <option className="p-1" value="Megatreck - 230">
                      Megatreck - 230
                    </option>
                    <option className="p-1" value="Megatreck - 210">
                      Megatreck - 210
                    </option>
                    <option className="p-1" value="Megatreck - 220">
                      Megatreck - 220
                    </option>
                    <option className="p-1" value="Metromax Rib (MMR) - 160">
                      Metromax Rib (MMR) - 160
                    </option>
                    <option className="p-1" value="Metromax Rib (MMR) - 195">
                      Metromax Rib (MMR) - 195
                    </option>
                    <option className="p-1" value="Metromax Rib (MMR) - 170">
                      Metromax Rib (MMR) - 170
                    </option>
                    <option className="p-1" value="Metromax Rib (MMR) - 150">
                      Metromax Rib (MMR) - 150
                    </option>
                    <option className="p-1" value="R4200 - 9">
                      R4200 - 9
                    </option>
                    <option className="p-1" value="T4100 - 8.5">
                      T4100 - 8.5
                    </option>
                    <option className="p-1" value="T4100 - 265">
                      T4100 - 265
                    </option>
                    <option className="p-1" value="T4100 - 10.5">
                      T4100 - 10.5
                    </option>
                    <option className="p-1" value="T4100 - 255">
                      T4100 - 255
                    </option>
                    <option className="p-1" value="T4100 - 9">
                      T4100 - 9
                    </option>
                    <option className="p-1" value="T4100 - 9.5">
                      T4100 - 9.5
                    </option>
                    <option className="p-1" value="TR4.1 - 230">
                      TR4.1 - 230
                    </option>
                    <option className="p-1" value="TR4.1 - 220">
                      TR4.1 - 220
                    </option>
                    <option className="p-1" value="TR4.1 - 200">
                      TR4.1 - 200
                    </option>
                    <option className="p-1" value="TR4.1 - 210">
                      TR4.1 - 210
                    </option>
                    <option className="p-1" value="TR4.1 - 240">
                      TR4.1 - 240
                    </option>
                    <option className="p-1" value="UAP - 210">
                      UAP - 210
                    </option>
                    <option className="p-1" value="UAP - 230">
                      UAP - 230
                    </option>
                    <option className="p-1" value="UAP - 210">
                      UAP - 210
                    </option>
                    <option className="p-1" value="UAP - 220">
                      UAP - 220
                    </option>
                    <option className="p-1" value="UAP - 260">
                      UAP - 260
                    </option>
                    <option className="p-1" value="UAP - 250">
                      UAP - 250
                    </option>
                    <option className="p-1" value="UAP2 - 240">
                      UAP2 - 240
                    </option>
                    <option className="p-1" value="UAP2 - 220">
                      UAP2 - 220
                    </option>
                    <option className="p-1" value="UAP2 - 230">
                      UAP2 - 230
                    </option>
                    <option className="p-1" value="UAP2 - 210">
                      UAP2 - 210
                    </option>
                    <option className="p-1" value="UDR - 240">
                      UDR - 240
                    </option>
                    <option className="p-1" value="UDR - 230">
                      UDR - 230
                    </option>
                    <option className="p-1" value="UDR - 210">
                      UDR - 210
                    </option>
                    <option className="p-1" value="UDR - 250">
                      UDR - 250
                    </option>
                    <option className="p-1" value="UDR - 220">
                      UDR - 220
                    </option>
                    <option className="p-1" value="UDR - 200">
                      UDR - 200
                    </option>
                    <option className="p-1" value="BDX2 - 240">
                      BDX2 - 240
                    </option>
                    <option className="p-1" value="BDX2 - 260">
                      BDX2 - 260
                    </option>
                    <option className="p-1" value="BDX2 - 250">
                      BDX2 - 250
                    </option>
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

              <Link to={`/printlabel/${params.id}`}>
                <button
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  // onClick={() => printLabel("Texto de prueba")}
                >
                  Imprimir Etiqueta
                </button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default EditFinalPage;
