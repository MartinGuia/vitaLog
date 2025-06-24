import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";
import { useMemo } from "react";

const CHART_COLORS = [
  "#A3C4F3",
  "#B5EAD7",
  "#FFDAC1",
  "#FF9AA2",
  "#C7CEEA",
  "#E2F0CB",
  "#FFB7B2",
  "#FDCB82",
  "#C0F2F2",
  "#FFC0CB",
  "#D1C4E9",
  "#AED581",
];

const renderPercentageLabel = (props) => {
  const { x, y, width, height, value } = props;
  const total = props?.total || 1;
  const percentage = ((value / total) * 100).toFixed(0);
  const textX = x + 5;
  const textY = y + height / 2;

  return (
    <text
      x={textX}
      y={textY}
      fill="#000"
      fontSize={16}
      dominantBaseline="middle"
      className="font-semibold"
    >
      {percentage}% ({value})
    </text>
  );
};

const AnnualClientRenewalChart = ({ monthlySummary }) => {
  // Siempre se debe llamar el hook
  const clientTotals = useMemo(() => {
    if (!monthlySummary || monthlySummary.length === 0) return [];

    const map = new Map();

    monthlySummary.forEach((month) => {
      month.clients.forEach((client) => {
        if (!map.has(client.clientId)) {
          map.set(client.clientId, {
            name: client.clientName,
            count: 0,
          });
        }
        const current = map.get(client.clientId);
        current.count += client.totalTires;
        map.set(client.clientId, current);
      });
    });

    return Array.from(map.values()).sort((a, b) => b.count - a.count);
  }, [monthlySummary]);

  const totalTires = clientTotals.reduce((sum, c) => sum + c.count, 0);

  if (!clientTotals || clientTotals.length === 0) {
    return <p className="text-center text-gray-400">Sin datos disponibles</p>;
  }

  return (
    <section className="bg-white text-black rounded-2xl shadow-md w-full mt-6 p-4">
      <h2 className="text-center text-lg md:text-xl font-semibold mb-4">
        Total de llantas renovadas por cliente (Anual)
      </h2>

      <div className="flex flex-col items-center pb-4">
        <div className="w-full h-[1000px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={clientTotals}
              layout="vertical"
              margin={{ top: 10, right: 10, left: 40, bottom: 10 }} // ← margen izquierdo reducido
            >
              <XAxis type="number" hide />
              <YAxis
                dataKey="name"
                type="category"
                tick={{ fontSize: 16, fill: "#000" }}
                axisLine={{ stroke: "#000" }}
                width={80} // ← menor ancho para el nombre del cliente
              />
              <Tooltip
                formatter={(value) => [`${value} llantas`, "Cantidad"]}
                contentStyle={{
                  backgroundColor: "#f9f9f9",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="count" radius={[0, 6, 6, 0]}>
                {clientTotals.map((entry, index) => (
                  <Cell
                    key={`bar-${index}`}
                    fill={CHART_COLORS[index % CHART_COLORS.length]}
                  />
                ))}
                <LabelList
                  dataKey="count"
                  content={(props) =>
                    renderPercentageLabel({ ...props, total: totalTires })
                  }
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
};

export default AnnualClientRenewalChart;
