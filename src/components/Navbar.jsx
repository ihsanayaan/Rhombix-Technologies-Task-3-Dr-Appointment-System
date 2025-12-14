import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="w-full bg-white shadow p-4 flex justify-between">
      <Link to="/" className="font-bold text-lg">
        Booking App
      </Link>

      <div className="flex gap-4">
        <Link to="/" className="hover:text-blue-500">Home</Link>
        <Link to="/services" className="hover:text-blue-500">Services</Link>
        <Link to="/success" className="hover:text-blue-500">Bookings</Link>
      </div>
    </nav>
  );
}
