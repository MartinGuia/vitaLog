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
  "#A3C4F3", "#B5EAD7", "#FFDAC1", "#FF9AA2", "#C7CEEA",
  "#E2F0CB", "#FFB7B2", "#FDCB82", "#C0F2F2", "#FFC0CB"
];

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

const AnnualTopModelChart = ({ data }) => {
  if (!data || data.length === 0) {
    return <p className="text-center text-gray-400">Sin datos disponibles</p>;
  }

  const sortedData = [...data]
    .sort((a, b) => b.count - a.count)
    .slice(0, 10); // top 10 modelos

  const total = sortedData.reduce((sum, item) => sum + item.count, 0);

  return (
    <section className="bg-white text-black rounded-2xl shadow-md w-full mt-6 p-4">
      <h2 className="text-center text-lg md:text-xl font-semibold mb-4">
        Top 10 modelos de llantas más usados
      </h2>

      <div className="flex flex-col items-center pb-4">
        <div className="w-full h-[800px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={sortedData}
              layout="vertical"
              margin={{ top: 10, right: 10, left: 20, bottom: 10 }}
            >
              <XAxis type="number" hide />
              <YAxis
                dataKey="_id"
                type="category"
                tick={{ fontSize: 16, fill: "#000" }}
                axisLine={{ stroke: "#000" }}
                width={160}
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
                {sortedData.map((entry, index) => (
                  <Cell
                    key={`bar-${index}`}
                    fill={CHART_COLORS[index % CHART_COLORS.length]}
                  />
                ))}
                <LabelList
                  dataKey="count"
                  content={(props) =>
                    renderPercentageLabel({ ...props, total })
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

export default AnnualTopModelChart;
