"use client";

import React, { useState } from "react";

export function LeaderboardUpdater({
  teams,
}: {
  teams: { id: number; name: string }[];
}) {
  const [selectedTeam, setSelectedTeam] = useState(teams[0]?.id ?? 0);
  const [points, setPoints] = useState("");

  const updateLeaderboard = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch(`/api/leaderboard/${selectedTeam}`, {
      method: "PUT",
      body: JSON.stringify({ points: Number(points) }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    if (res.ok) {
      alert(`Leaderboard updated: ${data.message}`);
    } else {
      alert("Failed to update leaderboard");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        Update Leaderboard
      </h2>
      <form onSubmit={updateLeaderboard} className="space-y-4">
        <div>
          <label
            htmlFor="team"
            className="block text-sm font-medium text-gray-700"
          >
            Team
          </label>
          <select
            id="team"
            name="team"
            value={selectedTeam}
            onChange={(e) => setSelectedTeam(Number(e.target.value))}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            {teams.map((team) => (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="points"
            className="block text-sm font-medium text-gray-700"
          >
            Points
          </label>
          <input
            type="number"
            name="points"
            id="points"
            value={points}
            onChange={(e) => setPoints(e.target.value)}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Save
        </button>
      </form>
    </div>
  );
}
