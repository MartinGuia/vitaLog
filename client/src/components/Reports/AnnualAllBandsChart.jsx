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
  "#A3C4F3", "#B5EAD7", "#FFDAC1", "#FF9AA2", "#C7CEEA", "#E2F0CB",
  "#FFB7B2", "#FDCB82", "#C0F2F2", "#FFC0CB", "#D1C4E9", "#AED581"
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

const BandChartSection = ({ title, data, height = 400 }) => {
  if (!data || data.length === 0) {
    return <p className="text-center text-gray-400">Sin datos de {title}</p>;
  }

  const total = data.reduce((sum, item) => sum + item.count, 0);

  return (
    <div className="mb-10">
      <h3 className="text-center text-md md:text-lg font-semibold mb-2">{title}</h3>

      <div className="w-full" style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 10, right: 10, left: 40, bottom: 10 }}
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
              {data.map((entry, index) => (
                <Cell
                  key={`bar-${index}`}
                  fill={CHART_COLORS[index % CHART_COLORS.length]}
                />
              ))}
              <LabelList
                dataKey="count"
                content={(props) => renderPercentageLabel({ ...props, total })}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const AnnualAllBandsChart = ({ continentalBands, bandagBands }) => {
  if ((!continentalBands || continentalBands.length === 0) &&
      (!bandagBands || bandagBands.length === 0)) {
    return <p className="text-center text-gray-400">Sin datos de bandas</p>;
  }

  return (
    <section className="bg-white text-black rounded-2xl shadow-md w-full mt-6 p-4">
      <h2 className="text-center text-lg md:text-xl font-semibold mb-4">
        Bandas más usadas (Continental y Bandag)
      </h2>

      <BandChartSection title="Bandas Continental" data={continentalBands} height={700} />
      <BandChartSection title="Bandas Bandag" data={bandagBands} height={1500} />
    </section>
  );
};

export default AnnualAllBandsChart;
