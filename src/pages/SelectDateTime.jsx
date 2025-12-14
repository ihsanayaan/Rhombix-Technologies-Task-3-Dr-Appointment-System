import { useBooking } from "../store/bookingStore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TimeSlot from "../components/TimeSlot";

export default function SelectDateTime() {
  const navigate = useNavigate();
  const setDate = useBooking((s) => s.setDate);
  const setTime = useBooking((s) => s.setTime);

  const [localDate, setLocalDate] = useState("");
  const [localTime, setLocalTime] = useState("");

  const times = ["10:00 AM", "11:00 AM", "1:00 PM", "3:00 PM"];

  const continueNext = () => {
    if (!localDate || !localTime) {
      alert("Please select date & time");
      return;
    }
    setDate(localDate);
    setTime(localTime);
    navigate("/details");
  };

  return (
    <div className="p-6 grid gap-4">
      <input
        type="date"
        className="p-3 border rounded-lg"
        onChange={(e) => setLocalDate(e.target.value)}
      />

      <div className="grid grid-cols-2 gap-2">
        {times.map((t) => (
          <TimeSlot
            key={t}
            time={t}
            selected={localTime === t}
            onClick={() => setLocalTime(t)}
          />
        ))}
      </div>

      <button
        onClick={continueNext}
        className="bg-blue-600 text-white p-3 rounded-xl"
      >
        Continue
      </button>
    </div>
  );
}
