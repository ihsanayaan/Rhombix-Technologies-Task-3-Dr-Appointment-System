import { useForm } from "react-hook-form";
import { useBooking } from "../store/bookingStore";
import { useNavigate } from "react-router-dom";

export default function UserDetails() {
  const { register, handleSubmit } = useForm();
  const setUser = useBooking((s) => s.setUser);
  const navigate = useNavigate();

  const submitForm = (data) => {
    setUser(data);
    navigate("/summary");
  };

  return (
   <form onSubmit={handleSubmit(submitForm)} className="p-6 grid gap-4">
  {/* Name */}
  <input
    {...register("name")}
    placeholder="Name"
    className="p-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400"
  />

  {/* Phone */}
  <input
    {...register("phone")}
    placeholder="Phone"
    className="p-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400"
  />

  {/* Email */}
  <input
    {...register("email")}
    placeholder="Email"
    className="p-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400"
  />

  {/* Gender */}
  <div>
    <label className="text-sm font-medium text-gray-600 mb-2 block">
      Gender
    </label>

    <div className="flex gap-4">
      <label className="flex items-center gap-2 text-sm">
        <input
          type="radio"
          value="male"
          {...register("gender")}
          className="accent-blue-600"
        />
        Male
      </label>

      <label className="flex items-center gap-2 text-sm">
        <input
          type="radio"
          value="female"
          {...register("gender")}
          className="accent-blue-600"
        />
        Female
      </label>

      <label className="flex items-center gap-2 text-sm">
        <input
          type="radio"
          value="other"
          {...register("gender")}
          className="accent-blue-600"
        />
        Other
      </label>
    </div>
  </div>

  {/* CTA */}
  <button
    type="submit"
    className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-sm font-medium transition"
  >
    Continue
  </button>
</form>

  );
}
