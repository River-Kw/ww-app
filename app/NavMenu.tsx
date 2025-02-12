import { SignInButton, SignOutButton } from "@/components/Buttons";
import AuthCheck from "@/components/AuthCheck";

export default function NavMenu() {
  return (
    <nav className="top-0 left-0 w-full py-6 z-50 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div>
            <a href="/">
              <h1 className="text-3xl font-bold">Winter War</h1>
            </a>
            <h2 className="text-lg">Competition Standings</h2>
            <h3 className="text-sm">Updated 8 Hours ago</h3>
          </div>
          <ul className="flex items-center space-x-4">
            <li>
              <SignInButton />
            </li>
            <li>
              <AuthCheck>
                <SignOutButton />
              </AuthCheck>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
