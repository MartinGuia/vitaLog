import { useForm } from "react-hook-form";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useTire } from "../context/TireContext";
import { StepBack } from "lucide-react";
import React, { useState, useEffect } from "react";
import {
  Autocomplete,
  AutocompleteItem,
} from "@heroui/react";

function EditInitialPage() {
  const { setValue, handleSubmit, register } = useForm();
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
          const tireByCodeBar = await getTire(params.id);
          if (tireByCodeBar) {
            setTireData(tireByCodeBar);
            setNumberOfTires(tireByCodeBar.workOrder.tires.length);
            setWorkOrderNumber(tireByCodeBar.workOrder.numero);
            setLinea(tireByCodeBar.linea);
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
    loadTire();
  }, [params.id]);

  const onSubmit = handleSubmit(async (values) => {
    const updatedValues = Object.fromEntries(
      Object.entries(values).filter(([key, value]) => value !== "")
    );

    try {
      await updateProductionTire(params.id, updatedValues);
      navigate("/productionInitial");
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

  return (
    <div className="md:px-8 px-3 py-10 max-w-screen-2xl mx-auto select-none">
      <div className="flex items-center gap-3 mb-6">
        <Link to={`/productionInitial`}>
          <button className="bg-buttonPrimaryHover hover:bg-buttonPrimary shadow-md rounded-md px-4 py-1 duration-500">
            <StepBack color="white" />
          </button>
        </Link>
        <h1 className="text-2xl md:text-4xl font-bold">Inspección Inicial</h1>
        {tireErrors.length > 0 && (
          <div className="flex top-10 absolute w-full bg-red-500 py-2 text-white justify-center">
            {tireErrors.map((error, i) => (
              <div key={i}>{error}</div>
            ))}
          </div>
        )}
      </div>

      <div className="border-2 border-slate-50  py-3 px-10 rounded-md shadow-lg w-full">
        <div className="text-center text-xl font-semibold mb-2">
          <span>{tireData.itemCode}</span>
        </div>
        <div className="grid grid-cols-2 w-full">
          <div>
            <p>
              Codigo de barras:{" "}
              <span className="font-medium text-lg">{tireData.barCode}</span>
            </p>
            <p>
              DOT :{" "}
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
              Modelo{" "}
              <span className="font-medium text-lg">{tireData.modelTire}</span>
            </p>
            <p>
              Numero de orden{" "}
              <span className="font-medium text-lg">
                {workOrderNumber} ({linea}/{numberOfTires})
              </span>
            </p>
          </div>
        </div>
      </div>

      <h2 className="text-lg md:text-2xl font-semibold mb-3 text-sky-900 mt-8">
        Estado de la llanta
      </h2>
      <p className="text-gray-600 mb-4">
        Especificar si la llanta será rechazo o pasa.
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-center">
          <Autocomplete
            className="shadow-md rounded-xl mb-10 w-[50%]"
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
        <div className="flex gap-4">
          <button
            className="text-white font-medium bg-buttonSecondary py-3 px-9 rounded-md shadow-md hover:bg-buttonSecondaryHover duration-500 hover:duration-500"
            onClick={() => handleStatusChange("Pasa")}
          >
            PASA
          </button>
          <button
            className="text-white font-medium bg-buttonTertiary py-3 px-9 rounded-md shadow-md hover:bg-buttonTertiaryHover"
            onClick={() => handleStatusChange("Rechazo")}
          >
            RECHAZO
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditInitialPage;
