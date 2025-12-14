import { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import BottomNav from "../components/BottomNav";
import ProfileDrawer from "../components/ProfileDrawer";

export default function Home() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const categories = [
    "Dentist",
    "Cardiologist",
    "Dermatologist",
    "Orthopedic",
    "Pediatrician",
    "Neurologist",
  ];

const featuredServices = [
  {
    id: 1,
    name: "General Checkup",
    price: "$20",
    rating: 4.5,
    slots: "5 slots available",
    image: "https://images.unsplash.com/photo-1580281657527-47f249e8f3c1",
  },
  {
    id: 2,
    name: "Dental Cleaning",
    price: "$40",
    rating: 4.8,
    slots: "2 slots left",
    image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db",
  },
  {
    id: 3,
    name: "Skin Consultation",
    price: "$30",
    rating: 4.6,
    slots: "Available today",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f",
  },
];


  return (
    <div className="min-h-screen bg-gray-100 flex">

      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Mobile Profile Drawer */}
      <ProfileDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />

      <main className="flex-1 flex flex-col">

        {/* Topbar with Burger */}
        <Topbar onMenuClick={() => setDrawerOpen(true)} />

        <div className="p-6 flex-1 overflow-y-auto">

          {/* Search */}
          <input
            type="text"
            placeholder="Search doctors, services..."
            className="w-full p-4 mb-6 rounded-xl border focus:ring-2 focus:ring-blue-500 outline-none"
          />

          {/* Categories */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-4">
              Popular Categories
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {categories.map((cat) => (
                <div
                  key={cat}
                  className="bg-white p-4 rounded-xl shadow text-center hover:bg-blue-50 cursor-pointer transition"
                >
                  {cat}
                </div>
              ))}
            </div>
          </section>

      {/* Featured Services */}
<section className="mt-12">
  <div className="flex justify-between items-center mb-6">
    <h2 className="text-xl font-bold">Featured Services</h2>
    <Link to="/services" className="text-blue-600 text-sm font-medium">
      View all →
    </Link>
  </div>

  <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
    {featuredServices.map((s) => (
      <div
        key={s.id}
        className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
      >
        {/* Image */}
        <div className="h-40 overflow-hidden">
          <img
            src={s.image}
            alt={s.name}
            className="h-full w-full object-cover group-hover:scale-105 transition duration-300"
          />
        </div>

        <div className="p-5">
          {/* Title + Rating */}
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-lg group-hover:text-blue-600">
              {s.name}
            </h3>
            <span className="text-sm text-yellow-500">
              ⭐ {s.rating}
            </span>
          </div>

          {/* Slots */}
          <p className="text-sm text-green-600 mt-1">
            {s.slots}
          </p>

          {/* Price + CTA */}
          <div className="flex justify-between items-center mt-5">
            <span className="font-bold text-gray-800">
              {s.price}
            </span>

            <Link to="/services">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition">
                Book Now
              </button>
            </Link>
          </div>
        </div>
      </div>
    ))}
  </div>
</section>
        </div>
        {/* Mobile Bottom Nav */}
        <BottomNav />
      </main>
    </div>
  );
}
