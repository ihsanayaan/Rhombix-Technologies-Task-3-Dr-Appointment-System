import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  return (
    <div className="p-6 max-w-md mx-auto">
      {/* Back Button */}
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-sm text-gray-600 mb-6 hover:text-blue-600 transition"
          >
            <ArrowLeft size={18} />
            Back to Home
          </button>
      <div className="bg-white rounded-xl shadow p-6 text-center">
        <img
          src="https://i.pravatar.cc/100"
          alt="profile"
          className="mx-auto rounded-full mb-4"
        />

        <h2 className="text-xl font-bold">
          ABC
        </h2>
        <p className="text-gray-500">
          ABC@email.com
        </p>
        <button className="mt-6 w-full bg-blue-600 text-white p-3 rounded-lg">
          Edit Profile
        </button>
      </div>
    </div>
  );
}
