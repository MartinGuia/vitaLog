import { useEffect, useState } from "react";
import { useTire } from "../context/TireContext";
import { useParams, Link } from "react-router-dom";
import { StepBack } from "lucide-react";

function PrintLabel() {
  const { getTire, printLabel } = useTire();
  const params = useParams();
  const [tire, setTire] = useState(null);

  useEffect(() => {
    async function loadTire() {
      try {
        if (params.id) {
          const tireData = await getTire(params.id);
          if (tireData) {
            setTire(tireData);
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
    loadTire();
  }, []);

  const generateZPL = (tire) => {
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
^FD${tire.barCode}^FS

; **Cliente (izquierda, separado un poco más del código de barras)**
^FO20,380^A0N,50,40^FD${tire.workOrder.client.companyName}^FS

; **Número de orden (izquierda, debajo del cliente)**
^FO20,470^A0N,50,40^FDWO# ${tire.workOrder.numero}^FS

; **Número de registro**
^FO120,470^A0N,50,40^FD (${tire.linea}/${tire.workOrder.tires.length})^FS

; **ItemCode (izquierda, debajo del número de orden)**
^FO350,470^A0N,50,40^FD${tire.itemCode}^FS

; **Nombre de usuario (derecha, debajo del itemCode)**
^FO420,525^A0N,50,40^FD${tire.user.name}^FS

; **HelmetMeasurement (centrado y grande)**
^FO120,620^A0N,110,90^FD${tire.helmetMeasurement}^FS

; **Banda Aplicada (izquierda, tamaño pequeño)**
^FO20,720^A0N,50,30^FD${tire.appliedBand || tire.appliedBandBandag}^FS

; **Ancho (izquierda, tamaño pequeño)**
^FO20,770^A0N,50,30^FD${tire.width}^FS

; **Brand (izquierda, tamaño pequeño)**
^FO20,820^A0N,50,30^FD${tire.brand}^FS

; **Antiquity Dot (derecha, al nivel del brand)**
^FO400,820^A0N,50,30^FDDOT: ${tire.antiquityDot}^FS

; **Suma de patches (izquierda, tamaño pequeño)**
^FO20,870^A0N,50,30^FDCAPS: ${
      (tire.numberPatches || 0) +
      (tire.numberPatches2 || 0) +
      (tire.numberPatches3 || 0) +
      (tire.numberPatches4 || 0)
    }^FS

^MD30
; **Antiquity Dot (derecha, al nivel del brand)**
^FO400,1090^A0N,40,30^FD${tire.formattedUpdatedAt}^FS

^XZ

    `;
  };

  const handlePrint = () => {
    if (!tire) {
      alert("No hay datos de llanta disponibles.");
      return;
    }
    const zplData = generateZPL(tire);
    printLabel(zplData);
  };

  return (
    <>
      <div className="md:px-8 px-3 py-10 max-w-screen-2xl mx-auto select-none">
        <div className="flex items-center gap-3 mb-6">
          <Link to={`/productionFinal`}>
            <button className="bg-buttonPrimaryHover hover:bg-buttonPrimary shadow-md rounded-md px-4 py-1 duration-500 hover:duration-500">
              <StepBack color="white" />
            </button>
          </Link>
          <h1 className="text-2xl md:text-4xl font-bold"> Etiqueta</h1>
        </div>

        <div className="flex justify-center mt-24">
          <div className="border-8 border-blue-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold">VITA-BAJIO S.A DE C.V.</h2>
            {tire ? (
              <div className="font-semibold">
                <p className="flex justify-center mt-2">{tire.barCode}</p>
                <p className="mt-4 text-lg">{tire.workOrder.client.companyName}</p>
                <div className="flex mt-2 justify-between">
                  <div className="flex">
                    <p>WO# {tire.workOrder.numero}</p>
                    <p className="ml-2">
                      ({tire.linea}/{tire.workOrder.tires.length})
                    </p>
                  </div>
                  <div>
                    <p>{tire.itemCode}</p>
                    <p className="flex justify-end">{tire.user.name}</p>
                  </div>
                </div>
                <p className="flex justify-center text-4xl my-7">
                  {tire.helmetMeasurement}
                </p>
                <p>{tire.appliedBand || tire.appliedBandBandag}</p>
                <div className="flex justify-between">
                  <p>{tire.brand}</p>
                  <p>DOT: {tire.antiquityDot}</p>
                </div>
                {tire.status === "Rechazo" ? (
                  <>
                    <p>RECHAZO</p>
                    <p>{tire.rejection || "-"}</p>
                  </>
                ) : tire.status === "Sin Costo" ?(
                  <>
                    <p>Sin Costo</p>
                    <p>{tire.rejection || "-"}</p>
                  </>
                ):(
                  ""
                )}
                {/* {tire.status === "Rechazo" && (
                  <>
                    <p>RECHAZO</p>
                    <p>{tire.rejection || "-"}</p>
                  </>
                )} */}
                <p className="flex justify-end mt-4">
                  {tire.formattedUpdatedAt}
                </p>
                <div className="flex justify-center mt-5">
                  <button
                    className="py-2 px-8 bg-vbYellow rounded-md shadow duration-500 hover:duration-500 hover:bg-yellow-400 hover:-translate-y-1"
                    onClick={handlePrint}
                  >
                    Imprimir
                  </button>
                </div>
              </div>
            ) : (
              <p>Cargando datos de la llanta...</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default PrintLabel;
