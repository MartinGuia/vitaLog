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
import { useTire } from "../../context/TireContext"; // ajusta la ruta si es necesario

const COLORS = {
  primary: "#0A0F1F",
  buttonSecondary: "#00ADB5",
  buttonSecondaryHover: "#008A92",
  hoverPrimary: "#3E3E3E",
  buttonSubmitted: "#00CED1",
};
function ReportByContinental() {
  const { getTiresByBandContinental, bandContinental, loading } = useTire();

  useEffect(() => {
    getTiresByBandContinental();
  }, []);

  return (
     <div className="bg-[#0A0F1F] text-white p-6 rounded-2xl shadow-lg w-full h-full">
      <h2 className="text-xl font-semibold mb-4">
        Diseños de Banda Continental Más Usados
      </h2>

      {loading ? (
        <div className="text-center text-gray-400">Cargando datos...</div>
      ) : bandContinental.length === 0 ? (
        <div className="text-center text-gray-400">Aún no hay datos</div>
      ) : (
        <div className="w-full h-72 text-sm">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={bandContinental}>
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
  );
}

export default ReportByContinental;
