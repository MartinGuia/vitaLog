import { useEffect, useState } from "react";
import { useTire } from "../../context/TireContext";
import { useParams } from "react-router-dom";

function PrintLabelComponent({ tire, disabled }) {
  const { getTire, printLabel } = useTire();
  const params = useParams();
  const [tireData, setTireData] = useState(null);

  useEffect(() => {
    async function loadTire() {
      try {
        if (params.id) {
          const tireData = await getTire(params.id);
          if (tireData) {
            setTireData(tireData);
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
    loadTire();
  }, []);

  const generateZPL = (tireData) => {
    if (!tireData) return "";
    return `
  ^XA
^PW640                          ; Ancho total de la etiqueta (8 cm)
^LL1760                         ; Alto total de la etiqueta (22 cm)

; **Primera línea centrada y tamaño ajustado**
^FO40,50^A0N,60,40^FDVITA-BAJIO S.A. DE C.V.^FS

; **Código de barras más largo, más oscuro y con letras más grandes**
^BY3
^FO60,130^BCN,110,Y,N,C
^A0N,45,40     ; Aumenta el tamaño de la fuente de las letras debajo del código de barras
^FD${tireData.barCode}^FS

; **Cliente (izquierda, separado un poco más del código de barras)**
^FO20,380^A0N,50,40^FD${tireData.workOrder.client.companyName}^FS

; **Número de orden (izquierda, debajo del cliente)**
^FO20,470^A0N,50,40^FDWO# ${tireData.workOrder.numero}^FS

; **Número de registro**
^FO120,470^A0N,50,40^FD (${tireData.linea}/${
      tireData.workOrder.tires.length
    })^FS

; **ItemCode (izquierda, debajo del número de orden)**
^FO350,470^A0N,50,40^FD${tireData.itemCode}^FS

; **Nombre de usuario (derecha, debajo del itemCode)**
^FO420,525^A0N,50,40^FD${tireData.user.name}^FS

; **HelmetMeasurement (centrado y grande)**
^FO100,620^A0N,110,90^FD${tireData.helmetMeasurement}^FS

; **Banda Aplicada (izquierda, tamaño pequeño)**
^FO20,770^A0N,50,30^FD${
      tireData.appliedBand || tireData.appliedBandBandag || "-"
    }^FS

; **Brand (izquierda, tamaño pequeño)**
^FO20,820^A0N,50,30^FD${tireData.brand}^FS

; **Antiquity Dot (derecha, al nivel del brand)**
^FO400,820^A0N,50,30^FDDOT: ${tireData.antiquityDot}^FS

; **Estatus de llanta (izquierda, tamaño pequeño)**
${
  tireData.status === "Rechazo"
    ? `
^FO20,870^A0N,50,30^FDRECHAZO^FS
^FO20,920^A0N,50,30^FD${tireData.rejection || "-"}^FS
`
    : tireData.status === "Sin Costo"
    ? `
^FO20,870^A0N,50,30^FDRECHAZO^FS
^FO20,920^A0N,50,30^FD${tireData.rejection || "-"}^FS
`
    : ""
}

^MD30
; **Antiquity Dot (derecha, al nivel del brand)**
^FO400,1090^A0N,40,30^FD${tireData.formattedUpdatedAt}^FS

^XZ

    `;
  };

  const handlePrint = () => {
    if (!tireData) {
      alert("No hay datos de llanta disponibles.");
      return;
    }
    const zplData = generateZPL(tireData);
    printLabel(zplData);
  };

  return (
    <>
      <div className="flex justify-center">
        <button onClick={handlePrint}>
          <p className="font-bold">Imprimir</p>
        </button>
      </div>
    </>
  );
}

export default PrintLabelComponent;
