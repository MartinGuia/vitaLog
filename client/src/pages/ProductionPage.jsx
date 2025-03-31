import React from "react";
import { Link } from "react-router-dom";
import { Settings, Flag, Search } from "lucide-react";

function ProductionPage() {
  const stations = [
    {
      to: "/productionInitial",
      name: "Inspección Inicial",
      icon: <Settings />,
    },
    {
      to: "/productionRepairs",
      name: "Reparaciones",
      icon: <Flag />,
    },
    {
      to: "/productionFinal",
      name: "Inspección final",
      icon: <Search />,
    },
  ];

  return (
    <>
      <div className="md:px-8 px-3 py-10 max-w-screen-2xl mx-auto select-none">
        <div>
          <h1 className="md:text-4xl flex justify-center font-bold mb-3 text-2xl">
            Producción
          </h1>
        </div>

        <div className="grid md:grid-cols-3 gap-10 md:mt-20">
          {stations.map((station, i) => (
            <Link
              key={i}
              to={station.to}
              className="hover:-translate-y-5 hover:transition-all hover:duration-500 duration-500"
            >
              <div className="bg-slate-100 py-5 md:p-10 shadow-md rounded-md">
                <p className="text-center text-black text-lg md:text-xl font-bold">
                  {station.name}
                </p>
                <div className="flex justify-center mt-4">
                  <span>{station.icon}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default ProductionPage;
