import Conversations from "./Conversations";
import SearchInput from "./SearchInput";
import ThemeToggle from "../ThemeToggle";
import ProfileButton from "../profile/ProfileButton";

const Sidebar = () => {
    return (
        <div className='border-r border-slate-500 p-4 flex flex-col text-gray-800 dark:text-gray-200'>
            <SearchInput />
            <div className='divider px-3'></div>
            <Conversations />
            <div className='mt-auto flex justify-between items-center gap-2'>
                <ProfileButton />
                <ThemeToggle />
            </div>
        </div>
    );
};
export default Sidebar;