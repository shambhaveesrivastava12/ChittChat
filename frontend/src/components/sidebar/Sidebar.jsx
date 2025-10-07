import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";
import ThemeToggle from "../ThemeToggle";
import { Link } from "react-router-dom";

const Sidebar = () => {
    return (
        <div className='border-r border-slate-500 p-4 flex flex-col text-gray-800 dark:text-gray-200'>
            <SearchInput />
            <div className='divider px-3'></div>
            <Conversations />
            <div className='mt-auto'>
                <Link 
                    to="/change-password" 
                    className='btn btn-sm btn-outline w-full mb-2 text-gray-800 dark:text-gray-200 border-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700'
                >
                    Change Password
                </Link>
                <div className='flex items-center justify-between'>
                    <LogoutButton />
                    <ThemeToggle />
                </div>
            </div>
        </div>
    );
};
export default Sidebar;