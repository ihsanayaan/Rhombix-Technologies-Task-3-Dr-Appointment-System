import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="hidden md:flex w-64 bg-white shadow flex-col p-6">
      <h1 className="text-2xl font-bold text-blue-600 mb-10">
        🏥 DocBook
      </h1>

      <nav className="flex flex-col gap-4 text-gray-700 font-medium">
        <Link to="/" className="hover:text-blue-600">
          Home
        </Link>
        <Link to="/services" className="hover:text-blue-600">
          Bookings
        </Link>
        <Link to="/profile" className="hover:text-blue-600">
          Profile
        </Link>
      </nav>
    </aside>
  );
}
