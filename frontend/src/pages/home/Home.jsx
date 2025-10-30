// import { Navigate } from "react-router-dom";
// import { useState } from "react";
// import MessageContainer from "../../components/messages/MessageContainer";
// import Sidebar from "../../components/sidebar/Sidebar";
// import { useAuthContext } from "../../context/AuthContext";
// import { Menu, X } from "lucide-react";
// import "../home/Home.css"
// // import ProfileButton from "../../components/profile/ProfileButton";

// const Home = () => {
//     // redirecting to landing page if user is not logged in
//     const { authUser } = useAuthContext();
//     console.log(authUser)
//     if(!authUser){
//         return <Navigate to='/' />
//     }
//     const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//     const toggleSidebar = () => setIsSidebarOpen((s) => !s);

//     return (
//         <div className='h-screen flex items-center justify-center p-4'>
//             <div className='relative w-full max-w-6xl sm:h-[540px] md:h-[650px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 dark:bg-gray-900/50 flex flex-col md:flex-row'>
//                 {/* Mobile hamburger (shows on small screens) */}
//                 <button
//                     onClick={toggleSidebar}
//                     className='md:hidden absolute top-4 left-4 z-50 p-2 rounded-md bg-white/90 dark:bg-slate-800/80 shadow-sm'
//                     aria-label='Toggle sidebar'
//                 >
//                     {isSidebarOpen ? <X className='w-6 h-6' /> : <Menu className='w-6 h-6' />}
//                 </button>

//                 {/* Sidebar: visible on md+, on small screens it becomes an overlay when opened */}
//                 <div className={`bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-700 p-0 md:p-4 ${isSidebarOpen ? 'block' : 'hidden'} md:block absolute md:relative top-0 left-0 bottom-0 md:translate-x-0 z-40 md:z-0 w-72 md:w-auto`}
//                 >
//                     <div className='h-full overflow-auto'>
//                         <Sidebar />
//                     </div>
//                 </div>

//                 {/* Backdrop when mobile sidebar is open */}
//                 {isSidebarOpen && (
//                     <div onClick={() => setIsSidebarOpen(false)} className='md:hidden fixed inset-0 bg-black/30 z-30' />
//                 )}

//                 {/* Message area */}
//                 <div className='flex-1 md:min-w-0 md:flex md:flex-col'>
//                     <MessageContainer />
//                 </div>
//             </div>
//         </div>
//     );
// };
// export default Home;

import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "../../components/sidebar/Sidebar";
import { useAuthContext } from "../../context/AuthContext";
import { Menu, X } from "lucide-react";
import "./Home.css";

const Home = () => {
  const { authUser } = useAuthContext();
  if (!authUser) {
    return <Navigate to="/" />;
  }

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen((s) => !s);

  useEffect(() => {
    if (typeof window === "undefined") return;
    document.body.classList.toggle("home-sidebar-open", isSidebarOpen);
    return () => {
      document.body.classList.remove("home-sidebar-open");
    };
  }, [isSidebarOpen]);

  return (
    <div className="home-page min-h-screen flex items-center justify-center p-4 bg-home-outer">
      <div className="home-frame relative w-full max-w-6xl h-[84vh] md:h-[86vh] rounded-xl overflow-hidden flex bg-home-frame">
        {/* Mobile hamburger */}
        <button
          onClick={toggleSidebar}
          className="mobile-hamburger md:hidden absolute top-4 left-4 z-50 p-2 rounded-md bg-white/90 dark:bg-slate-800/80 shadow-sm"
          aria-label="Toggle sidebar"
        >
          {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Sidebar - slide-in on mobile, static on md+ */}
        <aside
          className={`sidebar-panel fixed md:relative top-0 left-0 bottom-0 z-50 transform transition-transform duration-300 ease-in-out
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
          aria-hidden={!isSidebarOpen && window?.innerWidth < 768}
        >
          <div className="h-full">
            <Sidebar onClose={() => setIsSidebarOpen(false)} />
          </div>
        </aside>

        {/* Backdrop when sidebar open (mobile) */}
        {isSidebarOpen && <div onClick={() => setIsSidebarOpen(false)} className="sidebar-backdrop md:hidden fixed inset-0 z-40" />}

        {/* Main message area */}
        <main className="flex-1 md:flex md:flex-col message-area relative z-10">
          <MessageContainer />
        </main>
      </div>
    </div>
  );
};

export default Home;
