export default function Topbar({ onMenuClick }) {
  return (
    <header className="md:hidden bg-white shadow p-4 flex justify-between items-center">
      <button
        onClick={onMenuClick}
        className="text-2xl font-bold"
      >
        ☰
      </button>

      <h1 className="font-bold text-lg text-blue-600">
        DocBook
      </h1>

      <img
        src="https://i.pravatar.cc/40"
        alt="profile"
        className="rounded-full"
      />
    </header>
  );
}
