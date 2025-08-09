const API_BASE =
  import.meta.env.MODE === "development" ? "http://localhost:5000/api" : "/api";

export const fetchData = async () => {
  try {
    const res = await fetch(`${API_BASE}/data`);
    if (!res.ok) throw new Error("Failed to fetch");
    return await res.json();
  } catch (err) {
    console.error("❌ API Error:", err.message);
    return [];
  }
};
