import React from "react";

function TotalPossiblePoints() {
  const totalPoints = 100; // Example value, replace with actual logic to calculate total points
  return (
    <div className="p-2 flex items-center gap-2 justify-between bg-blue-200">
      <div className="text-gray-700 text-lg font-semibold">
        Total Possible Points
      </div>
      <div className="text-gray-900 text-lg font-bold">
       
        {totalPoints + totalPoints}{" "}
      </div>
    </div>
  );
}

export default TotalPossiblePoints;
