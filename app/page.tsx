import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import Leaderboard from "../components/Leaderboard/Leaderboard";

export default async function Home() {
  // const session = await getServerSession();

  // if (!session) {
  //   redirect("/api/auth/signin");
  // }
  return (
    <main className="bg-slate-800 text-white">
      <div className="container mx-auto min-h-screen">
        <div className="py-4">
          <Leaderboard />
        </div>
      </div>
    </main>
  );
}
