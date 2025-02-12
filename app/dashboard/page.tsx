import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { ProfileForm } from "./ProfileForm";
import LeaderboardUpdater from "./LeaderboardUpdater";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

  const currentUserEmail = session?.user?.email!;
  const user = await prisma.user.findUnique({
    where: {
      email: currentUserEmail,
    },
  });

  return (
    <main className="bg-slate-800 min-h-screen">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-white">
          Dashboard
        </h1>
        {/* <SignOutButton /> Uncomment and use if needed */}
        {/* <ProfileForm user={user} /> Uncomment and use if needed */}
        <div className="">
          <LeaderboardUpdater />
        </div>
      </div>
    </main>
  );
}
