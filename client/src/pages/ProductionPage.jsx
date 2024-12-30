import React from "react";
import { Link } from "react-router-dom";
import { Play, Flag } from "lucide-react";

function ProductionPage() {
  return (
    <>
      <div className="px-4 lg:px-14 max-w-screen-2xl mx-auto">
        <div className="text-center my-8">
          <h2 className="text-4xl font-semibold mb-2">Producción</h2>
        </div>
        <div className="p-4 w-auto flex justify-center">
          <div className="sm:flex sm:justify-between sm:w-full">
            <div className="flex justify-center mb-10 sm:mb-0">
              <Link>
                <button className="p-20 bg-slate-100 hover:bg-slate-200 duration-500 hover:duration-500 rounded shadow hover:-translate-y-2">
                  <h1 className="text-black font-bold">Estación Inicial</h1>
                  <div className="flex justify-center mt-2">
                    <Play />
                  </div>
                </button>
              </Link>
            </div>
            <div className="flex justify-center">
              <Link>
                <button className="p-20 bg-slate-100 hover:bg-slate-200 duration-500 hover:duration-500 rounded shadow hover:-translate-y-2">
                  <h1 className="text-black font-bold">Estación Final</h1>
                  <div className="flex justify-center mt-2">
                    <Flag />
                  </div>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductionPage;
