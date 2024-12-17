import Link from "next/link";
import { FaHome, FaUser, FaSignInAlt, FaSignOutAlt, FaUserAstronaut, FaUserAltSlash, FaUserCircle, FaAd, FaTable } from "react-icons/fa"; 
import { AuthProvider } from "./_lib/AuthContext"; 
import './globals.css';

export const metadata = {
  title: "My Application",
  description: "A sample application",
};

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body>
        
        <AuthProvider>
          <div className="flex min-h-screen flex-col">
            <div className="flex">
              <nav className="w-64 bg-gray-800 text-white p-4">
                <ul>
                  <li>
                    <Link href="/" className="flex items-center">
                      <FaHome className="mr-2" /> Home
                    </Link>
                  </li>
                  <li>
                    <Link href="/public/user/signin" className="flex items-center">
                      <FaSignInAlt className="mr-2" /> Sign In
                    </Link>
                  </li>
                  <li>
                    <Link href="/public/user/register" className="flex items-center">
                      <FaUser className="mr-2" /> Register
                    </Link>
                  </li>
                  <li>
                    <Link href="/protected/user/signout" className="flex items-center">
                      <FaSignOutAlt className="mr-2" /> Sign Out
                    </Link>
                  </li>
                  <li>
                    <Link href="/protected/user/profile" className="flex items-center">
                      <FaUserCircle className="mr-2" /> Profile
                    </Link>
                  </li>
                  <li>
                    <Link href="/table" className="flex items-center">
                      <FaTable className="mr-2" /> Table 
                    </Link>
                  </li>
                </ul>
              </nav>

              <main className="flex-1 p-6">{children}</main>
            </div>

            <footer className="bg-gray-800 text-white text-center p-4">
              <p>&copy; 2024 Nextjs App</p>
            </footer>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
