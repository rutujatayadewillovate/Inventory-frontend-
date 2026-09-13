import { useNavigate } from "react-router-dom";

function Index() {
  const navigate = useNavigate();

  const handleAdmin = () => {
    navigate("/admin-login");
  };

  const handleStaff = () => {
    navigate("/staff-login");
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">

      <div className="w-full max-w-sm bg-white border border-slate-200 rounded-xl p-6 shadow-md flex flex-col items-center gap-6">

        {/* Header */}
        <div className="w-full text-center">
          <h1 className="text-2xl font-bold text-blue-600">
            ElectroStore
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            Inventory & Billing System
          </p>
        </div>

        {/* Role Selection */}
        <div className="w-full text-center">
          <h2 className="text-xl font-semibold text-slate-800">
            Welcome
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Select your role to continue
          </p>
        </div>

        {/* Admin */}
        <button
          type="button"
          onClick={handleAdmin}
          className="w-full border border-blue-600 rounded-xl px-4 py-3 text-blue-600 font-medium hover:bg-blue-600 hover:text-white transition"
        >
          Continue as Admin
        </button>

        {/* Staff */}
        <button
          type="button"
          onClick={handleStaff}
          className="w-full border border-slate-400 rounded-xl px-4 py-3 text-slate-600 font-medium hover:bg-slate-600 hover:text-white transition"
        >
          Continue as Staff
        </button>

      </div>
    </div>
  );
}

export default Index;
