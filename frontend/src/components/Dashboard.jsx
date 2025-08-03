function Dashboard() {
  return (
    <div className="flex-1 p-4 overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4">Data Visualizations</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Charts will go here */}
        <div className="bg-base-200 h-64 rounded-lg shadow-md flex items-center justify-center">
          Chart Placeholder
        </div>
        <div className="bg-base-200 h-64 rounded-lg shadow-md flex items-center justify-center">
          Chart Placeholder
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
