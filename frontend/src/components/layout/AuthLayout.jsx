import { Outlet } from "react-router-dom";
import ThemeToggle from "../ThemeToggle";

const AuthLayout = () => {
    return (
        <div className="w-screen min-h-screen flex flex-col items-center justify-center px-4 mx-auto">
            <div className="w-full max-w-md md:max-w-lg lg:max-w-xl rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 dark:bg-black/30 relative overflow-hidden">
                <div className="absolute top-4 right-4">
                    <ThemeToggle />
                </div>
                {/* This Outlet component will render the specific page (Login, SignUp, etc.) */}
                <Outlet />
            </div>
        </div>
    );
};

export default AuthLayout;