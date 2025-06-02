import { useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useTire } from "../../context/TireContext";

const CHART_COLORS = [
  "#A3C4F3", "#B5EAD7", "#FFDAC1",
  "#FF9AA2", "#C7CEEA", "#E2F0CB",
];

// Etiquetas del gráfico de pastel
const RADIAN = Math.PI / 180;
const renderLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="#ffffff"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      className="text-xs md:text-sm"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

function ReportByContinental() {
  const { getTiresByBandContinental, bandContinental, loading } = useTire();

  useEffect(() => {
    getTiresByBandContinental();
  }, []);

  const renderLegend = () => (
    <div className="flex flex-col md:flex-col gap-2">
      {bandContinental.map((entry, index) => (
        <div key={index} className="flex items-center gap-2 text-sm text-white">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: CHART_COLORS[index % CHART_COLORS.length] }}
          />
          <span>{entry.name} ({entry.ventas})</span>
        </div>
      ))}
    </div>
  );

  const renderContent = () => {
    if (loading) {
      return <p className="text-center text-gray-400">Cargando datos...</p>;
    }

    if (bandContinental.length === 0) {
      return <p className="text-center text-gray-400">Aún no hay datos</p>;
    }

  return (
       <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
         {/* Gráfico */}
         <div className="w-full md:w-2/3 h-60">
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
                 data={bandContinental}
                 dataKey="ventas"
                 nameKey="name"
                 cx="50%"
                 cy="50%"
                 outerRadius={90}
                 labelLine={false}
                 label={renderLabel}
               >
                 {bandContinental.map((entry, index) => (
                   <Cell
                     key={`cell-${index}`}
                     fill={CHART_COLORS[index % CHART_COLORS.length]}
                   />
                 ))}
               </Pie>
             </PieChart>
           </ResponsiveContainer>
         </div>
 
         {/* Leyenda personalizada */}
         <div className="w-full md:w-1/3">
           {renderLegend()}
         </div>
       </div>
     );
   };
 
   return (
     <section className="bg-colorPrimary text-white p-4 md:p-6 rounded-2xl shadow-md w-full max-w-5xl mx-auto">
       <h2 className="text-lg md:text-xl font-semibold mb-4 text-center md:text-left">
         Diseños de Banda Continental Más Usados
       </h2>
       {renderContent()}
     </section>
   );
}

export default ReportByContinental;