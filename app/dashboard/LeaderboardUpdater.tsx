"use client";
import { useEffect, useState } from "react";

type Team = {
  id: number;
  name: string;
  points: number;
  logoUrl: string;
  color: "brown" | "blue";
};

export default function LeaderboardUpdater() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatedPoints, setUpdatedPoints] = useState<{ [id: number]: number }>(
    {}
  );

  useEffect(() => {
    fetch("/api/teams")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.teams)) {
          setTeams(data.teams); // ✅ Fix: Access `teams` property from API response
        } else {
          setError("Invalid data format from API");
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch teams");
        setLoading(false);
      });
  }, []);

  const updatePoints = async (id: number) => {
    const newPoints = updatedPoints[id];

    if (newPoints === undefined) return;

    const res = await fetch("/api/teams", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, points: newPoints }),
    });

    if (res.ok) {
      setTeams((prev) =>
        prev.map((team) =>
          team.id === id ? { ...team, points: newPoints } : team
        )
      );
    }
  };

  if (loading) return <p>Loading teams...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6 bg-gray-900 text-white rounded-lg shadow-lg max-w-3xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Leaderboard Updater</h1>
      {teams.length === 0 ? (
        <p>No teams available.</p>
      ) : (
        <div className="space-y-4">
          {teams.map((team) => (
            <div
              key={team.id}
              className={`p-4 rounded-lg flex items-center justify-between ${
                team.color === "brown" ? "bg-amber-800/25" : "bg-blue-600/25"
              }`}
            >
              <div className="flex items-center space-x-4">
                <img
                  src={team.logoUrl || "/logo.png"}
                  alt={team.name}
                  className="h-12 w-12"
                />
                <div>
                  <h2 className="text-lg font-semibold">{team.name}</h2>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  value={updatedPoints[team.id] ?? team.points}
                  onChange={(e) =>
                    setUpdatedPoints({
                      ...updatedPoints,
                      [team.id]: Number(e.target.value),
                    })
                  }
                  className="bg-gray-700 text-white rounded px-3 py-1 w-20"
                />
                <button
                  onClick={() => updatePoints(team.id)}
                  className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                >
                  Update
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
