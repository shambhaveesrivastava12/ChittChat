import { Navigate } from "react-router-dom";
import { useState } from "react";
import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "../../components/sidebar/Sidebar";
import { useAuthContext } from "../../context/AuthContext";
import { Menu, X } from "lucide-react";
import "../home/Home.css";

const Home = () => {
  const { authUser } = useAuthContext();
  if (!authUser) {
    return <Navigate to="/" />;
  }

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen((s) => !s);

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center bg-no-repeat p-4 md:p-6 overflow-hidden relative"
      style={{
        backgroundImage: "url('/bg.png')",
      }}
    >
      {/* Main Chat Container */}
      <div className="relative w-full max-w-6xl h-[85vh] md:h-[80vh] lg:h-[75vh] rounded-2xl flex flex-col md:flex-row overflow-hidden shadow-2xl border border-slate-700/40 bg-gray-400/10 dark:bg-slate-900/50 backdrop-blur-xl">

        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between px-4 py-3 border-b border-slate-700/30 bg-white/80 dark:bg-slate-900/70 backdrop-blur-md z-20">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 transition"
            aria-label="Toggle sidebar"
          >
            {isSidebarOpen ? (
              <X className="w-6 h-6 text-gray-800 dark:text-gray-100" />
            ) : (
              <Menu className="w-6 h-6 text-gray-800 dark:text-gray-100" />
            )}
          </button>
          <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
            {authUser?.fullName || "Chat"}
          </span>
          <div className="w-8" />
        </div>

        {/* Desktop Sidebar */}
        <div className="hidden md:flex flex-col w-[310px] h-full border-r border-slate-700/30 bg-white/70 dark:bg-slate-900/60 backdrop-blur-2xl">
          <Sidebar />
        </div>

        {/* Message Section */}
        <div className="flex-1 flex flex-col min-w-0 bg-white/70 dark:bg-slate-900/50 backdrop-blur-md">
          <MessageContainer />
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/30 z-40 flex"
          onClick={() => setIsSidebarOpen(false)}
        >
          <div
            className="w-72 sm:w-80 bg-white dark:bg-slate-900 h-full border-r border-slate-200 dark:border-slate-700 shadow-xl z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <Sidebar />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
