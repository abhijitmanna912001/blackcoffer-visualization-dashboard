import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function BarChartSection({ data }) {
  const aggregate = () => {
    const grouped = {};
    data.forEach((item) => {
      const key = item.topic || "Unknown";
      if (!grouped[key]) {
        grouped[key] = {
          topic: key,
          intensity: 0,
          relevance: 0,
          likelihood: 0,
          count: 0,
        };
      }
      grouped[key].intensity += item.intensity || 0;
      grouped[key].relevance += item.relevance || 0;
      grouped[key].likelihood += item.likelihood || 0;
      grouped[key].count += 1;
    });

    return Object.values(grouped).map((item) => ({
      topic: item.topic,
      intensity: +(item.intensity / item.count).toFixed(2),
      relevance: +(item.relevance / item.count).toFixed(2),
      likelihood: +(item.likelihood / item.count).toFixed(2),
    }));
  };

  const chartData = aggregate().slice(0, 15); // top 15 topics

  return (
    <div className="bg-base-200 p-4 rounded shadow mt-6">
      <h2 className="text-xl font-bold mb-4">
        Average Intensity, Likelihood, Relevance by Topic
      </h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="topic" angle={-45} textAnchor="end" interval={0} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="intensity" fill="#6366F1" />
          <Bar dataKey="relevance" fill="#22C55E" />
          <Bar dataKey="likelihood" fill="#F59E0B" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BarChartSection;
