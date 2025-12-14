import { Clock, Stethoscope } from "lucide-react";

export default function ServiceCard({
  name,
  price,
  duration,
  category,
  onClick,
}) {
  return (
    <div
      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-5 flex flex-col justify-between"
    >
      {/* Top Section */}
      <div>
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-800">
            {name}
          </h3>

          <span className="text-blue-600 font-bold text-lg">
            ${price}
          </span>
        </div>

        {/* Category */}
        <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
          <Stethoscope size={14} />
          <span>{category}</span>
        </div>

        {/* Duration */}
        <div className="flex items-center gap-1 text-sm text-gray-500 mt-2">
          <Clock size={14} />
          <span>{duration} min</span>
        </div>
      </div>

      {/* CTA */}
      <button
        onClick={onClick}
        className="mt-5 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl text-sm font-medium transition"
      >
        Book Now
      </button>
    </div>
  );
}
