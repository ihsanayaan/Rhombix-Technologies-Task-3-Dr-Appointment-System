import { Link } from "react-router-dom";

export default function ProfileDrawer({ isOpen, onClose }) {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/50 z-40"
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white z-50 transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-6 border-b">
          <h2 className="text-lg font-bold text-blue-600">
            My Profile
          </h2>
        </div>

        <div className="p-6 flex flex-col gap-4">
          <Link to="/" onClick={onClose}>Home</Link>
          <Link to="/services" onClick={onClose}>Bookings</Link>
          <Link to="/profile" onClick={onClose}>Profile</Link>
          <button className="text-red-500 mt">Logout</button>
        </div>
      </div>
    </>
  );
}
