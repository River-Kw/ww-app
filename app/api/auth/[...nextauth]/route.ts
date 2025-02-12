import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import DiscordProvider from "next-auth/providers/discord";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

// Correct way to export NextAuth handler in App Router
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
