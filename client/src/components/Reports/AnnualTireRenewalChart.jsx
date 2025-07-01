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

const monthNames = [
  "",
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
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
      fontSize={17}
      dominantBaseline="middle"
      className="font-semibold"
    >
      {percentage}% ({value})
    </text>
  );
};

const AnnualTireRenewalChart = ({ monthlySummary }) => {
  if (!monthlySummary || monthlySummary.length === 0) {
    return <p className="text-center text-gray-400">Sin datos disponibles</p>;
  }

  const chartData = monthlySummary.map((month) => ({
    name: monthNames[month.month],
    count: month.totalTires - month.totalRejections,
  }));

  const totalTiresYear = chartData.reduce((sum, m) => sum + m.count, 0);

  return (
    <section className="bg-white text-black rounded-2xl shadow-md w-full mt-6 p-4">
      <h2 className="text-center text-lg md:text-xl font-semibold mb-4">
        Renovaciones de llantas por mes (Anual)
      </h2>

      <div className="flex flex-col items-center pb-4">
        <div className="w-full h-[1400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              width={1000}
              height={1000}
              data={chartData}
              layout="vertical"
              margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
            >
              <XAxis type="number" hide />
              <YAxis
                dataKey="name"
                type="category"
                tick={{ fontSize: 17, fill: "#000" }}
                axisLine={{ stroke: "#000" }}
                width={90}
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
                {chartData.map((entry, index) => (
                  <Cell
                    key={`bar-${index}`}
                    fill={CHART_COLORS[index % CHART_COLORS.length]}
                  />
                ))}
                <LabelList
                  dataKey="count"
                  content={(props) =>
                    renderPercentageLabel({ ...props, total: totalTiresYear })
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

export default AnnualTireRenewalChart;
