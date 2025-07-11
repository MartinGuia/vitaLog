import { useForm } from "react-hook-form";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useTire } from "../context/TireContext";
import { StepBack } from "lucide-react";
import { useState, useEffect } from "react";
import PrintLabelComponent from "../components/ui/PrintLabelComponent";
import AlertComponent from "../components/ui/AlertComponent";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  ModalFooter,
  useDisclosure,
  Autocomplete,
  AutocompleteItem,
} from "@heroui/react";

function EditFinalPage() {
  const { register, handleSubmit, setValue, watch } = useForm();
  const { updateProductionTire, getTire } = useTire();
  const params = useParams();
  const [workOrderNumber, setWorkOrderNumber] = useState();
  const [linea, setLinea] = useState();
  const [numberOfTires, setNumberOfTires] = useState();
  const [tireData, setTireData] = useState({});
  const [alertData, setAlertData] = useState(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const navigate = useNavigate();
  const [client, setClient] = useState();

  const appliedBand = watch("appliedBand");
  const appliedBandBandag = watch("appliedBandBandag");

  const isPassEnabled = appliedBand || appliedBandBandag;

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
            setClient(tire.workOrder.client.companyName);
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

  const bandContinental = [
    { value: "HDL - 225", label: "HDL - 225" },
    { value: "HDL - 210", label: "HDL - 210" },
    { value: "HDL - 215", label: "HDL - 215" },
    { value: "HDL - 235", label: "HDL - 235" },
    { value: "HDL - 245", label: "HDL - 245" },
    { value: "HT3 - 210", label: "HT3 - 210" },
    { value: "HT3 - 220", label: "HT3 - 220" },
    { value: "HT3 - 230", label: "HT3 - 230" },
    { value: "HT3 - 240", label: "HT3 - 240" },
    { value: "HSC - 215", label: "HSC - 215" },
    { value: "HSC - 220", label: "HSC - 220" },
    { value: "HSC - 225", label: "HSC - 225" },
    { value: "HSC - 230", label: "HSC - 230" },
    { value: "HSC - 235", label: "HSC - 235" },
    { value: "HSC - 245", label: "HSC - 245" },
    { value: "HSR - 195", label: "HSR - 195" },
    { value: "HSR - 180", label: "HSR - 180" },
    { value: "HTL - 230", label: "HTL - 230" },
    { value: "HTL - 260", label: "HTL - 260" },
  ];

  const bandBandag = [
    { value: "B123 FUELTECH - 220  ", label: "B123 FUELTECH - 220" },
    { value: "B123 FUELTECH - 230  ", label: "B123 FUELTECH - 230" },
    { value: "B197 - 230 ", label: "B197 - 230" },
    { value: "B197 - 210 ", label: "B197 - 210" },
    { value: "B197 - 220 ", label: "B197 - 220" },
    { value: "B440 - 250 ", label: "B440 - 250" },
    { value: "B440 - 240 ", label: "B440 - 240" },
    { value: "B440 - 230 ", label: "B440 - 230" },
    { value: "B440 - 220 ", label: "B440 - 220" },
    { value: "B440 - 210 ", label: "B440 - 210" },
    { value: "B710 - 230 ", label: "B710 - 230" },
    { value: "B710 - 220 ", label: "B710 - 220" },
    { value: "B710 - 210 ", label: "B710 - 210" },
    { value: "B713 FUELTECH - 240", label: " B713 FUELTECH - 240" },
    { value: "B713 FUELTECH - 230", label: " B713 FUELTECH - 230" },
    { value: "B713 FUELTECH - 220", label: " B713 FUELTECH - 220" },
    { value: "B713 FUELTECH - 210", label: " B713 FUELTECH - 210" },
    { value: "B736 - 230", label: " B736 - 230" },
    { value: "B736 - 270", label: " B736 - 270" },
    { value: "B736 - 240", label: " B736 - 240" },
    { value: "B736 - 250", label: " B736 - 250" },
    { value: "B736 - 260", label: " B736 - 260 " },
    { value: "BDL - 210 ", label: " BDL - 210  " },
    { value: "BDL - 230 ", label: " BDL - 230  " },
    { value: "BDL - 220 ", label: " BDL - 220  " },
    { value: "BDM - 220", label: " BDM - 220  " },
    { value: "BDM - 230", label: " BDM - 230  " },
    { value: "BDM - 240", label: " BDM - 240  " },
    { value: "BDM - 250", label: " BDM - 250" },
    { value: "BDR AS - 230", label: " BDR AS - 230" },
    { value: "BDR HG - 260", label: " BDR HG - 260" },
    { value: "BDR HG - 230", label: " BDR HG - 230     " },
    { value: "BDR HG - 240", label: " BDR HG - 240     " },
    { value: "BDV - 260", label: " BDV - 260" },
    { value: "BDV - 210", label: " BDV - 210" },
    { value: "BDV - 230", label: " BDV - 230" },
    { value: "BDV - 240", label: " BDV - 240" },
    { value: "BDV - 220", label: " BDV - 220" },
    { value: "Brawny Rib - 600  ", label: " Brawny Rib - 600 " },
    { value: "Brawny Rib - 800  ", label: " Brawny Rib - 800 " },
    { value: "Brawny Rib - 750  ", label: " Brawny Rib - 750 " },
    { value: "Brawny Rib - 700  ", label: " Brawny Rib - 700 " },
    { value: "Brawny Rib - 850  ", label: " Brawny Rib - 850 " },
    { value: "Brawny Trac - 150 ", label: " Brawny Trac - 150" },
    { value: "Brawny Trac - 140 ", label: " Brawny Trac - 140" },
    { value: "BRMS - 240  ", label: " BRMS - 240 " },
    { value: "BRMS2 - 250 ", label: " BRMS2 - 250" },
    { value: "BRR13 - 230 ", label: " BRR13 - 230" },
    { value: "BRR13 - 250 ", label: " BRR13 - 250" },
    { value: "BRR13 - 260 ", label: " BRR13 - 260" },
    { value: "BRR13 - 240 ", label: " BRR13 - 240" },
    { value: "BRR13 - 220", label: " BRR13 - 220" },
    { value: "BRSS - 230 ", label: " BRSS - 230 " },
    { value: "BRSS - 200 ", label: " BRSS - 200 " },
    { value: "BRSS - 220 ", label: " BRSS - 220 " },
    { value: "BRSS - 210", label: " BRSS - 210" },
    { value: "BSS - 230 ", label: " BSS - 230 " },
    { value: "BSS - 220 ", label: " BSS - 220 " },
    { value: "BTL - 230 ", label: " BTL - 230 " },
    { value: "BTL - 220 ", label: " BTL - 220 " },
    { value: "BTL - 210 ", label: " BTL - 210 " },
    { value: "BTL SA - 210  ", label: " BTL SA - 210 " },
    { value: "BTL SA - 220  ", label: " BTL SA - 220 " },
    { value: "BTL SA - 230  ", label: " BTL SA - 230 " },
    { value: "BTL SA2 - 230 ", label: " BTL SA2 - 230" },
    { value: "BTL SA2 - 240 ", label: " BTL SA2 - 240" },
    { value: "BTL SA2 - 210 ", label: " BTL SA2 - 210" },
    { value: "BTL SA2 - 220 ", label: " BTL SA2 - 220" },
    { value: "BTL3 - 240", label: " BTL3 - 240" },
    { value: "BTL3 - 220", label: " BTL3 - 220" },
    { value: "BTL3 - 230", label: " BTL3 - 230" },
    { value: "BTL3 - 250", label: " BTL3 - 250" },
    { value: "BTR SA - 260 ", label: " BTR SA - 260" },
    { value: "BTR - 230", label: " BTR - 230" },
    { value: "BTR SA - 240", label: " BTR SA - 240" },
    { value: "BTR SA - 250", label: " BTR SA - 250" },
    { value: "BTRA SA s - 220  ", label: " BTRA SA s - 220" },
    { value: "BZY - 9", label: " BZY - 9" },
    { value: "BZY - 8.5", label: " BZY - 8.5" },
    { value: "BZY - 8", label: " BZY - 8" },
    { value: "BZY - 10.5", label: " BZY - 10.5" },
    {
      value: "      CT (Comercial Traction) - 600 ",
      label: " CT (Comercial Traction) - 600",
    },
    {
      value: "      CT (Comercial Traction) - 800 ",
      label: " CT (Comercial Traction) - 800",
    },
    { value: "D4300 - 9  ", label: " D4300 - 9  " },
    { value: "D4300 - 9.5", label: " D4300 - 9.5" },
    { value: "D4300 10.5 ", label: " D4300 10.5 " },
    { value: "D4300 - 8.5", label: " D4300 - 8.5" },
    { value: "D4300 - 250", label: " D4300 - 250" },
    { value: "DR5.3 - 210", label: " DR5.3 - 210" },
    { value: "DR5.3 - 220", label: " DR5.3 - 220" },
    { value: "DR5.3 - 230", label: " DR5.3 - 230" },
    { value: "DR5.3 - 240      ", label: " DR5.3 - 240      " },
    { value: "DR5.3 - 200      ", label: " DR5.3 - 200      " },
    { value: "ECL Drive - 8.5  ", label: " ECL Drive - 8.5  " },
    { value: "Econo Drive - 9.5", label: " Econo Drive - 9.5" },
    { value: "Econo Drive - 9  ", label: " Econo Drive - 9  " },
    { value: "Econo Drive - 8  ", label: " Econo Drive - 8  " },
    { value: "Econo Drive - 8.5", label: " Econo Drive - 8.5" },
    { value: "Econo Drive 10.5 ", label: " Econo Drive 10.5 " },
    { value: "FCR-T2 - 220     ", label: " FCR-T2 - 220     " },
    { value: "FCR-T2 - 210     ", label: " FCR-T2 - 210     " },
    { value: "FCR-T2 - 240     ", label: " FCR-T2 - 240     " },
    { value: "FCR-T2 - 230     ", label: " FCR-T2 - 230     " },
    { value: "Highway (HW) - 3 ", label: " Highway (HW) - 3 " },
    { value: "Highway (HW) - 8 ", label: " Highway (HW) - 8 " },
    { value: "Highway (HW) - 6 ", label: " Highway (HW) - 6 " },
    { value: "LIGHT S - 190    ", label: " LIGHT S - 190    " },
    { value: "LIGHT S - 150    ", label: " LIGHT S - 150    " },
    { value: "LIGHT S - 200    ", label: " LIGHT S - 200    " },
    { value: "LIGHT S - 180    ", label: " LIGHT S - 180    " },
    { value: "LIGHT S - 215    ", label: " LIGHT S - 215    " },
    { value: "LIGHT S - 165  ", label: " LIGHT S - 165  " },
    { value: "LIGHT S - 140  ", label: " LIGHT S - 140  " },
    { value: "LIGHT S - 210  ", label: " LIGHT S - 210  " },
    { value: "Megatreck - 230", label: " Megatreck - 230" },
    { value: "Megatreck - 210", label: " Megatreck - 210" },
    { value: "Megatreck - 220", label: " Megatreck - 220" },
    {
      value: "      Metromax Rib (MMR) - 160 ",
      label: " Metromax Rib (MMR) - 160",
    },
    {
      value: "      Metromax Rib (MMR) - 195 ",
      label: " Metromax Rib (MMR) - 195",
    },
    {
      value: "      Metromax Rib (MMR) - 170 ",
      label: " Metromax Rib (MMR) - 170",
    },
    {
      value: "      Metromax Rib (MMR) - 150 ",
      label: " Metromax Rib (MMR) - 150",
    },
    { value: "R4200 - 9   ", label: " R4200 - 9   " },
    { value: "T4100 - 8.5 ", label: " T4100 - 8.5 " },
    { value: "T4100 - 265 ", label: " T4100 - 265 " },
    { value: "T4100 - 10.5", label: " T4100 - 10.5" },
    { value: "T4100 - 255 ", label: " T4100 - 255 " },
    { value: "T4100 - 9   ", label: " T4100 - 9   " },
    { value: "T4100 - 9.5 ", label: " T4100 - 9.5 " },
    { value: "TR4.1 - 230 ", label: " TR4.1 - 230 " },
    { value: "TR4.1 - 220 ", label: " TR4.1 - 220 " },
    { value: "TR4.1 - 200 ", label: " TR4.1 - 200 " },
    { value: "TR4.1 - 210", label: " TR4.1 - 210" },
    { value: "TR4.1 - 240", label: " TR4.1 - 240" },
    { value: "UAP - 210  ", label: " UAP - 210" },
    { value: "UAP - 230  ", label: " UAP - 230" },
    { value: "UAP - 240  ", label: " UAP - 240" },
    { value: "UAP - 220  ", label: " UAP - 220" },
    { value: "UAP - 260  ", label: " UAP - 260" },
    { value: "UAP - 250  ", label: " UAP - 250" },
    { value: "UAP2 - 240 ", label: " UAP2 - 240" },
    { value: "UAP2 - 220 ", label: " UAP2 - 220" },
    { value: "UAP2 - 230 ", label: " UAP2 - 230" },
    { value: "UAP2 - 210 ", label: " UAP2 - 210" },
    { value: "UDR - 240  ", label: " UDR - 240" },
    { value: "UDR - 230  ", label: " UDR - 230" },
    { value: "UDR - 210  ", label: " UDR - 210" },
    { value: "UDR - 250  ", label: " UDR - 250" },
    { value: "UDR - 220  ", label: " UDR - 220" },
    { value: "UDR - 200  ", label: " UDR - 200" },
    { value: "BDX2 - 240 ", label: " BDX2 - 240" },
    { value: "BDX2 - 260 ", label: " BDX2 - 260" },
    { value: "BDX2 - 250 ", label: " BDX2 - 250" },
  ];

  return (
    <>
      <div className="md:px-8 px-3 py-10 max-w-screen-2xl mx-auto select-none">
        <div className="flex items-center gap-3 mb-6">
          <Link to={`/productionFinal`}>
            <button className="bg-buttonPrimaryHover hover:bg-buttonPrimary shadow-md rounded-md px-4 py-1 duration-500 hover:duration-500">
              <StepBack color="white" />
            </button>
          </Link>
          <h1 className="text-2xl md:text-4xl font-bold">Inspección Final</h1>
        </div>

        {alertData && (
          <AlertComponent
            title={alertData.title}
            description={alertData.description}
            color={alertData.color}
            onClose={() => setAlertData(null)}
          />
        )}

        <div className="border-2 border-slate-50 py-3 px-10 rounded-md shadow-lg w-full">
          <div className="text-center text-xl font-semibold mb-2">
            <span>{client}</span>
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
                <span className="font-medium text-lg">
                  {tireData.modelTire}
                </span>
              </p>
              <p>
                Número de orden:{" "}
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

        <form className="mt-8" onSubmit={onSubmit}>
          {/* Banda requerida, Parches usados, ancho */}

          {/* <p className="text-sm text-gray-600 mt-4">
            Banda Continental: {appliedBand || "N/A"} <br />
            Banda Bandag: {appliedBandBandag || "N/A"}
          </p> */}

          <div>
            <div className="mt-10">
              <h2 className="text-lg md:text-2xl font-semibold mb-3 text-sky-900">
                Banda usada y razón de rechazo
              </h2>
              <p className="text-gray-600 font-medium">
                Especificar la banda usada en el renovado o si es rechazo
                especificar la razón
              </p>
            </div>
            <div className="w-[100%] pt-8 text-xl">
              <div className="flex items-center flex-col sm:w-auto sm:flex-row sm:justify-between">
                <div className="relative w-[90%] sm:w-[50%] ">
                  <div className="relative w-full">
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
                        <AutocompleteItem
                          key={rejection.value}
                          value={rejection.value}
                        >
                          {rejection.label}
                        </AutocompleteItem>
                      )}
                    </Autocomplete>
                  </div>
                </div>
                <div className="relative w-[90%] sm:w-[40%] mt-10 sm:mt-0">
                  <Autocomplete
                    className="shadow-md rounded-xl"
                    defaultItems={bandContinental}
                    label="Banda continental"
                    placeholder="Selecciona una banda"
                    listboxProps={{
                      emptyContent: "Banda no encontrada",
                    }}
                    onSelectionChange={(key) => setValue("appliedBand", key)}
                  >
                    {(bandConti) => (
                      <AutocompleteItem
                        key={bandConti.value}
                        value={bandConti.value}
                      >
                        {bandConti.label}
                      </AutocompleteItem>
                    )}
                  </Autocomplete>

                  <Autocomplete
                    className="shadow-md rounded-xl mt-10"
                    defaultItems={bandBandag}
                    label="Banda bandag"
                    placeholder="Selecciona una banda"
                    listboxProps={{
                      emptyContent: "Banda no encontrada",
                    }}
                    onSelectionChange={(key) =>
                      setValue("appliedBandBandag", key)
                    }
                  >
                    {(bandB) => (
                      <AutocompleteItem key={bandB.value} value={bandB.value}>
                        {bandB.label}
                      </AutocompleteItem>
                    )}
                  </Autocomplete>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 justify-between mt-14">
            <div className="flex gap-4">
              <div>
                <button
                  type="button"
                  className={`text-white font-medium py-3 px-9 rounded-md shadow-md duration-500 ${
                    isPassEnabled
                      ? "bg-buttonSecondary hover:bg-buttonSecondaryHover"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                  onClick={() => handleStatusChange("Pasa")}
                  disabled={!isPassEnabled}
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
                  navigate("/productionFinal"); // Redirige
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

export default EditFinalPage;
