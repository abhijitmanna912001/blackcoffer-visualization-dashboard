import { useEffect, useState } from "react";
import { fetchData } from "../api/data.js";
import BarChartSection from "./BarChartSection";

function Dashboard({ filters }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const load = async () => {
      const res = await fetchData();
      setData(res);
    };
    load();
  }, []);

  const filteredData = data.filter((item) =>
    Object.entries(filters).every(
      ([key, val]) => !val || item[key]?.toLowerCase() === val.toLowerCase()
    )
  );

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="bg-base-200 p-4 rounded shadow">
        <p>📊 Filtered Entries: {filteredData.length}</p>
      </div>

      <BarChartSection data={filteredData} />
    </div>
  );
}

export default Dashboard;
