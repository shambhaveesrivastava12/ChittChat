import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";

const LogoutButton = ({ className = '' }) => {
    const { loading, logout } = useLogout();

    return (
        <div className={className}>
            {!loading ? (
                <button onClick={logout} className="w-full flex items-center justify-between">
                    <span>Logout</span>
                    <BiLogOut className='w-5 h-5 text-gray-800 dark:text-white' />
                </button>
            ) : (
                <span className='loading loading-spinner'></span>
            )}
        </div>
    );
};
export default LogoutButton;