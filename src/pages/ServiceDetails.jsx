import { useBooking } from "../store/bookingStore";
import { useNavigate } from "react-router-dom";

export default function ServiceDetails() {
  const { service } = useBooking();
  const navigate = useNavigate();

  if (!service) return <p className="p-6">No service selected.</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">{service.name}</h1>
      <p className="text-gray-600">Duration: {service.duration} mins</p>
      <p className="text-gray-600 mb-6">Price: ${service.price}</p>

      <button
        onClick={() => navigate("/select-datetime")}
        className="w-full bg-blue-600 text-white p-3 rounded-xl"
      >
        Select Date & Time
      </button>
    </div>
  );
}
