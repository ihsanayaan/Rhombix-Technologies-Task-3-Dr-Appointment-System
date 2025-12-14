import { useBooking } from "../store/bookingStore";
import { Link } from "react-router-dom";

export default function Success() {
  const reset = useBooking((s) => s.reset);

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold text-green-600">Booking Confirmed!</h1>
      <p className="mt-2 text-gray-600">Your appointment has been booked.</p>

      <Link to="/">
        <button
          onClick={reset}
          className="mt-6 bg-blue-600 text-white p-3 w-full rounded-xl"
        >
          Go Home
        </button>
      </Link>
    </div>
  );
}
