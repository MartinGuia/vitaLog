import { useForm } from "react-hook-form";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useTire } from "../context/TireContext";
import { StepBack } from "lucide-react";
import {
  Input,
  Autocomplete,
  AutocompleteItem,
} from "@heroui/react";
import React, { useState, useEffect } from "react";

function EditRepairsPage() {
  const { register, handleSubmit, setValue } = useForm();
  const { updateProductionTire, getTire, errors: tireErrors } = useTire();
  const params = useParams();
  const navigate = useNavigate();
  const [tireData, setTireData] = useState({});
  const [numberOfTires, setNumberOfTires] = useState();
  const [workOrderNumber, setWorkOrderNumber] = useState();
  const [linea, setLinea] = useState();

  useEffect(() => {
    async function loadTire() {
      try {
        if (params.id) {
          const tire = await getTire(params.id);
          if (tire) {
            setTireData(tire);
            setNumberOfTires(tire.workOrder.tires.length);
            setWorkOrderNumber(tire.workOrder.numero);
            setLinea(tire.linea);
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
    loadTire();
  }, [params.id, getTire]);

  const rejections = [
    {
      value: "Corte de ceja",
      label: "Corte de ceja",
    },
    {
      value: "Ceja - Miseláneos",
      label: "Ceja - Miseláneos",
    },
    {
      value: "Corte del costado",
      label: "Corte del costado",
    },
    {
      value: "Cortes en corona/penetraciones y rasgusras en el costado",
      label: "Cortes en corona/penetraciones y rasgusras en el costado",
    },
    {
      value: "Rodada a baja presón",
      label: "Rodada a baja presón",
    },
    {
      value: "Impacto en la banda de rodamiento",
      label: "Impacto en la banda de rodamiento",
    },
    {
      value: "Freno bloqueado",
      label: "Freno bloqueado",
    },
    {
      value: "Impacto en el costado",
      label: "Impacto en el costado",
    },
    {
      value: "Picadura por piedras",
      label: "Picadura por piedras",
    },
    {
      value: "Sobrecarga/sobre inflado",
      label: "Sobrecarga/sobre inflado",
    },
    {
      value: "Separación en ceja inducido por rebordes",
      label: "Separación en ceja inducido por rebordes",
    },
    {
      value:
        "Desgarre o desprendimiento de orilla de banda de rodamiento inducido por arrastre",
      label:
        "       Desgarre o desprendimiento de orilla de banda de rodamiento inducido por arrastre",
    },
    {
      value: "Incorrcta aplicación de llanta/reencauche",
      label: "Incorrcta aplicación de llanta/reencauche",
    },
    {
      value: "Ceja quemada",
      label: "Ceja quemada",
    },
    {
      value: "Vandalismo",
      label: "Vandalismo",
    },
    {
      value: "Daño en ceja por montaje",
      label: "Daño en ceja por montaje",
    },
    {
      value: "Desgastado",
      label: "Desgastado",
    },
    {
      value: "Reparación inapropiada",
      label: "Reparación inapropiada",
    },
    {
      value: "Redibujado muy profundo",
      label: "Redibujado muy profundo",
    },
    {
      value: "Asentamiento de ceja/aro inapropiado",
      label: "Asentamiento de ceja/aro inapropiado ",
    },
    {
      value: "Marcaje incorrecto",
      label: "Marcaje incorrecto",
    },
    {
      value: "Agrietamiento de hombro/Costado",
      label: "Agrietamiento de hombro/Costado",
    },
    {
      value: "Separación entre cinturón y el casco",
      label: "Separación entre cinturón y el casco",
    },
    {
      value: "Separación de ceja",
      label: "Separación de ceja",
    },
    {
      value: "Defectos del liner",
      label: "Defectos del liner",
    },
    {
      value: "Separación de hombro",
      label: "Separación de hombro",
    },
    {
      value: "Grietas diagonales",
      label: "Grietas diagonales",
    },
    {
      value: "Cuerdas de casco distorcionadas",
      label: "Cuerdas de casco distorcionadas",
    },
    {
      value: "Flow Craking",
      label: "Flow Craking",
    },
    {
      value: "Los años del casco exceden las especificaciones de la flota ",
      label: "Los años del casco exceden las especificaciones de la flota ",
    },
    {
      value: "Fallo en reparción - Sección",
      label: "Fallo en reparción - Sección",
    },
    {
      value: "Fallo en reparación - Hoyo de clavo",
      label: "Fallo en reparación - Hoyo de clavo",
    },
    {
      value: "Falla en reparción - No bandag",
      label: "Falla en reparción - No bandag",
    },
    {
      value: "Fallo en reparación - Puntual",
      label: "Fallo en reparación - Puntual",
    },
    {
      value: "Fallo en reparción - Ceja",
      label: "Fallo en reparción - Ceja",
    },
    {
      value: "Falla en reparación - Reparaciones muy grande",
      label: "Falla en reparación - Reparaciones muy grande",
    },
    {
      value: "Falla en reparación - Reparaciones muy cercanas",
      label: "Falla en reparación - Reparaciones muy cercanas",
    },
    {
      value: "Falla en reparación Muchas reparaciones",
      label: "Falla en reparación Muchas reparaciones",
    },
    {
      value: "Perforación no detectada",
      label: "Perforación no detectada ",
    },
    {
      value: "Vulcanizado inapropiado",
      label: "Vulcanizado inapropiado",
    },
    {
      value: "No se encontro la separación",
      label: "No se encontro la separación",
    },
    {
      value: "Capas dañadas en raspado",
      label: "Capas dañadas en raspado",
    },
    {
      value: "Contaminación del caucho",
      label: "Contaminación del caucho",
    },
    {
      value: "Sin daño notado",
      label: "Sin daño notado",
    },
    {
      value: "Cables expuestos en el Inner Liner",
      label: "Cables expuestos en el Inner Liner",
    },
    {
      value: "Union de inner liner abierta",
      label: "Union de inner liner abierta",
    },
    {
      value: "Agrietamiento de liner",
      label: "Agrietamiento de liner",
    },
    {
      value: "Separación de inner liner",
      label: "Separación de inner liner",
    },
    {
      value: "Separación de costado",
      label: "Separación de costado",
    },
    {
      value: "Separación entre cinturones",
      label: "Separación entre cinturones",
    },
    {
      value: "Desgaste excesivo",
      label: "Desgaste excesivo",
    },
    {
      value: "Cinturón/Oxidado",
      label: "Cinturón/Oxidado",
    },
  ];

  const repairs = [
    { value: "B120", label: "B120" },
    { value: "B122", label: "B122" },
    { value: "B124", label: "B124" },
    { value: "B140", label: "B140" },
    { value: "B142", label: "B142" },
    { value: "B144", label: "B144" },
    { value: "Brake Skid", label: "Brake Skid" },
    { value: "Liner", label: "Liner" },
    { value: "MP10", label: "MP10" },
    { value: "SP-8", label: "SP-8" },
    { value: "Talón", label: "Talón" },
    { value: "165 CT-10", label: "165 CT-10" },
    { value: "170 CT-20", label: "170 CT-20" },
    { value: "172 CT-22", label: "172 CT-22" },
    { value: "174 CT-24", label: "174 CT-24" },
    { value: "180 CT-40", label: "180 CT-40" },
    { value: "182 CT-42", label: "182 CT-42" },
    { value: "184 CT-44", label: "184 CT-44" },
    { value: "RAD 120", label: "RAD 120" },
    { value: "RAD 122", label: "RAD 122" },
    { value: "RAD 124", label: "RAD 124" },
    { value: "RAD 140", label: "RAD 140" },
    { value: "RAD 142", label: "RAD 142" },
    { value: "RAD 144", label: "RAD 144" },
  ];

  const onSubmit = handleSubmit(async (values) => {
    const updatedValues = Object.fromEntries(
      Object.entries(values).filter(([key, value]) => value !== "")
    );

    try {
      await updateProductionTire(params.id, updatedValues);
      navigate("/productionRepairs");
      alert("Registro actualizado exitosamente");
    } catch (error) {
      console.error(error);
      alert("Error al actualizar el registro");
    }
  });

  const handleStatusChange = async (status) => {
    setValue("status", status);
    await onSubmit({ ...tireData, status });
  };

  return (
    <div className="md:px-8 px-3 py-10 max-w-screen-2xl mx-auto select-none">
      <div className="flex items-center gap-3 mb-6">
        <Link to="/productionRepairs">
          <button className="bg-buttonPrimaryHover hover:bg-buttonPrimary shadow-md rounded-md px-4 py-1 duration-500">
            <StepBack color="white" />
          </button>
        </Link>
        <h1 className="text-2xl md:text-4xl font-bold">Reparaciones</h1>
      </div>

      {tireErrors.length > 0 && (
        <div className="flex top-10 absolute w-full">
          {tireErrors.map((error, i) => (
            <div
              key={i}
              className="bg-red-500 py-2 text-white w-full flex justify-center"
            >
              {error}
            </div>
          ))}
        </div>
      )}

      <div className="border-2 border-slate-50 py-3 px-10 rounded-md shadow-lg w-full">
        <div className="text-center text-xl font-semibold mb-2">
          <span>{tireData.itemCode}</span>
        </div>
        <div className="grid grid-cols-2 w-full">
          <div>
            <p>
              Código de barras:{" "}
              <span className="font-medium text-lg">{tireData.barCode}</span>
            </p>
            <p>
              DOT:{" "}
              <span className="font-medium text-lg">
                {tireData.antiquityDot}
              </span>
            </p>
            <p>
              Medida del casco:{" "}
              <span className="font-medium text-lg">
                {tireData.helmetMeasurement}
              </span>
            </p>
            <p>
              Fecha requerida:{" "}
              <span className="font-medium text-lg">
                {tireData.formattedUpdatedAt}
              </span>
            </p>
          </div>
          <div className="flex flex-col items-end">
            <p>
              Marca:{" "}
              <span className="font-medium text-lg">{tireData.brand}</span>
            </p>
            <p>
              Banda requerida:{" "}
              <span className="font-medium text-lg">
                {tireData.requiredBand}
              </span>
            </p>
            <p>
              Modelo:{" "}
              <span className="font-medium text-lg">{tireData.modelTire}</span>
            </p>
            <p>
              Número de orden:{" "}
              <span className="font-medium text-lg">
                {workOrderNumber} ({linea}/{numberOfTires})
              </span>
            </p>
          </div>
        </div>
      </div>

      <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className="w-[100%] pt-5 text-xl">
            <div className="flex items-center flex-col sm:w-auto sm:flex-row sm:justify-between">
              <div className=" w-[80%] sm:w-[40%]">
                <div className="relative w-full">
                  <Autocomplete
                    className="shadow-md rounded-xl "
                    defaultItems={repairs}
                    label="Reparaciones"
                    placeholder="Selecciona un parche"
                    listboxProps={{
                      emptyContent: "Parche no encontrada",
                    }}
                    {...register("patch", { required: false })}
                  >
                    {(repair) => (
                      <AutocompleteItem key={repair.value} value={repair.value}>
                        {repair.label}
                      </AutocompleteItem>
                    )}
                  </Autocomplete>
                </div>
              </div>
              <div className="relative md:w-5/12 w-auto">
                <Input
                  label="Cantidad"
                  className="shadow-md rounded-xl"
                  {...register("numberPatches", { required: false })}
                />
              </div>
            </div>

            <div className="flex items-center flex-col sm:w-auto sm:flex-row sm:justify-between mt-6">
              <div className="w-[80%] sm:w-[40%]">
                <Autocomplete
                  className="shadow-md rounded-xl "
                  defaultItems={repairs}
                  label="Reparaciones"
                  placeholder="Selecciona un parche"
                  listboxProps={{
                    emptyContent: "Parche no encontrada",
                  }}
                  {...register("patch2", { required: false })}
                >
                  {(repair) => (
                    <AutocompleteItem key={repair.value} value={repair.value}>
                      {repair.label}
                    </AutocompleteItem>
                  )}
                </Autocomplete>
              </div>
              <div className="relative md:w-5/12 w-auto">
                <Input
                  label="Cantidad"
                  className="shadow-md rounded-xl"
                  {...register("numberPatches2", { required: false })}
                />
              </div>
            </div>

            <div className="flex items-center flex-col sm:w-auto sm:flex-row sm:justify-between mt-6">
              <div className="relative w-[80%] sm:w-[40%] ">
                <Autocomplete
                  className="shadow-md rounded-xl "
                  defaultItems={repairs}
                  label="Reparaciones"
                  placeholder="Selecciona un parche"
                  listboxProps={{
                    emptyContent: "Parche no encontrada",
                  }}
                  {...register("patch3", { required: false })}
                >
                  {(repair) => (
                    <AutocompleteItem key={repair.value} value={repair.value}>
                      {repair.label}
                    </AutocompleteItem>
                  )}
                </Autocomplete>
              </div>
              <div className="relative md:w-5/12 w-auto ">
                <Input
                  label="Cantidad"
                  className="shadow-md rounded-xl"
                  {...register("numberPatches3", { required: false })}
                />
              </div>
            </div>

            <div className="flex items-center flex-col sm:w-auto sm:flex-row sm:justify-between mt-6">
              <div className="relative w-[80%] sm:w-[40%] ">
                <Autocomplete
                  className="shadow-md rounded-xl "
                  defaultItems={repairs}
                  label="Reparaciones"
                  placeholder="Selecciona un parche"
                  listboxProps={{
                    emptyContent: "Parche no encontrada",
                  }}
                  {...register("patch4", { required: false })}
                >
                  {(repair) => (
                    <AutocompleteItem key={repair.value} value={repair.value}>
                      {repair.label}
                    </AutocompleteItem>
                  )}
                </Autocomplete>
              </div>
              <div className="relative md:w-5/12 w-auto sm:mt-0">
                <Input
                  label="Cantidad"
                  className="sm shadow-md rounded-xl"
                  {...register("numberPatches4", { required: false })}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between w-auto mt-14">
          <div>
            <button
              type="button"
              className="text-white font-medium bg-buttonSecondary py-3 px-9 mr-4 rounded-md shadow-md hover:bg-buttonSecondaryHover duration-500 hover:duration-500"
              onClick={() => handleStatusChange("Pasa")}
            >
              Pasa
            </button>
            <button
              type="button"
              className="text-white font-medium bg-buttonTertiary py-3 px-9 rounded-md shadow-md hover:bg-buttonTertiaryHover"
              onClick={() => handleStatusChange("Rechazo")}
            >
              Rechazo
            </button>
          </div>
          <div className="w-[41.5%]">
            <Autocomplete
              className="shadow-md rounded-xl "
              defaultItems={rejections}
              label="Rechazos"
              placeholder="Selecciona un rechazo"
              listboxProps={{
                emptyContent: "Rechazo no encontrado",
              }}
              {...register("rejection", { required: false })}
            >
              {(rejection) => (
                <AutocompleteItem key={rejection.value} value={rejection.value}>
                  {rejection.label}
                </AutocompleteItem>
              )}
            </Autocomplete>
          </div>
        </div>
      </form>
    </div>
  );
}
export default EditRepairsPage;
