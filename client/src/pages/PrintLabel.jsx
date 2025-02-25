import { useEffect, useState } from "react";
import { useTire } from "../context/TireContext";
import { useParams, Link } from "react-router-dom";
import { StepBack } from "lucide-react";

function PrintLabel() {
  const { getTire, printLabel } = useTire();
  const { id } = useParams();
  const [tire, setTire] = useState(null);

  useEffect(() => {
    const fetchTire = async () => {
      const tireData = await getTire(id);
      setTire(tireData);
    };
    fetchTire();
  }, [id, getTire]);

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
^FO20,380^A0N,50,40^FD${tire.workOrder.client.name}^FS

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
^FO20,870^A0N,50,30^FDCAPS: ${tire.numberPatches + tire.numberPatches2}^FS

^MD30
; **Antiquity Dot (derecha, al nivel del brand)**
^FO400,1090^A0N,40,30^FD${tire.formattedUpdatedAt}^FS

^XZ

    `;
  };
  //   ^XA
  // ^PW640                          ; Ancho total de la etiqueta (8 cm)
  // ^LL1600                         ; Alto total de la etiqueta (20 cm)

  // ; **Primera línea centrada y tamaño ajustado**
  // ^FO00,50^A0N,50,50^FDVITA-BAJIO S.A. DE C.V.^FS

  // ; **Código de barras más largo, más oscuro y con letras más grandes**
  // ^BY3
  // ^FO60,130^BCN,110,Y,N,C
  // ^A0N,45,45     ; Aumenta el tamaño de la fuente de las letras debajo del código de barras
  // ^FD${tire.barCode}^FS

  // ; **Cliente (izquierda, separado un poco más del código de barras)**
  // ^FO20,390^A0N,50,50^FD${tire.workOrder.client.name}^FS

  // ; **Número de orden (izquierda, debajo del cliente)**
  // ^FO20,470^A0N,50,40^FDWO: ${tire.workOrder.numero}^FS

  // ; **ItemCode (izquierda, debajo del número de orden)**
  // ^FO350,470^A0N,50,40^FD${tire.itemCode}^FS

  // ; **Nombre de usuario (derecha, debajo del itemCode)**
  // ^FO400,520^A0N,50,40^FD${tire.user.name}^FS

  // ; **HelmetMeasurement (centrado y grande)**
  // ^FO130,620^A0N,100,80^FD${tire.helmetMeasurement}^FS

  // ; **Required Band (izquierda, tamaño pequeño)**
  // ^FO20,720^A0N,30,30^FD${tire.requiredBand}^FS

  // ; **Ancho (izquierda, tamaño pequeño)**
  // ^FO20,770^A0N,30,30^FD${tire.width}^FS

  // ; **Brand (izquierda, tamaño pequeño)**
  // ^FO20,820^A0N,30,30^FD${tire.brand}^FS

  // ; **Suma de patches (izquierda, tamaño pequeño)**
  // ^FO20,870^A0N,30,30^FDCAPS: ${tire.numberPatches + tire.numberPatches2}^FS

  // ; **Antiquity Dot (derecha, al nivel del brand)**
  // ^FO400,820^A0N,30,30^FDDOT: ${tire.antiquityDot}^FS

  // ^XZ
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
        <div>
          <Link to={`/productionFinal`}>
            <button className="bg-cyan-950 rounded-md px-4 py-1 duration-500 hover:bg-cyan-800 hover:duration-500 sm:absolute relative">
              <StepBack color="white" />
            </button>
          </Link>
          <h1 className="md:text-4xl flex justify-center font-bold mb-3 text-2xl">
            Etiqueta
          </h1>
        </div>

        <div className="flex justify-center mt-24">
          <div className="border-8 border-blue-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold">VITA-BAJIO S.A DE C.V.</h2>
            {tire ? (
              <div className="font-semibold">
                <p className="flex justify-center mt-2">{tire.barCode}</p>
                <p className="mt-4 text-lg">{tire.workOrder.client.name}</p>
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
                <p>210</p>
                <div className="flex justify-between">
                  <p>{tire.brand}</p>
                  <p>DOT: {tire.antiquityDot}</p>
                </div>
                <p>CAPS: {tire.numberPatches + tire.numberPatches2}</p>
                <p className="flex justify-end mt-4">{tire.formattedUpdatedAt}</p>
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
