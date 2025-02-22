import React, { useEffect, useState } from "react";
import { useTire } from "../context/TireContext";

function ReportPage() {
  const { getTires, tires } = useTire();
  const [helmetCounts, setHelmetCounts] = useState({});

  useEffect(() => {
    getTires();
  }, []);

  useEffect(() => {
    if (tires.length > 0) {
      const counts = tires.reduce((acc, tire) => {
        acc[tire.helmetDesign] = (acc[tire.helmetDesign] || 0) + 1;
        return acc;
      }, {});

      setHelmetCounts(counts);
    }
  }, [tires]);

  return (
    <>
      <div className="md:px-8 px-3 py-10 max-w-screen-2xl mx-auto select-none">
        <div>
          <h2 className="md:text-4xl flex justify-center font-bold mb-3 text-2xl">
            Reporte de llantas registradas
          </h2>
        </div>
        <div className="grid grid-cols-4 text-black mt-14">
          {Object.entries(helmetCounts).map(([design, count]) => (
          <div className="w-auto bg-slate-50 shadow-md flex justify-center m-3 p-6 rounded-lg">
            <p key={design}>
              {design}: {count} llantas
            </p>
          </div>
          ))}
          {/* <div className="w-auto bg-black shadow-md m-3 p-6 rounded-lg">
            Hola
          </div>
          <div className="w-auto bg-black shadow-md m-3 p-6 rounded-lg">
            Hola
          </div> */}
        
        </div>
      </div>
    </>
  );
}

export default ReportPage;
