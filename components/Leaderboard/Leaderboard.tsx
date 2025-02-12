"use client";
import React, { useEffect, useState } from "react";

type Team = {
  id: number;
  name: string;
  points: number;
  mostRecentDrop: string;
  timeAgo: string;
  logoUrl: string;
  color: "red" | "blue";
};

const colorClasses = {
  red: "bg-amber-800",
  blue: "bg-blue-500",
};

const Leaderboard: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [lastUpdated, setLastUpdated] = useState<string>("");

  useEffect(() => {
    fetch("/api/teams")
      .then((res) => res.json())
      .then(({ teams, lastUpdated }) => {
        setTeams(teams);
        setLastUpdated(formatTimeAgo(lastUpdated));
      });
  }, []);

  function formatTimeAgo(dateString: string) {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);

    if (diffHours >= 1) return `${diffHours} Hours Ago`;
    if (diffMins >= 1) return `${diffMins} Minutes Ago`;
    return "Just Now";
  }

  return (
    <div className="space-y-4">
      <h3 className="text-sm text-gray-400">Updated {lastUpdated}</h3>
      {teams.length === 0 ? (
        <p className="text-center text-gray-500">No teams available.</p>
      ) : (
        teams.map((team) => (
          <div
            key={team.id}
            className={`${
              colorClasses[team.color] || "bg-gray-700"
            } p-4 rounded-lg shadow-md text-white`}
          >
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-2">
                <img
                  src={team.logoUrl || "/logo.png"} // Use fallback if missing
                  alt="Team Logo"
                  className="h-25 w-25"
                />
                <h1 className="text-lg font-bold">{team.name}</h1>
              </div>
              <span className="text-xl font-bold">{team.points} Points</span>
            </div>
            <div>
              <p className="font-semibold">Most Recent Drop</p>
              <div className="flex justify-between items-center mt-2">
                <span>{team.mostRecentDrop}</span>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Leaderboard;
