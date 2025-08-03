import { useEffect, useState } from "react";
import { fetchData } from "../api/data.js";

function Dashboard() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const load = async () => {
      const data = await fetchData();
      setEntries(data);
    };
    load();
  }, []);

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="bg-base-200 p-4 rounded shadow">
        <p>📊 Total Entries: {entries.length}</p>
        {/* Later: render charts here */}
      </div>
    </div>
  );
}

export default Dashboard;
