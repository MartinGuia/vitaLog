import React from "react";
import { Link } from "react-router-dom";
import { Play, Flag } from "lucide-react";

function ProductionPage() {
  return (
    <>
      <div className="px-4 lg:px-14 max-w-screen-2xl mx-auto">
        <div className="text-center my-8">
          <h2 className="md:text-4xl flex justify-center font-bold mb-3 text-2xl">Producción</h2>
        </div>
        <div className="p-4 w-auto flex justify-center">
          <div className="sm:flex sm:justify-between sm:w-full md:mt-10">
            <div className="flex justify-center mb-10 sm:mb-0">
              <Link>
                <button className="p-20 bg-secondary hover:bg-hoverprimary duration-500 hover:duration-500 rounded-lg shadow hover:-translate-y-2">
                  <h1 className="text-white font-bold ">Estación Inicial</h1>
                  <div className="flex justify-center mt-2">
                    <Play color="white"/>
                  </div>
                </button>
              </Link>
            </div>
            <div className="flex justify-center">
              <Link>
                <button className="p-20 bg-secondary hover:bg-hoverprimary  duration-500 hover:duration-500 rounded-lg shadow hover:-translate-y-2">
                  <h1 className="text-white font-bold">Estación Final</h1>
                  <div className="flex justify-center mt-2">
                    <Flag color="white"/>
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
