import { useBooking } from "../store/bookingStore";
import { useNavigate } from "react-router-dom";

export default function Summary() {
  const navigate = useNavigate();
  const booking = useBooking();

  const confirm = () => {
    navigate("/success");
  };

  return (
    <div className="p-6 grid gap-4">
      <h2 className="text-xl font-bold">Booking Summary</h2>

      <div className="bg-white p-4 rounded-lg shadow">
        <p><b>Service:</b> {booking.service?.name}</p>
        <p><b>Date:</b> {booking.date}</p>
        <p><b>Time:</b> {booking.time}</p>
        <p><b>Name:</b> {booking.user.name}</p>
        <p><b>Phone:</b> {booking.user.phone}</p>
        <p className="text-sm text-gray-800">
    <b className="text-gray-800">Gender:</b>{" "}
    {booking.user.gender
      ? booking.user.gender.charAt(0).toUpperCase() +
        booking.user.gender.slice(1)
      : "-"}
  </p>
      </div>

      <button
        onClick={confirm}
        className="bg-green-600 text-white p-3 rounded-xl"
      >
        Confirm Booking
      </button>
    </div>
  );
}
