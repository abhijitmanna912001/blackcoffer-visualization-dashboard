import { useEffect, useState } from "react";
import { fetchData } from "../api/data.js";
import BarChartSection from "./BarChartSection.jsx";

function Dashboard() {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    end_year: "",
    topic: "",
    sector: "",
    region: "",
    pestle: "",
    source: "",
    swot: "",
    country: "",
    city: "",
  });

  useEffect(() => {
    const load = async () => {
      const res = await fetchData();
      setData(res);
    };
    load();
  }, []);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const uniqueValues = (data, key) => {
    return [...new Set(data.map((item) => item[key]).filter(Boolean))];
  };

  const filteredData = data.filter((item) =>
    Object.entries(filters).every(
      ([key, val]) => !val || item[key]?.toLowerCase() === val.toLowerCase()
    )
  );

  const renderDropdown = (label, key) => (
    <div className="form-control w-full max-w-xs">
      <label className="label">
        <span className="label-text capitalize">{label}</span>
      </label>
      <select
        className="select select-bordered"
        onChange={(e) => handleFilterChange(key, e.target.value)}
        value={filters[key]}
      >
        <option value="">All</option>
        {uniqueValues(data, key).map((val) => (
          <option key={val} value={val}>
            {val}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-base-100 text-base-content">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {renderDropdown("End Year", "end_year")}
        {renderDropdown("Topic", "topic")}
        {renderDropdown("Sector", "sector")}
        {renderDropdown("Region", "region")}
        {renderDropdown("PESTLE", "pestle")}
        {renderDropdown("Source", "source")}
        {renderDropdown("SWOT", "swot")}
        {renderDropdown("Country", "country")}
        {renderDropdown("City", "city")}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="stat bg-base-200 shadow">
          <div className="stat-title">Total Entries</div>
          <div className="stat-value">{filteredData.length}</div>
        </div>
        <div className="stat bg-base-200 shadow">
          <div className="stat-title">Avg Intensity</div>
          <div className="stat-value">
            {(
              filteredData.reduce((sum, d) => sum + (d.intensity || 0), 0) /
              (filteredData.length || 1)
            ).toFixed(2)}
          </div>
        </div>
        <div className="stat bg-base-200 shadow">
          <div className="stat-title">Avg Likelihood</div>
          <div className="stat-value">
            {(
              filteredData.reduce((sum, d) => sum + (d.likelihood || 0), 0) /
              (filteredData.length || 1)
            ).toFixed(2)}
          </div>
        </div>
      </div>

      {/* Bar Chart */}
      <BarChartSection data={filteredData} />
    </div>
  );
}

export default Dashboard;
