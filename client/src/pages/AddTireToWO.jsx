import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useTire } from "../context/TireContext";
import { useWorkOrder } from "../context/WorkOrderContext";
import { useState } from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import socket from "../socket";
import { Focus } from "lucide-react";
import {
  Input,
  Select,
  SelectItem,
  Autocomplete,
  AutocompleteItem,
  Button,
} from "@heroui/react";
import AlertComponent from "../components/ui/AlertComponent";

export const CameraIcon = ({
  fill = "currentColor",
  size,
  height,
  width,
  ...props
}) => {
  return (
    <svg
      fill="none"
      height={size || height || 24}
      viewBox="0 0 24 24"
      width={size || width || 24}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        clipRule="evenodd"
        d="M17.44 6.236c.04.07.11.12.2.12 2.4 0 4.36 1.958 4.36 4.355v5.934A4.368 4.368 0 0117.64 21H6.36A4.361 4.361 0 012 16.645V10.71a4.361 4.361 0 014.36-4.355c.08 0 .16-.04.19-.12l.06-.12.106-.222a97.79 97.79 0 01.714-1.486C7.89 3.51 8.67 3.01 9.64 3h4.71c.97.01 1.76.51 2.22 1.408.157.315.397.822.629 1.31l.141.299.1.22zm-.73 3.836c0 .5.4.9.9.9s.91-.4.91-.9-.41-.909-.91-.909-.9.41-.9.91zm-6.44 1.548c.47-.47 1.08-.719 1.73-.719.65 0 1.26.25 1.72.71.46.459.71 1.068.71 1.717A2.438 2.438 0 0112 15.756c-.65 0-1.26-.25-1.72-.71a2.408 2.408 0 01-.71-1.717v-.01c-.01-.63.24-1.24.7-1.699zm4.5 4.485a3.91 3.91 0 01-2.77 1.15 3.921 3.921 0 01-3.93-3.926 3.865 3.865 0 011.14-2.767A3.921 3.921 0 0112 9.402c1.05 0 2.04.41 2.78 1.15.74.749 1.15 1.738 1.15 2.777a3.958 3.958 0 01-1.16 2.776z"
        fill={fill}
        fillRule="evenodd"
      />
    </svg>
  );
};

