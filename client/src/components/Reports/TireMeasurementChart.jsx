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

const CHART_COLORS = [
  "#A3C4F3",
  "#B5EAD7",
  "#FFDAC1",
  "#FF9AA2",
  "#C7CEEA",
  "#E2F0CB",
  "#FFB7B2",
  "#FDCB82",
];

// Mostrar porcentaje dentro de la barra
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

const TireMeasurementChart = ({ title = "Medidas más utilizadas", data }) => {
  if (!data || data.length === 0) {
    return <p className="text-center text-gray-400">Sin datos para mostrar</p>;
  }

  // Tomar las 10 medidas más frecuentes
  const top10Data = [...data]
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  const totalCount = top10Data.reduce((sum, item) => sum + item.count, 0);

  return (
    <section className="bg-white text-black rounded-2xl shadow-md w-full">
      <h2 className="text-center text-lg md:text-xl font-semibold mt-4 mb-2">
        {title}
      </h2>

      <div className="flex flex-col items-center pb-4">
        <div className="w-full h-[600px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={top10Data}
              layout="vertical"
              margin={{ top: 10, right: 10, left: 20, bottom: 10 }}
            >
              <XAxis type="number" hide />
              <YAxis
                dataKey="_id"
                type="category"
                tick={{ fontSize: 16, fill: "#000" }}
                axisLine={{ stroke: "#000" }}
                width={90} // Menor ancho para aprovechar el espacio
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#f9f9f9",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                }}
                itemStyle={{ color: "#333", fontSize: "0.875rem" }}
              />
              <Bar dataKey="count" radius={[0, 6, 6, 0]}>
                {top10Data.map((entry, index) => (
                  <Cell
                    key={`bar-${index}`}
                    fill={CHART_COLORS[index % CHART_COLORS.length]}
                  />
                ))}
                <LabelList
                  dataKey="count"
                  content={(props) =>
                    renderPercentageLabel({ ...props, total: totalCount })
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

export default TireMeasurementChart;
