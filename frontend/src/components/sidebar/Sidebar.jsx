// import Conversations from "./Conversations";
// import SearchInput from "./SearchInput";
// import ThemeToggle from "../ThemeToggle";
// import ProfileButton from "../profile/ProfileButton";

// const Sidebar = () => {
//     return (
//         <div className='border-r border-slate-500 p-4 flex flex-col text-gray-800 dark:text-gray-200'>
//             <SearchInput />
//             <div className='divider px-3'></div>
//             <Conversations />
//             <div className='mt-auto flex justify-between items-center gap-2'>
//                 <ProfileButton />
//                 <ThemeToggle />
//             </div>
//         </div>
//     );
// };
// export default Sidebar;
// src/components/sidebar/Sidebar.jsx
import Conversations from "./Conversations";
import SearchInput from "./SearchInput";
import ThemeToggle from "../ThemeToggle";
import ProfileButton from "../profile/ProfileButton";

const Sidebar = ({ onClose }) => {
  return (
    <div className="sidebar-root min-h-screen md:min-h-full w-full h-full flex flex-col text-gray-200">
      <div className="px-4 py-3 border-b border-slate-700 flex items-center justify-between">
        <div className="text-sm font-semibold">Chats</div>
        {/* close button shown only on mobile when used via Home.jsx hamburger */}
        <div className="md:hidden">
          <button onClick={onClose} className="text-slate-200/80 text-sm">Close</button>
        </div>
      </div>

      <div className="p-3">
        <SearchInput />
      </div>

      <div className="divider my-0" />

      <div className="flex-1 overflow-auto px-2 pb-4">
        <Conversations />
      </div>

      <div className="px-3 py-3 border-t border-slate-700 flex items-center justify-between gap-2">
        <ProfileButton />
        <ThemeToggle />
      </div>
    </div>
  );
};
export default Sidebar;
