import AuthProvider from "./AuthProvider";
import NavMenu from "./NavMenu";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Winter War App",
  description: "Created By Ribs",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className="">
          <NavMenu />
          {children}
        </body>
      </html>
    </AuthProvider>
  );
}
