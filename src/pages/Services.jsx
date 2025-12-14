import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ServiceCard from "../components/ServiceCard";
import Sidebar from "../components/Sidebar";
import BottomNav from "../components/BottomNav";
import { useBooking } from "../store/bookingStore";

export default function Services() {
  const navigate = useNavigate();
  const setService = useBooking((s) => s.setService);

  const services = [
  {
    id: 1,
    name: "General Checkup",
    price: 20,
    duration: 30,
    category: "General Physician",
  },
  {
    id: 2,
    name: "Dental Cleaning",
    price: 40,
    duration: 45,
    category: "Dentist",
  },
  {
    id: 3,
    name: "Skin Consultation",
    price: 30,
    duration: 40,
    category: "Dermatologist",
  },
  {
    id: 4,
    name: "Heart Consultation",
    price: 60,
    duration: 50,
    category: "Cardiologist",
  },
  {
    id: 5,
    name: "Child Specialist Visit",
    price: 35,
    duration: 30,
    category: "Pediatrician",
  },
  {
    id: 6,
    name: "Orthopedic Checkup",
    price: 55,
    duration: 45,
    category: "Orthopedic",
  },
];
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Desktop Sidebar */}
      <Sidebar />

      <main className="flex-1 flex flex-col">

        {/* Content */}
        <div className="p-6 flex-1 overflow-y-auto">

          {/* Back Button */}
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-sm text-gray-600 mb-6 hover:text-blue-600 transition"
          >
            <ArrowLeft size={18} />
            Back to Home
          </button>

          {/* Page Title */}
          <h1 className="text-xl font-bold mb-4">
            Available Services
          </h1>

          {/* Services List */}
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {services.map((s) => (
              <ServiceCard
                key={s.id}
                {...s}
                onClick={() => {
                  setService(s);
                  navigate(`/service/${s.id}`);
                }}
              />
            ))}
          </div>
        </div>
        {/* Mobile Bottom Nav */}
        <BottomNav />
      </main>
    </div>
  );
}
