import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getTiresByHelmetDesignRequest } from "../api/tires"; // ajusta la ruta si es necesario

const COLORS = {
  primary: "#0A0F1F",
  buttonSecondary: "#00ADB5",
  buttonSecondaryHover: "#008A92",
  hoverPrimary: "#3E3E3E",
  buttonSubmitted: "#00CED1",
};

export default function ReportPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getTiresByHelmetDesign = async () => {
    try {
      const res = await getTiresByHelmetDesignRequest();
      const formatted = res.data.map((item) => ({
        name: item._id || "Sin nombre",
        ventas: item.count,
      }));
      setData(formatted);
    } catch (error) {
      console.error("Error al cargar los datos de las bandas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTiresByHelmetDesign();
  }, []);

  return (
    <div className="md:px-8 px-3 py-10 max-w-screen-2xl mx-auto select-none">
      <div className="flex items-center gap-3 mb-6">
        <h1 className="text-2xl md:text-4xl font-bold">Reporte de llantas</h1>
      </div>
      <div className="bg-[#0A0F1F] text-white p-6 rounded-2xl shadow-lg max-w-3xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">
          Diseños de Banda Más Usados
        </h2>

        {loading ? (
          <div className="text-center text-gray-400">Cargando datos...</div>
        ) : data.length === 0 ? (
          <div className="text-center text-gray-400">Aún no hay datos</div>
        ) : (
          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid stroke="#2c2c2c" strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke="#ffffff" />
                <YAxis stroke="#ffffff" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: COLORS.hoverPrimary,
                    border: "none",
                  }}
                  itemStyle={{ color: COLORS.buttonSubmitted }}
                  cursor={{ fill: COLORS.hoverPrimary }}
                />
                <Bar
                  dataKey="ventas"
                  fill={COLORS.buttonSecondary}
                  activeBar={{ fill: COLORS.buttonSecondaryHover }}
                  animationDuration={600}
                  animationEasing="ease-out"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}
