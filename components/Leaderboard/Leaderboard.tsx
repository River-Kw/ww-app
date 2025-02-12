"use client";
import React, { useEffect, useState } from "react";
import { WOMClient } from "@wise-old-man/utils";

type Team = {
  id: number;
  name: string;
  points: number;
  mostRecentDrop: string;
  timeAgo: string;
  logoUrl: string;
  color: "brown" | "blue";
  gainedExp?: number;
};

// Team Colors Mapping
const colorClasses = {
  brown: "bg-amber-800",
  blue: "bg-blue-500",
};

const WISE_OLD_MAN_API_URL = "https://api.wiseoldman.net/v2/competitions/77435";

const Leaderboard: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [lastUpdated, setLastUpdated] = useState<string>("");
  const [bandosExp, setBandosExp] = useState<number>(0);
  const [armadylExp, setArmadylExp] = useState<number>(0);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch your teams from your API
        const teamsResponse = await fetch("/api/teams");
        const { teams, lastUpdated } = await teamsResponse.json();

        // Fetch competition data from Wise Old Man API
        const client = new WOMClient();
        const competition = await client.competitions.getCompetitionDetails(
          77435
        );
        const participants = competition.participations || [];

        let bandosTotalGained = 0;
        let armadylTotalGained = 0;

        // Process each participant and sum their gained XP
        participants.forEach((participant: any) => {
          if (participant.teamName === "Bandos") {
            bandosTotalGained += participant.progress.gained;
          } else if (participant.teamName === "Armadyl") {
            armadylTotalGained += participant.progress.gained;
          }
        });

        // Update state with total XP gained
        setBandosExp(bandosTotalGained);
        setArmadylExp(armadylTotalGained);

        setTeams(teams);
        setLastUpdated(formatTimeAgo(lastUpdated));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
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
                  src={team.logoUrl || "/logo.png"}
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
            <div className="mt-4">
              <p className="text-lg font-semibold">Total Gained EXP:</p>
              {team.name === "Bandos" && <p>{bandosExp.toLocaleString()}</p>}
              {team.name === "Armadyl" && <p>{armadylExp.toLocaleString()}</p>}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Leaderboard;
