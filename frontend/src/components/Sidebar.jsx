import { useEffect, useState } from "react";
import { fetchData } from "../api/data.js";

function Sidebar({ filters, setFilters }) {
  const [data, setData] = useState([]);

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

  const renderDropdown = (label, key) => (
    <div className="form-control w-full mb-4">
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
    <aside className="w-64 bg-base-100 border-r p-4 overflow-y-auto hidden md:block">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>
      {renderDropdown("End Year", "end_year")}
      {renderDropdown("Topic", "topic")}
      {renderDropdown("Sector", "sector")}
      {renderDropdown("Region", "region")}
      {renderDropdown("PESTLE", "pestle")}
      {renderDropdown("Source", "source")}
      {renderDropdown("SWOT", "swot")}
      {renderDropdown("Country", "country")}
      {renderDropdown("City", "city")}
    </aside>
  );
}

export default Sidebar;
