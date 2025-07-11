import { useForm } from "react-hook-form";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useTire } from "../context/TireContext";
import { StepBack } from "lucide-react";
import { useState, useEffect } from "react";
import AlertComponent from "../components/ui/AlertComponent";
import {
  Autocomplete,
  AutocompleteItem,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  ModalFooter,
  useDisclosure,
} from "@heroui/react";
import PrintLabelComponent from "../components/ui/PrintLabelComponent";

function EditInitialPage() {
  const { setValue, handleSubmit, register } = useForm();
  const { updateProductionTire, getTire, errors: tireErrors } = useTire();
  const params = useParams();
  const navigate = useNavigate();
  const [tireData, setTireData] = useState({});
  const [numberOfTires, setNumberOfTires] = useState();
  const [workOrderNumber, setWorkOrderNumber] = useState();
  const [linea, setLinea] = useState();
  const [client, setClient] = useState();
  const [alertData, setAlertData] = useState(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
            setClient(tireByCodeBar.workOrder.client.companyName);
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
      // navigate("/productionFinal");
      setAlertData({
        title: "¡Exito!",
        description: "Registro actualizado.",
        color: "success",
      });
    } catch (error) {
      console.error(error);
      setAlertData({
        title: "¡Error!",
        description: "Error al actualizar registro.",
        color: "danger",
      });
    }
  });

  const handleStatusChange = async (status) => {
    setValue("status", status);
    try {
      await onSubmit({ ...tireData, status });

      // Recargar datos después de la actualización
      const updatedTire = await getTire(params.id);
      setTireData(updatedTire);

      // Mostrar la modal
      onOpen();
    } catch (error) {
      console.error(error);
      setAlertData({
        title: "¡Error!",
        description: "Error al actualizar estado.",
        color: "danger",
      });
    }
  };

 const rejections = [
    {
      value: "Corte de ceja",
      label: "Corte de ceja",
    },
    {
      value: "Ceja - Miselaneos",
      label: "Ceja - Miselaneos",
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
      value: "Rodada a baja presion",
      label: "Rodada a baja presion",
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
      value: "Separacion en ceja inducido por rebordes",
      label: "Separacion en ceja inducido por rebordes",
    },
    {
      value:
        "Desgarre o desprendimiento de orilla de banda de rodamiento inducido por arrastre",
      label:
        "       Desgarre o desprendimiento de orilla de banda de rodamiento inducido por arrastre",
    },
    {
      value: "Incorrcta aplicacion de llanta/reencauche",
      label: "Incorrcta aplicacion de llanta/reencauche",
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
      value: "Reparacion inapropiada",
      label: "Reparacion inapropiada",
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
      value: "Separacion entre cinturón y el casco",
      label: "Separacion entre cinturón y el casco",
    },
    {
      value: "Separacion de ceja",
      label: "Separacion de ceja",
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
      value: "Fallo en reparcion - Seccion",
      label: "Fallo en reparcion - Seccion",
    },
    {
      value: "Fallo en reparacion - Hoyo de clavo",
      label: "Fallo en reparacion - Hoyo de clavo",
    },
    {
      value: "Falla en reparcion - No bandag",
      label: "Falla en reparcion - No bandag",
    },
    {
      value: "Fallo en reparacion - Puntual",
      label: "Fallo en reparacion - Puntual",
    },
    {
      value: "Fallo en reparcion - Ceja",
      label: "Fallo en reparcion - Ceja",
    },
    {
      value: "Falla en reparacion - Reparaciones muy grande",
      label: "Falla en reparacion - Reparaciones muy grande",
    },
    {
      value: "Falla en reparacion - Reparaciones muy cercanas",
      label: "Falla en reparacion - Reparaciones muy cercanas",
    },
    {
      value: "Falla en reparacion Muchas reparaciones",
      label: "Falla en reparacion Muchas reparaciones",
    },
    {
      value: "Perforacion no detectada",
      label: "Perforacion no detectada ",
    },
    {
      value: "Vulcanizado inapropiado",
      label: "Vulcanizado inapropiado",
    },
    {
      value: "No se encontro la separacion",
      label: "No se encontro la separacion",
    },
    {
      value: "Capas dañadas en raspado",
      label: "Capas dañadas en raspado",
    },
    {
      value: "Contaminacion del caucho",
      label: "Contaminacion del caucho",
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
      value: "Separacion de inner liner",
      label: "Separacion de inner liner",
    },
    {
      value: "Separacion de costado",
      label: "Separacion de costado",
    },
    {
      value: "Separacion entre cinturones",
      label: "Separacion entre cinturones",
    },
    {
      value: "Desgaste excesivo",
      label: "Desgaste excesivo",
    },
    {
      value: "Cinturon/Oxidado",
      label: "Cinturon/Oxidado",
    },
  ];

  return (
    <>
      {" "}
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

        {alertData && (
          <AlertComponent
            title={alertData.title}
            description={alertData.description}
            color={alertData.color}
            onClose={() => setAlertData(null)}
          />
        )}

        <div className="border-2 border-slate-50  py-3 px-10 rounded-md shadow-lg w-full">
          <div className="text-center text-xl font-semibold mb-2">
            <span>{client}</span>
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
                <span className="font-medium text-lg">
                  {tireData.modelTire}
                </span>
              </p>
              <p>
                Numero de orden{" "}
                <span className="font-medium text-lg">
                  {workOrderNumber} ({linea}/{numberOfTires})
                </span>
              </p>
            </div>
          </div>
          <div className="text-center text-xl font-semibold mb-2">
            <span>{tireData.itemCode}</span>
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
          <div className="flex flex-wrap gap-4 justify-between">
            <div className="flex gap-4">
              <div>
                <button
                  type="button"
                  className="text-white font-medium bg-buttonSecondary py-3 px-9 rounded-md shadow-md hover:bg-buttonSecondaryHover duration-500 hover:duration-500"
                  onClick={() => handleStatusChange("Pasa")}
                >
                  PASA
                </button>
              </div>
              <div>
                {" "}
                <button
                  type="button"
                  className="text-white font-medium bg-buttonTertiary py-3 px-5 rounded-md shadow-md hover:bg-buttonTertiaryHover duration-500 hover:duration-500"
                  onClick={() => handleStatusChange("Rechazo")}
                >
                  RECHAZO
                </button>
              </div>
            </div>

            <div className=" flex gap-4">
              <div>
                {" "}
                <button
                  type="button"
                  className="text-white font-medium bg-colorPrimary py-3 px-5 rounded-md shadow-md hover:bg-blue-900 duration-500 hover:duration-500"
                  onClick={() => handleStatusChange("Sin Costo")}
                >
                  SIN COSTO
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
      {
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
          <ModalContent>
            <ModalHeader className="flex flex-col gap-1">
              ¿Imprimir etiqueta?
            </ModalHeader>
            <ModalBody>
              <PrintLabelComponent tire={tireData} />
            </ModalBody>
            <ModalFooter>
              <Button
                color="primary"
                onPress={() => {
                  onOpenChange(); // Cierra el modal
                  navigate("/productionInitial"); // Redirige
                }}
              >
                Cerrar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      }
    </>
  );
}

export default EditInitialPage;
