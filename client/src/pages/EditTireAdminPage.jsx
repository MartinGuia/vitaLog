import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import InputField from "../components/ui/InputField";
import { useTire } from "../context/TireContext";
import { StepBack } from "lucide-react";
import {
  Input,
  Select,
  SelectItem,
  Autocomplete,
  AutocompleteItem,
} from "@heroui/react";
import AlertComponent from "../components/ui/AlertComponent";

function EditTirePoductionPage() {
  const { register, handleSubmit, reset } = useForm();
  const { updateTire, getTire } = useTire();
  const params = useParams();
  const [workOrder, setWorkOrder] = useState();
  const [alertData, setAlertData] = useState(null);

  useEffect(() => {
    async function loadTire() {
      if (params.id) {
        const tire = await getTire(params.id);
        if (tire) {
          setWorkOrder(tire.workOrder._id);
          reset({
            itemCode: tire.itemCode,
            barCode: tire.barCode,
            antiquityDot: tire.antiquityDot,
            requiredBand: tire.requiredBand,
            helmetMeasurement: tire.helmetMeasurement,
            brand: tire.brand,
            modelTire: tire.modelTire,
            serialNumber: tire.serialNumber,
            millimeterFootage: tire.millimeterFootage,
            quoteNumber: tire.quoteNumber,
            status: tire.status,
          });
        }
      }
    }
    loadTire();
  }, []);

  const onSubmit = handleSubmit(async (values) => {
    const updatedValues = Object.fromEntries(
      Object.entries(values).filter(([key, value]) => value !== "")
    );

    try {
      await updateTire(params.id, updatedValues);
      window.scrollTo({
        top: 0,
        behavior: "smooth", // para que se vea mejor
      });
      setAlertData({
        title: "¡Exito!",
        description: "Llanta actualizada.",
        color: "success",
      });
    } catch (error) {
      console.error(error);
      setAlertData({
        title: "¡Error!",
        description: "Error al actualizar llanta.",
        color: "danger",
      });
    }
  });

  const brandOfTire = [
    { value: "ADVANCE", label: "ADVANCE" },
    { value: "ADVENTUR", label: "ADVENTUR" },
    { value: "AEMSTRONG", label: "AEMSTRONG" },
    { value: "AEOLUS", label: "AEOLUS" },
    { value: "AGATE", label: "AGATE" },
    { value: "AMBERSTONE  ", label: "AMBERSTONE  " },
    { value: "AMEN STEEL", label: "AMEN STEEL" },
    { value: "AMERICA", label: "AMERICA" },
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

  const statusOfTire = [
    { value: "Pasa", label: "Pasa" },
    { value: "Rechazo", label: "Rechazo" },
    { value: "Sin Costo", label: "Sin Costo" },
  ];

  const allBand = [
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
    { value: "UAP - 210  ", label: " UAP - 210" },
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
          <Link to={`/workOrder/${workOrder}`}>
            <button className="bg-buttonPrimaryHover hover:bg-buttonPrimary shadow-md rounded-md px-4 py-1 duration-500 hover:duration-500">
              <StepBack color="white" />
            </button>
          </Link>
          <h1 className="text-2xl md:text-4xl font-bold">Editar Registro</h1>
        </div>
        {alertData && (
          <AlertComponent
            title={alertData.title}
            description={alertData.description}
            color={alertData.color}
            onClose={() => setAlertData(null)}
          />
        )}
        <form onSubmit={onSubmit}>
          <div className="mt-8">
            <h2 className="text-lg md:text-2xl font-semibold mb-3 text-sky-900">
              Datos de la llanta
            </h2>
            <p className="text-gray-600 font-medium">
              Editar los datos del registro de la llanta.
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
                    {...register("itemCode")}
                  >
                    {services.map((service) => (
                      <SelectItem key={service.value} value={service.value}>
                        {service.label}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
                <div className="relative md:w-5/12 w-auto mt-5 sm:mt-0 md:flex sm:justify-between">
                  <div className="sm:w-[85%]">
                    <label htmlFor="" className="text-sm">
                      Código de Barras
                    </label>
                    <InputField {...register("barCode")} />
                  </div>
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
                  <label htmlFor="" className="text-sm">
                    DOT
                  </label>
                  <InputField {...register("antiquityDot")} />
                </div>
                <div className="relative md:w-5/12 w-auto">
                  <label htmlFor="" className="text-sm">
                    Quemado
                  </label>
                  <InputField
                    type="text"
                    variant={"underlined"}
                    {...register("serialNumber")}
                  />
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="mt-8">
              <h2 className="text-lg md:text-2xl font-semibold mb-3 text-sky-900">
                Marca y Banda Requerida
              </h2>
            </div>
            <div className="w-[100%] pt-6 text-xl">
              <div className="flex items-center flex-col sm:w-auto sm:flex-row sm:justify-between">
                <div className="relative w-[60%] md:w-[40%]">
                  <label htmlFor="" className="text-sm">
                    Marca
                  </label>
                  <Autocomplete
                    className="shadow-md rounded-xl "
                    defaultItems={brandOfTire}
                    listboxProps={{
                      emptyContent: "Marca no encontrada",
                    }}
                    {...register("brand")}
                  >
                    {(item) => (
                      <AutocompleteItem key={item.value} value={item.value}>
                        {item.label}
                      </AutocompleteItem>
                    )}
                  </Autocomplete>
                </div>
                <div className="relative w-[60%] md:w-[40%] mt-5 sm:mt-0">
                  <label htmlFor="" className="text-sm">
                    Banda Requerida
                  </label>
                  <Autocomplete
                    className="shadow-md rounded-xl "
                    defaultItems={allBand}
                    listboxProps={{
                      emptyContent: "Banda no encontrada",
                    }}
                    {...register("requiredBand")}
                  >
                    {(item) => (
                      <AutocompleteItem key={item.value} value={item.value}>
                        {item.label}
                      </AutocompleteItem>
                    )}
                  </Autocomplete>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="mt-8">
              <h2 className="text-lg md:text-2xl font-semibold mb-3 text-sky-900">
                Medida y Modelo
              </h2>
            </div>
            <div className="w-[100%] pt-6 text-xl">
              <div className="flex items-center flex-col sm:w-auto sm:flex-row sm:justify-between">
                <div className="relative w-[60%] md:w-[40%]">
                  <label htmlFor="" className="text-sm">
                    Medida del casco
                  </label>
                  <Select
                    className="shadow-md rounded-xl"
                    label="Medida del casco"
                    id="helmetMeasurement"
                    items={helmetMeasurements}
                    {...register("helmetMeasurement")}
                  >
                    {(item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    )}
                  </Select>
                </div>

                <div className="relative md:w-5/12 w-auto mt-5 sm:mt-0">
                  <label htmlFor="" className="text-sm">
                    Modelo
                  </label>
                  <InputField
                    variant={"underlined"}
                    {...register("modelTire")}
                  />
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="mt-8">
              <h2 className="text-lg md:text-2xl font-semibold mb-3 text-sky-900">
                Milimetraje Y Estado de la Llanta
              </h2>
            </div>
            <div className="w-[100%] pt-6 text-xl">
              <div className="flex items-center flex-col sm:w-auto sm:flex-row sm:justify-between">
                <div className="relative w-[60%] md:w-[40%]">
                  <label htmlFor="" className="text-sm">
                    Milimetraje
                  </label>
                  <Input
                    variant={"underlined"}
                    {...register("millimeterFootage")}
                  />
                </div>
                <div className="relative w-[80%] md:w-[40%] mt-10 sm:mt-0">
                  <label className="block mb-2 text-sm font-medium">
                    Estado
                  </label>
                  <div className="relative w-full">
                    <Select
                      className="shadow-md rounded-xl"
                      placeholder="Estado de la llanta"
                      items={statusOfTire}
                      {...register("status")}
                    >
                      {statusOfTire.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="mt-8">
              <h2 className="text-lg md:text-2xl font-semibold mb-3 text-sky-900">
                Banda usada
              </h2>
            </div>
            <div className="w-[100%] pt-6 text-xl">
              <div className="flex items-center flex-col sm:w-auto sm:flex-row sm:justify-between">
                <div className="relative w-[60%] md:w-[40%]">
                  <Autocomplete
                    className="shadow-md rounded-xl "
                    defaultItems={bandContinental}
                    label="Banda continental"
                    placeholder="Selecciona una banda"
                    listboxProps={{
                      emptyContent: "Banda no encontrada",
                    }}
                    {...register("appliedBand", { required: false })}
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
                </div>
                <div className="relative w-[60%] md:w-[40%] mt-5 sm:mt-0">
                  <Autocomplete
                    className="shadow-md rounded-xl"
                    defaultItems={bandBandag}
                    label="Banda bandag"
                    placeholder="Selecciona una banda"
                    listboxProps={{
                      emptyContent: "Banda no encontrada",
                    }}
                    {...register("appliedBandBandag", { required: false })}
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

          {/* <div>
            <div className="mt-8">
              <h2 className="text-lg md:text-2xl font-semibold mb-3 text-sky-900">
                Banda usada
              </h2>
            </div>
            <div className="w-[100%] pt-6 text-xl">
              <div className="flex items-center flex-col sm:w-auto sm:flex-row sm:justify-between">
                <div className="relative w-[80%] md:w-[40%]">
                  <Autocomplete
                    className="shadow-md rounded-xl "
                    defaultItems={bandContinental}
                    label="Banda continental"
                    placeholder="Selecciona una banda"
                    listboxProps={{
                      emptyContent: "Banda no encontrada",
                    }}
                    {...register("appliedBand", { required: false })}
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
                </div>
                <div className="relative w-[80%] md:w-[40%]">
                  <div className="relative w-full">
                    <Autocomplete
                      className="shadow-md rounded-xl mt-10"
                      defaultItems={bandBandag}
                      label="Banda bandag"
                      placeholder="Selecciona una banda"
                      listboxProps={{
                        emptyContent: "Banda no encontrada",
                      }}
                      {...register("appliedBandBandag", { required: false })}
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
          </div> */}
          <div>
            <div className="mt-8">
              <h2 className="text-lg md:text-2xl font-semibold mb-3 text-sky-900">
                Razón de rechazo
              </h2>
            </div>
            <div className="w-[100%] pt-6 text-xl">
              <div className="flex items-center flex-col sm:w-auto sm:flex-row sm:justify-between">
                <div className="relative w-[80%] md:w-[40%]">
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
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-14 ">
            <div className="flex justify-end ">
              <button
                className=" text-white font-medium bg-buttonSecondary py-3 px-8 rounded-md shadow-md hover:bg-buttonSecondaryHover duration-500 hover:duration-500 "
                type="submit"
              >
                Actualizar
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default EditTirePoductionPage;
