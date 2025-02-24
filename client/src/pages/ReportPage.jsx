import React, { useEffect } from "react";
import { useTire } from "../context/TireContext";
import { Card, Title, Text } from "@tremor/react";
import { LineChart } from "@tremor/react"; // Usamos LineChart en lugar de ColumnChart

function ReportPage() {
  const { getTiresByHelmetDesign, tires } = useTire();

  useEffect(() => {
    getTiresByHelmetDesign();
  }, []);

  // Si no hay registros, mostramos un mensaje
  if (!tires.length) {
    return (
      <>
        <div className="px-4 lg:px-14 max-w-screen-2xl mx-auto select-none">
          <div>
            <div className="text-center my-8">
              <h1 className="md:text-4xl flex justify-center font-bold mb-3 text-2xl">
                Reporte datos
              </h1>
            </div>
          </div>
          <div className="flex justify-center items-center mt-40">
            <Text className="text-xl font-semibold text-gray-600">
              No hay registros disponibles.
            </Text>
          </div>
        </div>
      </>
    );
  }

  // Preparamos los datos para la gráfica
  const chartData = tires.map((tire) => ({
    name: tire._id || "Desconocido",
    count: tire.count,
  }));

  return (
    <div className="px-4 lg:px-14 max-w-screen-2xl mx-auto select-none">
      <div>
        <div className="text-center my-8">
          <h1 className="md:text-4xl flex justify-center font-bold mb-3 text-2xl">
            Reporte datos
          </h1>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-10">
        <div>
          <Card className="w-auto shadow-xl rounded-lg p-6 bg-white">
            <Title className="text-2xl text-center font-semibold text-indigo-600 mb-6">
              Continental
            </Title>

            <LineChart // Usamos LineChart
              data={chartData}
              index="name"
              categories={["count"]}
              colors={["indigo"]}
              showLegend={false}
              yAxisWidth={40}
              className="h-64" // Ajustamos la altura de la gráfica
              tooltip={{
                enabled: true,
                className: "z-50", // Aseguramos que el tooltip tenga un z-index alto
                style: {
                  backgroundColor: "rgba(0, 0, 0, 0.75)", // Fondo oscuro para mejor legibilidad
                  color: "white", // Texto blanco para mejor contraste
                  padding: "4px 8px",
                  borderRadius: "8px",
                },
              }}
            />

            <Text className="text-sm text-gray-500 mt-6">
              Los datos muestran cuántas llantas de cada diseño de casco se han
              usado. Este informe es útil para conocer las preferencias de
              diseño.
            </Text>
          </Card>
        </div>
        <div>
          <Card className="w-auto shadow-xl rounded-lg p-6 bg-white">
            <Title className="text-2xl text-center font-semibold text-indigo-600 mb-6">
              BANDAG
            </Title>

            <LineChart // Usamos LineChart
              data={chartData}
              index="name"
              categories={["count"]}
              colors={["indigo"]}
              showLegend={false}
              yAxisWidth={40}
              className="h-64" // Ajustamos la altura de la gráfica
              tooltip={{
                enabled: true,
                className: "z-50", // Aseguramos que el tooltip tenga un z-index alto
                style: {
                  backgroundColor: "rgba(0, 0, 0, 0.75)", // Fondo oscuro para mejor legibilidad
                  color: "white", // Texto blanco para mejor contraste
                  padding: "4px 8px",
                  borderRadius: "8px",
                },
              }}
            />

            <Text className="text-sm text-gray-500 mt-6">
              Los datos muestran cuántas llantas de cada diseño de casco se han
              usado. Este informe es útil para conocer las preferencias de
              diseño.
            </Text>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default ReportPage;

// import React, { useEffect, useState } from "react";
// import { useTire } from "../context/TireContext";

// function ReportPage() {
//   const { getTires, tires } = useTire();
//   const [helmetCounts, setHelmetCounts] = useState({});

//   useEffect(() => {
//     getTires();
//   }, []);

//   useEffect(() => {
//     if (tires.length > 0) {
//       const counts = tires.reduce((acc, tire) => {
//         acc[tire.helmetDesign] = (acc[tire.helmetDesign] || 0) + 1;
//         return acc;
//       }, {});

//       setHelmetCounts(counts);
//     }
//   }, [tires]);

//   return (
//     <>

//       <div className="md:px-8 px-3 py-10 max-w-screen-2xl mx-auto select-none">
//         <div>
//           <h2 className="md:text-4xl flex justify-center font-bold mb-3 text-2xl">
//             Reporte de llantas registradas
//           </h2>
//         </div>
//         <div className="grid grid-cols-4 text-black mt-14">
//           {Object.entries(helmetCounts).map(([design, count]) => (
//             <div className="w-auto bg-slate-50 shadow-md flex justify-center m-3 p-6 rounded-lg" key={design}>
//               <p >
//                 {design}: {count} llantas
//               </p>
//             </div>
//           ))}
//           {/* <div className="w-auto bg-black shadow-md m-3 p-6 rounded-lg">
//             Hola
//           </div>
//           <div className="w-auto bg-black shadow-md m-3 p-6 rounded-lg">
//             Hola
//           </div> */}
//         </div>
//       </div>
//     </>
//   );
// }

// export default ReportPage;
