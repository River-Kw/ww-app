import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET: Fetch teams and most recent update time
export async function GET() {
  try {
    const teams = await prisma.team.findMany({ orderBy: { points: "desc" } });

    // Find the most recent update time
    const lastUpdatedTeam = await prisma.team.findFirst({
      orderBy: { updatedAt: "desc" },
      select: { updatedAt: true },
    });

    return NextResponse.json({
      teams,
      lastUpdated: lastUpdatedTeam?.updatedAt || new Date(),
    }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch teams" }, { status: 500 });
  }
}

// POST: Update a team's points and refresh updatedAt
export async function POST(req: Request) {
  try {
    const { id, points } = await req.json();

    if (!id || typeof points !== "number") {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const updatedTeam = await prisma.team.update({
      where: { id },
      data: { points },
    });

    return NextResponse.json(updatedTeam, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: "Failed to update points" }, { status: 500 });
  }
}
