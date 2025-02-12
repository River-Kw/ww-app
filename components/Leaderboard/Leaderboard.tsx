import React from "react";

type LeaderboardProps = {
  teamName: string;
  points: number;
  mostRecentDrop: string;
  timeAgo: string;
  logoUrl: string;
  color: "red" | "blue"; // Define allowable colors
};
const colorClasses = {
  red: "bg-amber-800",
  blue: "bg-blue-500",
};
const Leaderboard: React.FC<LeaderboardProps> = ({
  teamName,
  points,
  mostRecentDrop,
  timeAgo,
  logoUrl,
  color,
}) => {
  return (
    <div
      className={`${colorClasses[color]} p-4 rounded-lg shadow-md text-white`}
    >
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <img src={logoUrl} alt="Team Logo" className="h-25 w-25" />
          <h1 className="text-lg font-bold">{teamName}</h1>
        </div>
        <span className="text-xl font-bold">{points} Points</span>
      </div>
      <div>
        <p className="font-semibold">Most Recent Drop</p>
        <div className="flex justify-between items-center mt-2">
          <span>{mostRecentDrop}</span>
          <span className="bg-gray-800 py-1 px-2 rounded-full text-sm">
            {timeAgo}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
