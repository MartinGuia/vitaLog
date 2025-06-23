import React, { useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useTire } from "../../context/TireContext";

const CHART_COLORS = [
  "#A3C4F3",
  "#B5EAD7",
  "#FFDAC1",
  "#FF9AA2",
  "#C7CEEA",
  "#E2F0CB",
  "#FFB7B2",
  "#B5EAD7",
  "#FF9AA2",
  "#C7CEEA",
  "#E2F0CB",
  "#FDCB82",
];

const RADIAN = Math.PI / 180;

const renderLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  // Aumentamos el "empuje" del radio para acercarlo más al borde
  const radius = innerRadius + (outerRadius - innerRadius) * 0.8;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="#00000" // Color negro
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      className="text-xs"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const ReportByBandag = () => {
  const { getTiresByBandBandag, bandBandag, loading } = useTire();

  useEffect(() => {
    getTiresByBandBandag();
  }, []);

  const renderLegend = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-3 max-h-48 overflow-y-auto p-2">
      {bandBandag.map((entry, index) => (
        <div
          key={index}
          className="flex items-center gap-2 text-sm text-white bg-white/5 p-2 rounded-md"
        >
          <div
            className="w-4 h-4 rounded-full"
            style={{
              backgroundColor: CHART_COLORS[index % CHART_COLORS.length],
            }}
          />
          <span className="whitespace-nowrap">
            {entry.name} <span className="text-gray-300">({entry.ventas})</span>
          </span>
        </div>
      ))}
    </div>
  );

  const renderContent = () => {
    if (loading) {
      return <p className="text-center text-gray-400">Cargando datos...</p>;
    }

    if (bandBandag.length === 0) {
      return <p className="text-center text-gray-400">Aún no hay datos</p>;
    }

    return (
      <div className="flex flex-col items-center">
        {/* Gráfico centrado y más grande */}
        <div className="w-full h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#2A2A2E",
                  border: "none",
                  borderRadius: "8px",
                }}
                itemStyle={{ color: "#00CED1", fontSize: "0.875rem" }}
              />
              <Pie
                data={bandBandag}
                dataKey="ventas"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={130}
                labelLine={false}
                label={renderLabel}
              >
                {bandBandag.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={CHART_COLORS[index % CHART_COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Leyenda debajo */}
        <div className="w-full p-2">
          <h3 className="text-center text-white font-medium mb-2">
            Bandas utilizadas y cantidad
          </h3>
          {renderLegend()}
        </div>
      </div>
    );
  };

  return (
    <section className="bg-colorPrimary text-white rounded-2xl shadow-md w-full max-w-8xl mx-auto">
      <h2 className="text-lg md:text-xl font-semibold mt-4 text-center">
        Diseños de Banda Bandag Más Usados
      </h2>
      {renderContent()}
    </section>
  );
};

export default ReportByBandag;