function AddTireToWO() {
  const [scannedCode, setScannedCode] = useState(""); // Estado para el código escaneado
  const [isScannerOpen, setIsScannerOpen] = useState(false); // Control del modal
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { closeWorkOrder } = useWorkOrder();
  const { createTire, errors: registerErrors } = useTire();
  const [alertData, setAlertData] = useState(null); // Para controlar si mostrar el Alert

  const onSubmit = handleSubmit((values) => {
    // Combinar los valores del formulario con el código de barras actual
    const formData = { ...values, barCode: scannedCode };
    createTire(formData);

    // Incrementar el código de barras si es numérico, de lo contrario dejar en blanco o mantener el valor.
    const numericCode = Number(scannedCode);

    window.scrollTo({
      top: 0,
      behavior: "smooth", // para que se vea mejor
    });

    setAlertData({
      title: "¡LLanta registrada!",
      description: "La llanta fue registrada exitosamente.",
      color: "success",
    });

    if (!isNaN(numericCode)) {
      const newCode = numericCode + 1;
      setScannedCode(newCode.toString());
    } else {
      // Si no es un número, puedes optar por resetear el campo o mantenerlo
      setScannedCode("");
    }
  });

  const handleScannerOpen = () => setIsScannerOpen(true);
  const handleScannerClose = () => setIsScannerOpen(false);

  const handleClick = async () => {
    try {
      if (!user || !user.name) {
        console.error("No se encontró el usuario");
        return;
      }
      await closeWorkOrder({
        socketId: socket.id,
        username: user.name,
      });
      navigate("/createWorkOrder");
      console.log(`Orden de trabajo creada por: ${user.name}`);
    } catch (error) {
      console.error("Error al cerrar la orden de trabajo:", error.message);
    }
  };

  const brandOfTire = [
    { value: "ADVANCE", label: "ADVANCE" },
    { value: "ADVANTA", label: "ADVANTA" },
    { value: "ADVENTUR", label: "ADVENTUR" },
    { value: "AEMSTRONG", label: "AEMSTRONG" },
    { value: "AEOLUS", label: "AEOLUS" },
    { value: "AGATE", label: "AGATE" },
    { value: "AMBERSTONE  ", label: "AMBERSTONE  " },
    { value: "AMEN STEEL", label: "AMEN STEEL" },
    { value: "AMERICA", label: "AMERICA" },
    { value: "AMERICUS", label: "AMERICUS" },
    { value: "AMORSTEEL", label: "AMORSTEEL" },
    { value: "ANNAITE", label: "ANNAITE" },
    { value: "ANTYRE", label: "ANTYRE" },
    { value: "APLUS", label: "APLUS" },
    { value: "APOLLO", label: "APOLLO" },
    { value: "ARDUZZA", label: "ARDUZZA" },
    { value: "ARISUN", label: "ARISUN" },
    { value: "ARMOR STEEL", label: "ARMOR STEEL" },
    { value: "ARSENAL", label: "ARSENAL" },
    { value: "ASTIRE", label: "ASTIRE" },
    { value: "ATANI", label: "ATANI" },
    { value: "ATHREE-A", label: "ATHREE-A" },
    { value: "ATLAS", label: "ATLAS" },
    { value: "AUFINE", label: "AUFINE" },
    { value: "AURORA", label: "AURORA" },
    { value: "AUSTO", label: "AUSTO" },
    { value: "AUSTONE", label: "AUSTONE" },
    { value: "AXMILLE", label: "AXMILLE" },
    { value: "BALCKHAWK", label: "BALCKHAWK" },
    { value: "BANNERS", label: "BANNERS" },
    { value: "BARKLEY", label: "BARKLEY" },
    { value: "BBTIRES", label: "BBTIRES" },
    { value: "BENCHMARK", label: "BENCHMARK" },
    { value: "BF GOODRICH", label: "BF GOODRICH" },
    { value: "BFGOODRIDE", label: "BFGOODRIDE" },
    { value: "BLACK LION", label: "BLACK LION" },
    { value: "BLACKHAWK ", label: "BLACKHAWK " },
    { value: "BLACKLION ", label: "BLACKLION " },
    { value: "BOSSWAY TIRES", label: "BOSSWAY TIRES" },
    { value: "BRIDGESTONE", label: "BRIDGESTONE" },
    { value: "BULLONE", label: "BULLONE" },
    { value: "CACALRY", label: "CACALRY" },
    { value: "CACHILAND", label: "CACHILAND" },
    { value: "CAMSO", label: "CAMSO" },
    { value: "CARBON SERIES", label: "CARBON SERIES" },
    { value: "CARGO MILLER", label: "CARGO MILLER" },
    { value: "CARGOFORCE", label: "CARGOFORCE" },
    { value: "CAVARLY", label: "CAVARLY" },
    { value: "CEIPORT", label: "CEIPORT" },
    { value: "CENTARA", label: "CENTARA" },
    { value: "CERCA", label: "CERCA" },
    { value: "CEREX ", label: "CEREX " },
    { value: "CEWALRY", label: "CEWALRY" },
    { value: "CHAO YANG", label: "CHAO YANG" },
    { value: "CHENGSON", label: "CHENGSON" },
    { value: "CHEROKE", label: "CHEROKE" },
    { value: "CHINA", label: "CHINA" },
    { value: "CHINA MAKE", label: "CHINA MAKE" },
    { value: "COAT", label: "COAT" },
    { value: "COLDSHIELD", label: "COLDSHIELD" },
    { value: "COMPASAL ", label: "COMPASAL " },
    { value: "CONSTANCY", label: "CONSTANCY" },
    { value: "CONSTELATION", label: "CONSTELATION" },
    { value: "CONTINENTAL", label: "CONTINENTAL" },
    { value: "COOPERTIRES", label: "COOPERTIRES" },
    { value: "COSMO", label: "COSMO" },
    { value: "CROSS WIND", label: "CROSS WIND" },
    { value: "CROWN", label: "CROWN" },
    { value: "DAWTONWN", label: "DAWTONWN" },
    { value: "DAYTON", label: "DAYTON" },
    { value: "DEARLY", label: "DEARLY" },
    { value: "DELTA POWER", label: "DELTA POWER" },
    { value: "DINA TRACK", label: "DINA TRACK" },
    { value: "DOUBLE  STAR", label: "DOUBLE  STAR" },
    { value: "DOUBLE COIN", label: "DOUBLE COIN" },
    { value: "DRIVEMASTER", label: "DRIVEMASTER" },
    { value: "DUNLOP", label: "DUNLOP" },
    { value: "DURATION", label: "DURATION" },
    { value: "DURUN", label: "DURUN" },
    { value: "DYNACARGO", label: "DYNACARGO" },
    { value: "DYNATRAC", label: "DYNATRAC" },
    { value: "EMPIRE", label: "EMPIRE" },
    { value: "ENERGY", label: "ENERGY" },
    { value: "ESMILLE", label: "ESMILLE" },
    { value: "EUDEMON", label: "EUDEMON" },
    { value: "EUZAKDI ", label: "EUZAKDI " },
    { value: "EVERTONE", label: "EVERTONE" },
    { value: "EVERTOUR", label: "EVERTOUR" },
    { value: "FALKEN", label: "FALKEN" },
    { value: "FESTIE", label: "FESTIE" },
    { value: "FIRE HAWK", label: "FIRE HAWK" },
    { value: "FIRESTONE", label: "FIRESTONE" },
    { value: "FORTUNE", label: "FORTUNE" },
    { value: "FRON WAY", label: "FRON WAY" },
    { value: "FULL RUN", label: "FULL RUN" },
    { value: "GALAXY", label: "GALAXY" },
    { value: "GALDIATOR", label: "GALDIATOR" },
    { value: "GENERAL", label: "GENERAL" },
    { value: "GFT RIDER", label: "GFT RIDER" },
    { value: "GINAKOY", label: "GINAKOY" },
    { value: "GLADIATOR", label: "GLADIATOR" },
    { value: "GMX", label: "GMX" },
    { value: "GOLD PANTER", label: "GOLD PANTER" },
    { value: "GOLD SHIELD", label: "GOLD SHIELD" },
    { value: "GOLD WAY", label: "GOLD WAY" },
    { value: "GOLDEN  CROWN  ", label: "GOLDEN  CROWN  " },
    { value: "GOLDWAY", label: "GOLDWAY" },
    { value: "GOODRIDE", label: "GOODRIDE" },
    { value: "GOODYEAR ", label: "GOODYEAR " },
    { value: "GRAND STONE", label: "GRAND STONE" },
    { value: "GREAD WAY", label: "GREAD WAY" },
    { value: "GREEN DRAGON", label: "GREEN DRAGON" },
    { value: "GREEN MAX", label: "GREEN MAX" },
    { value: "GREMAX", label: "GREMAX" },
    { value: "GT RADIAL", label: "GT RADIAL" },
    { value: "GUTE ROAD ", label: "GUTE ROAD " },
    { value: "HANKOOK ", label: "HANKOOK " },
    { value: "HANKSUNGI", label: "HANKSUNGI" },
    { value: "HAPPY ROAD", label: "HAPPY ROAD" },
    { value: "HAWKWAY", label: "HAWKWAY" },
    { value: "HERCULES", label: "HERCULES" },
    { value: "INTERSTATE", label: "INTERSTATE" },
    { value: "IOYROAD", label: "IOYROAD" },
    { value: "IRON HEAD", label: "IRON HEAD" },
    { value: "IRON MAN", label: "IRON MAN" },
    { value: "JET RIB", label: "JET RIB" },
    { value: "JET STEEL", label: "JET STEEL" },
    { value: "JET TIRE", label: "JET TIRE" },
    { value: "JET TRAK", label: "JET TRAK" },
    { value: "JET WAY", label: "JET WAY" },
    { value: "JINYU", label: "JINYU" },
    { value: "JK TIRE", label: "JK TIRE" },
    { value: "JOGROAD", label: "JOGROAD" },
    { value: "JOYALL", label: "JOYALL" },
    { value: "JOYROAD", label: "JOYROAD" },
    { value: "JOYUS", label: "JOYUS" },
    { value: "JR TIRE", label: "JR TIRE" },
    { value: "JUMBO", label: "JUMBO" },
    { value: "KAPSEN", label: "KAPSEN" },
    { value: "KARO", label: "KARO" },
    { value: "KELLY", label: "KELLY" },
    { value: "KHUMO", label: "KHUMO" },
    { value: "KJTYRE", label: "KJTYRE" },
    { value: "KORYO", label: "KORYO" },
    { value: "LAN VIGATOR", label: "LAN VIGATOR" },
    { value: "LANDSCAPE", label: "LANDSCAPE" },
    { value: "LANDYTIRE", label: "LANDYTIRE" },
    { value: "LANVIGATOR", label: "LANVIGATOR" },
    { value: "LAUFEN", label: "LAUFEN" },
    { value: "LING LONG", label: "LING LONG" },
    { value: "LONG MARCH", label: "LONG MARCH" },
    { value: "LONG TRACK", label: "LONG TRACK" },
    { value: "LUCKYRIVER", label: "LUCKYRIVER" },
    { value: "LUNG TRACK", label: "LUNG TRACK" },
    { value: "LUNIS", label: "LUNIS" },
    { value: "MAGNA", label: "MAGNA" },
    { value: "MATADOR", label: "MATADOR" },
    { value: "MAX WIND", label: "MAX WIND" },
    { value: "MAXXIS ", label: "MAXXIS " },
    { value: "MEXTROAD", label: "MEXTROAD" },
    { value: "MICHELIN", label: "MICHELIN" },
    { value: "MILE PRO ", label: "MILE PRO " },
    { value: "MILERSTONE", label: "MILERSTONE" },
    { value: "MIRAGE", label: "MIRAGE" },
    { value: "MMEWAY", label: "MMEWAY" },
    { value: "NAVITRAC", label: "NAVITRAC" },
    { value: "NEXT ROAD", label: "NEXT ROAD" },
    { value: "NOVA MAXX", label: "NOVA MAXX" },
    { value: "NOWTRAC", label: "NOWTRAC" },
    { value: "ONYX", label: "ONYX" },
    { value: "OTANI", label: "OTANI" },
    { value: "OVATION", label: "OVATION" },
    { value: "PACE", label: "PACE" },
    { value: "PEARLY", label: "PEARLY" },
    { value: "PIRELLI", label: "PIRELLI" },
    { value: "PNESTONE", label: "PNESTONE" },
    { value: "POLO", label: "POLO" },
    { value: "POWER", label: "POWER" },
    { value: "PRIME WELL", label: "PRIME WELL" },
    { value: "PRINX", label: "PRINX" },
    { value: "RACE", label: "RACE" },
    { value: "RACE ALONE", label: "RACE ALONE" },
    { value: "RADAR", label: "RADAR" },
    { value: "RANDSTONE", label: "RANDSTONE" },
    { value: "REACEALONE", label: "REACEALONE" },
    { value: "REARLY", label: "REARLY" },
    { value: "REAZAION", label: "REAZAION" },
    { value: "RED MAX", label: "RED MAX" },
    { value: "REGAL", label: "REGAL" },
    { value: "REMINGTONE", label: "REMINGTONE" },
    { value: "RIGURUS", label: "RIGURUS" },
    { value: "RNKING", label: "RNKING" },
    { value: "ROAD LUX", label: "ROAD LUX" },
    { value: "ROAD MASTER  ", label: "ROAD MASTER  " },
    { value: "ROAD ONE", label: "ROAD ONE" },
    { value: "ROADSHINE ", label: "ROADSHINE " },
    { value: "ROUTE WAY", label: "ROUTE WAY" },
    { value: "ROYAL BLACK", label: "ROYAL BLACK" },
    { value: "ROYAL MEGA", label: "ROYAL MEGA" },
    { value: "ROYALE", label: "ROYALE" },
    { value: "RUNKING", label: "RUNKING" },
    { value: "RURUN", label: "RURUN" },
    { value: "SAFECESS", label: "SAFECESS" },
    { value: "SAFEKING", label: "SAFEKING" },
    { value: "SAILUN", label: "SAILUN" },
    { value: "SAKUN", label: "SAKUN" },
    { value: "SALMAX", label: "SALMAX" },
    { value: "SAMSON", label: "SAMSON" },
    { value: "SEBA", label: "SEBA" },
    { value: "SENTERA", label: "SENTERA" },
    { value: "SIERRA", label: "SIERRA" },
    { value: "SILVER KING", label: "SILVER KING" },
    { value: "SINERGY", label: "SINERGY" },
    { value: "SKY FIRES", label: "SKY FIRES" },
    { value: "SKYPOWER", label: "SKYPOWER" },
    { value: "SMARK", label: "SMARK" },
    { value: "SOLAPSHIELD", label: "SOLAPSHIELD" },
    { value: "SPORTRACK", label: "SPORTRACK" },
    { value: "STAR LINE", label: "STAR LINE" },
    { value: "STEEL MARK", label: "STEEL MARK" },
    { value: "SUMITOMO", label: "SUMITOMO" },
    { value: "SUN FULL", label: "SUN FULL" },
    { value: "SUNSHINE", label: "SUNSHINE" },
    { value: "SUPER CARGO", label: "SUPER CARGO" },
    { value: "SUPER HAWK", label: "SUPER HAWK" },
    { value: "SUPER MAX", label: "SUPER MAX" },
    { value: "SYNERGY", label: "SYNERGY" },
    { value: "TAITONG", label: "TAITONG" },
    { value: "TBB TIRES", label: "TBB TIRES" },
    { value: "TERAFLEX", label: "TERAFLEX" },
    { value: "TERRA KING", label: "TERRA KING" },
    { value: "THREE-A", label: "THREE-A" },
    { value: "THUNDERE", label: "THUNDERE" },
    { value: "TOLEDO", label: "TOLEDO" },
    { value: "TORCH", label: "TORCH" },
    { value: "TORNEL", label: "TORNEL" },
    { value: "TORNADO", label: "TORNADO" },
    { value: "TORQUE TYRES", label: "TORQUE TYRES" },
    { value: "TOYO", label: "TOYO" },
    { value: "TRAN MON", label: "TRAN MON" },
    { value: "TRANCEALONE", label: "TRANCEALONE" },
    { value: "TRANPORTER", label: "TRANPORTER" },
    { value: "TRANSTERRA", label: "TRANSTERRA" },
    { value: "TRIANGLE", label: "TRIANGLE" },
    { value: "TRINGLE", label: "TRINGLE" },
    { value: "TRUCK MASTER", label: "TRUCK MASTER" },
    { value: "TURN PIKE", label: "TURN PIKE" },
    { value: "TYRES", label: "TYRES" },
    { value: "UNIROYAL", label: "UNIROYAL" },
    { value: "VALIANT", label: "VALIANT" },
    { value: "VIGOURIUS", label: "VIGOURIUS" },
    { value: "VIKRAN TYRES", label: "VIKRAN TYRES" },
    { value: "WANLI", label: "WANLI" },
    { value: "WARRIOR", label: "WARRIOR" },
    { value: "WELLOESEA", label: "WELLOESEA" },
    { value: "WELLP", label: "WELLP" },
    { value: "WESLAKE", label: "WESLAKE" },
    { value: "WIND FORCE", label: "WIND FORCE" },
    { value: "WIND POWER", label: "WIND POWER" },
    { value: "WOSEN ", label: "WOSEN " },
    { value: "XMILLE", label: "XMILLE" },
    { value: "XWORKS", label: "XWORKS" },
    { value: "YELLOW SEA", label: "YELLOW SEA" },
    { value: "YOKOHAMA", label: "YOKOHAMA" },
    { value: "ZEEMAX", label: "ZEEMAX" },
    { value: "ZELDA", label: "ZELDA" },
    { value: "ZENNA", label: "ZENNA" },
    { value: "ZETUM", label: "ZETUM" },
    { value: "ZWARTZ", label: "ZWARTZ" },
  ];

  const services = [
    { value: "Reparación", label: "Reparación" },
    { value: "Renovado", label: "Renovado" },
    { value: "Desecho", label: "Desecho" },
  ];

  const allContinental = [
    { value: "HT3", label: "HT3" },
    { value: "HDL", label: "HDL" },
    { value: "HSC", label: "HSC" },
    { value: "HSR", label: "HSR" },
    { value: "HTL", label: "HTL" },
    { value: "B123 FUELTECH ", label: "B123 FUELTECH " },
    { value: "B197", label: "B197 " },
    { value: "B440", label: "B440 " },
    { value: "B710", label: "B710 " },
    { value: "B713 FUELTECH ", label: "B713 FUELTECH" },
    { value: "B736 ", label: "B736" },
    { value: "BDL  ", label: "BDL " },
    { value: "BDM  ", label: "BDM " },
    { value: "BDR AS", label: "BDR AS " },
    { value: "BDR HG", label: "BDR HG " },
    { value: "BDV ", label: "BDV " },
    { value: "Brawny Rib", label: "Brawny Rib" },
    { value: "Brawny Trac ", label: "Brawny Trac" },
    { value: "BRMS", label: "BRMS" },
    { value: "BRMS2", label: "BRMS2 " },
    { value: "BRR13", label: "BRR13 " },
    { value: "BRSS ", label: "BRSS" },
    { value: "BSS", label: "BSS" },
    { value: "BTL", label: "BTL" },
    { value: "BTL SA ", label: "BTL SA  " },
    { value: "BTL SA2", label: "BTL SA2 " },
    { value: "BTL3 ", label: "BTL3 " },
    { value: "BTR     ", label: "BTR   " },
    { value: "BTR SA ", label: "BTR SA " },
    { value: "BTRA SA", label: "BTRA SA s " },
    { value: "BZY", label: "BZY" },
    {
      value: "CT (Comercial Traction)",
      label: "CT (Comercial Traction) ",
    },
    { value: "D4300", label: " D4300" },
    { value: "DR5.3", label: " DR5.3" },
    { value: "ECL Drive", label: " ECL Drive" },
    { value: "Econo Drive", label: " Econo Drive" },
    { value: "FCR-T2 ", label: " FCR-T2 " },
    { value: "Highway (HW) ", label: " Highway (HW)" },
    { value: "LIGHT S", label: " LIGHT S" },
    { value: "Megatreck", label: " Megatreck" },
    {
      value: "      Metromax Rib (MMR)",
      label: " Metromax Rib (MMR)",
    },

    { value: "R4200 ", label: " R4200" },
    { value: "T4100", label: " T4100" },

    { value: "TR4.1", label: " TR4.1" },

    { value: "UAP ", label: " UAP " },
    { value: "UAP2", label: " UAP2 " },

    { value: "UDR ", label: " UDR" },
    { value: "BDX2", label: " BDX2 " },
  ];

  const helmetMeasurements = [
    { value: "11R22.5", label: "11R22.5" },
    { value: "11R24.5", label: "11R24.5" },
    { value: "295/75R22.5", label: "295/75R22.5" },
    { value: "275/80R22.5", label: "275/80R22.5" },
    { value: "295/80R22.5", label: "295/80R22.5" },
    { value: "315/80R22.5", label: "315/80R22.5" },
    { value: "12R22.5", label: "12R22.5" },
    { value: "305/75R24.5", label: "305/75R24.5" },
    { value: "225/70R19.5", label: "225/70R19.5" },
    { value: "275/80R24.5", label: "275/80R24.5" },
    { value: "285/75R24.5", label: "285/75R24.5" },
    { value: "225/95-17", label: "225/95-17" },
    { value: "750-17", label: "750-17" },
    { value: "215/75R17.5", label: "215/75R17.5" },
    { value: "205/75R16", label: "205/75R16" },
    { value: "215/85R16", label: "215/85R16" },
    { value: "215/65R16", label: "215/65R16" },
    { value: "225/70R22.5", label: "225/70R22.5" },
    { value: "225/75R16", label: "225/75R16" },
    { value: "225/80R22.5", label: "225/80R22.5" },
    { value: "235/75R17.5", label: "235/75R17.5" },
    { value: "235/80R17", label: "235/80R17" },
    { value: "245/70R19.5", label: "245/70R19.5" },
    { value: "255/70R19.5", label: "255/70R19.5" },
    { value: "1100-20", label: "1100-20" },
    { value: "245/75R19.5", label: "245/75R19.5" },
    { value: "275/75R24.5", label: "275/75R24.5" },
    { value: "275/80R4.5", label: "275/80R4.5" },
    { value: "285/75R22.5", label: "285/75R22.5" },
    { value: "255/75R22.5", label: "255/75R22.5" },
    { value: "12-00-20", label: "12-00-20" },
    { value: "275/95R22.5", label: "275/95R22.5" },
    { value: "305/75R22.5", label: "305/75R22.5" },
    { value: "295/60R22.5", label: "295/60R22.5" },
    { value: "225/95R17", label: "225/95R17" },
    { value: "750-16", label: "750-16" },
    { value: "10R22.5", label: "10R22.5" },
    { value: "8.25R20", label: "8.25R20" },
    { value: "750R15", label: "750R15" },
    { value: "750R17", label: "750R17" },
    { value: "195R15", label: "195R15" },
    { value: "245/70R17", label: "245/70R17" },
    { value: "235/85R16", label: "235/85R16" },
    { value: "245/75R17", label: "245/75R17" },
    { value: "255/70R22.5", label: "255/70R22.5" },
    { value: "275/80R17", label: "275/80R17" },
    { value: "11-00-20", label: "11-00-20" },
    { value: "1100R20", label: "1100R20" },
    { value: "255/65R17", label: "255/65R17" },
    { value: "265/70R17", label: "265/70R17" },
    { value: "295/75R17", label: "295/75R17" },
    { value: "245/70R17.5", label: "245/70R17.5" },
    { value: "275/70R22.5", label: "275/70R22.5" },
    { value: "275/75R22.5", label: "275/75R22.5" },
    { value: "255/70R16", label: "255/70R16" },
    { value: "305/85R22.5", label: "305/85R22.5" },
    { value: "225/75R19.5", label: "225/75R19.5" },
    { value: "275/8022.5", label: "275/8022.5" },
    { value: "255/75R19.5", label: "255/75R19.5" },
    { value: "225/70R17.5", label: "225/70R17.5" },
    { value: "245/75R17.5", label: "245/75R17.5" },
    { value: "235/80R17.5", label: "235/80R17.5" },
    { value: "12.00R24.0", label: "12.00R24.0" },
    { value: "235/75R15", label: "235/75R15" },
    { value: "245/70R19,5", label: "245/70R19,5" },
    { value: "265/70R17.5", label: "265/70R17.5" },
    { value: "235/70R17.5", label: "235/70R17.5" },
    { value: "295/75R22,5", label: "295/75R22,5" },
    { value: "265/70R19.5", label: "265/70R19.5" },
    { value: "275/80R22,5", label: "275/80R22,5" },
    { value: "235/75R19.5", label: "235/75R19.5" },
    { value: "255/80R22.5", label: "255/80R22.5" },
    { value: "275/80R24,5", label: "275/80R24,5" },
    { value: "215/75R17,5", label: "215/75R17,5" },
    { value: "235/75R17", label: "235/75R17" },
    { value: "215/70R17.5", label: "215/70R17.5" },
    { value: "215/60R16", label: "215/60R16" },
  ];

  return (
    <>
      <div className="md:px-8 px-3 py-10 max-w-screen-2xl mx-auto select-none">
        {/* Mostrar AlertComponent si hay alertData */}
        {alertData && (
          <AlertComponent
            title={alertData.title}
            description={alertData.description}
            color={alertData.color}
            onClose={() => setAlertData(null)}
          />
        )}
        <div className="flex items-center gap-3 mb-6">
          <h1 className="text-2xl md:text-4xl font-bold">Añadir Llanta</h1>
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
        </div>
        <form onSubmit={onSubmit}>
          <div className="mt-8">
            <h2 className="text-lg md:text-2xl font-semibold mb-3 text-sky-900">
              Datos de la llanta
            </h2>
            <p className="text-gray-600 font-medium">
              Complete los datos del registro de la llanta.
            </p>
          </div>

          <div>
            <div className="w-[100%] pt-8 text-xl">
              <div className="flex items-center flex-col sm:w-auto sm:flex-row sm:justify-between">
                <div className="relative w-[50%] md:w-[40%] ">
                  <label className="block mb-2 text-sm font-medium">
                    Servicio
                  </label>
                  <Select
                    className="shadow-md rounded-xl"
                    label="Servicio"
                    placeholder="Servicios..."
                    items={services}
                    {...register("itemCode", {
                      required: "Debe seleccionar un Servicio.",
                    })}
                  >
                    {services.map((service) => (
                      <SelectItem key={service.value} value={service.value}>
                        {service.label}
                      </SelectItem>
                    ))}
                  </Select>
                  {errors.itemCode && (
                    <p className="text-red-500 text-xs">
                      Este campo es requerido
                    </p>
                  )}
                </div>
                <div className="relative md:w-5/12 w-auto mt-5 sm:mt-0 md:flex sm:justify-between">
                  <div className="sm:w-[85%]">
                    <Input
                      type="text"
                      label="Escanea o escribe el código..."
                      value={scannedCode}
                      variant={"underlined"}
                      {...register("barCode", { required: true })}
                      onChange={(e) => setScannedCode(e.target.value)}
                    />
                  </div>
                  {errors.barCode && (
                    <p className="text-red-500 text-xs">
                      Este campo es requerido
                    </p>
                  )}
                  <div className="flex justify-center mt-4 md:mt-0">
                    <Button
                      onPress={handleScannerOpen}
                      isIconOnly
                      aria-label="Take a photo"
                      color="warning"
                      variant="faded"
                    >
                      <CameraIcon />
                    </Button>
                  </div>
                </div>
                {isScannerOpen && (
                  <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-md shadow-lg z-[100]">
                      <h1 className="text-xl font-bold mb-4">
                        Escanea el código
                      </h1>
                      <BarcodeScannerComponent
                        width={600}
                        delay={600}
                        videoConstraints={{
                          facingMode: "environment",
                          width: { ideal: 1280 },
                          height: { ideal: 720 },
                        }}
                        onUpdate={(err, result) => {
                          if (result) {
                            setScannedCode(result.text);
                            handleScannerClose();
                          }
                        }}
                      />
                      <button
                        className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md"
                        onClick={handleScannerClose}
                      >
                        Cerrar
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div>
            <div className="mt-8">
              <h2 className="text-lg md:text-2xl font-semibold mb-3 text-sky-900">
                Medida y Marca
              </h2>
            </div>
            <div className="w-[100%] pt-6 text-xl">
              <div className="flex items-center flex-col sm:w-auto sm:flex-row sm:justify-between">
                <div className="relative w-[60%] md:w-[40%]">
                  <Select
                    className="shadow-md rounded-xl"
                    label="Medidas"
                    id="helmetMeasurement"
                    items={helmetMeasurements}
                    {...register("helmetMeasurement", {
                      required: "Debe seleccionar una medida.",
                    })}
                  >
                    {(item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    )}
                  </Select>
                  {errors.helmetMeasurement && (
                    <p className="text-red-500 text-xs">
                      Este campo es requerido
                    </p>
                  )}
                </div>
                <div className="relative w-[60%] md:w-[40%] mt-5 sm:mt-0">
                  <Autocomplete
                    className="shadow-md rounded-xl "
                    defaultItems={brandOfTire}
                    label="Marcas"
                    listboxProps={{
                      emptyContent: "Marca no encontrada",
                    }}
                    {...register("brand",)}
                  >
                    {(item) => (
                      <AutocompleteItem key={item.value} value={item.value}>
                        {item.label}
                      </AutocompleteItem>
                    )}
                  </Autocomplete>
                  {errors.brand && (
                    <p className="text-red-500 text-xs">
                      Este campo es requerido
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="mt-8">
              <h2 className="text-lg md:text-2xl font-semibold mb-3 text-sky-900">
                Modelo y Banda Requerida
              </h2>
            </div>
            <div className="w-[100%] pt-6 text-xl">
              <div className="flex items-center flex-col sm:w-auto sm:flex-row sm:justify-between">
                <div className="relative w-[50%] md:w-[40%] mt-5 sm:mt-0">
                  <Input
                    label="Modelo"
                    variant={"underlined"}
                    {...register("modelTire", )}
                  />
                  {errors.modelTire && (
                    <p className="text-red-500 text-xs">
                      Este campo es requerido
                    </p>
                  )}
                </div>
                <div className="relative w-[60%] md:w-[40%] mt-5 sm:mt-0">
                  <Autocomplete
                    className="shadow-md rounded-xl "
                    defaultItems={allContinental}
                    label="Banda Requerida"
                    id="requiredBand"
                    listboxProps={{
                      emptyContent: "Banda no encontrada",
                    }}
                    {...register("requiredBand",)}
                  >
                    {(item) => (
                      <AutocompleteItem key={item.value} value={item.value}>
                        {item.label}
                      </AutocompleteItem>
                    )}
                  </Autocomplete>
                  {errors.requiredBand && (
                    <p className="text-red-500 text-xs">
                      Este campo es requerido
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* DOT Y BANDA REQUERIDA */}
          <div>
            <div className="mt-8">
              <h2 className="text-lg md:text-2xl font-semibold mb-3 text-sky-900">
                DOT y Quemado
              </h2>
            </div>
            <div className="w-[100%] pt-6 text-xl">
              <div className="flex items-center flex-col sm:w-auto sm:flex-row sm:justify-between">
                <div className="relative md:w-5/12 w-auto">
                  <Input
                    label="DOT"
                    id="antiquityDot"
                    type="text"
                    variant={"underlined"}
                    {...register("antiquityDot")}
                  />
                  {errors.antiquityDot && (
                    <p className="text-red-500 text-xs">
                      Este campo es requerido
                    </p>
                  )}
                </div>
                <div className="relative w-[50%] md:w-[40%] mt-5 sm:mt-0">
                  <Input
                    label="Quemado"
                    type="text"
                    variant={"underlined"}
                    {...register("serialNumber")}
                  />
                  {errors.serialNumber && (
                    <p className="text-red-500 text-xs">
                      Este campo es requerido
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="mt-8">
              <h2 className="text-lg md:text-2xl font-semibold mb-3 text-sky-900">
                Milimetraje
              </h2>
            </div>
            <div className="w-[100%] pt-6 text-xl">
              <div className="flex items-center flex-col sm:w-auto sm:flex-row sm:justify-between">
                <div className="relative w-[60%] md:w-[40%]">
                  <Input
                    label="Milimetraje"
                    variant={"underlined"}
                    {...register("millimeterFootage")}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-end mt-5">
            <button
              className="bg-buttonSecondary hover:bg-buttonSecondaryHover text-white font-medium py-2 px-5 rounded-md shadow-md"
              type="submit"
            >
              Agregar llanta
            </button>
            <button
              className="bg-buttonTertiary hover:bg-buttonTertiaryHover text-white mt-2 sm:mt-0 sm:ml-4 font-medium py-2 px-5 rounded-md shadow-md duration-500 hover:duration-500"
              onClick={handleClick}
            >
              <p>Cerrar orden</p>
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddTireToWO;
