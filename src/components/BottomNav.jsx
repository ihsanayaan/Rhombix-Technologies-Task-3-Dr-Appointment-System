import { Link, useLocation } from "react-router-dom";
import { Home, CalendarCheck, User } from "lucide-react";

export default function BottomNav() {
  const { pathname } = useLocation();

  const linkClass = (path) =>
    pathname === path
      ? "flex flex-col items-center text-white"
      : "flex flex-col items-center text-gray-400";

  return (
    <nav className="md:hidden bg-black flex justify-around p-4">
      
      <Link to="/" className={linkClass("/")}>
        <Home size={22} />
        <span className="text-xs mt-1">Home</span>
      </Link>

      <Link to="/services" className={linkClass("/services")}>
        <CalendarCheck size={22} />
        <span className="text-xs mt-1">Bookings</span>
      </Link>

      <Link to="/profile" className={linkClass("/profile")}>
        <User size={22} />
        <span className="text-xs mt-1">Profile</span>
      </Link>

    </nav>
  );
}
