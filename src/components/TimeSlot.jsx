export default function TimeSlot({ time, selected, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg border
      ${selected ? "bg-blue-600 text-white" : "bg-white text-gray-600"}`}
    >
      {time}
    </button>
  );
}
