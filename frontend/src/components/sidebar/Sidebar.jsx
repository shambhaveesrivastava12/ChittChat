import Conversations from "./Conversations";
import SearchInput from "./SearchInput";
import ThemeToggle from "../ThemeToggle";
import ProfileButton from "../profile/ProfileButton";

const Sidebar = () => {
    return (
        <div
            className=" flex flex-col h-full md:static md:translate-x-0 border-r border-slate-700/40 text-gray-200 p-4 w-72 md:w-80 bg-gradient-to-b from-slate-800/70 to-slate-900/60 
            backdrop-blur-2xl rounded-l-2xl shadow-lg overflow-hidden transition-all
            "
        >
            {/* Search Bar */}
            <div className="mb-3">
                <SearchInput />
            </div>

            {/* Divider */}
            <div className="border-t border-slate-700/30 mb-3"></div>

            {/* Conversations (scrollable) */}
            <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar">
                <Conversations />
            </div>

            {/* Footer (Profile + Theme) */}
            <div className="border-t border-slate-700/30 mt-3 pt-3 flex justify-between items-center gap-2">
                <ProfileButton />
                <ThemeToggle />
            </div>
        </div>
    );
};

export default Sidebar;
