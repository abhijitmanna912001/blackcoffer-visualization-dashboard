function Dashboard() {
  return (
    <div className="flex-1 p-4">
      <h2 className="text-xl font-semibold mb-4">Dashboard</h2>
      {/* Charts and visualizations go here */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-base-100 shadow-md rounded-lg p-4">Chart 1</div>
        <div className="bg-base-100 shadow-md rounded-lg p-4">Chart 2</div>
      </div>
    </div>
  );
}

export default Dashboard;
