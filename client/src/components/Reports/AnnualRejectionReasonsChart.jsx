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
  "#C0F2F2",
  "#FFC0CB",
  "#D1C4E9",
  "#AED581",
];

// Mostrar porcentaje dentro de cada barra
const renderPercentageLabel = (props) => {
  const { x, y, height, value } = props;
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

const AnnualRejectionReasonsChart = ({ data }) => {
  if (!data || data.length === 0) {
    return <p className="text-center text-gray-400">Sin datos para mostrar</p>;
  }

  const sortedData = [...data].sort((a, b) => b.count - a.count);
  const totalCount = sortedData.reduce((sum, item) => sum + item.count, 0);

  return (
    <section className="bg-white text-black rounded-2xl shadow-md w-full mt-6 p-4">
      <h2 className="text-center text-lg md:text-xl font-semibold mb-4">
        Razones de rechazo anual (todas las órdenes)
      </h2>

      <div className="flex flex-col items-center pb-4">
        <div className="w-full h-[1800px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={sortedData}
              layout="vertical"
              margin={{ top: 10, right: 10, left: 40, bottom: 10 }}
            >
              <XAxis type="number" hide />
              <YAxis
                dataKey="_id"
                type="category"
                tick={{ fontSize: 18, fill: "#000" }}
                axisLine={{ stroke: "#000" }}
                width={240}
              />
              <Tooltip
                formatter={(value) => [`${value} rechazos`, "Cantidad"]}
                contentStyle={{
                  backgroundColor: "#f9f9f9",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="count" radius={[0, 6, 6, 0]}>
                {sortedData.map((entry, index) => (
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

export default AnnualRejectionReasonsChart;
