// frontend/src/App.jsx

import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ProfilePage from "./pages/profile/ProfilePage";
import BlockedUsers from "./pages/profile/BlockedUsers";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";
import { useContext } from "react";
import { ThemeContext } from "./context/ThemeContext";
import AuthLayout from "./components/layout/AuthLayout";
import MagicCursorTrail from "./components/MagicCursorTrail"; // Adjust path as needed
import Mainpage from "./pages/MainPage.jsx";

function App() {
    const { authUser } = useAuthContext();
    const { theme } = useContext(ThemeContext);
    const enableCursorTrail = true;
    return (
        <div>
            <Routes>
                <Route path='/' element={<Mainpage />} />

                <Route element={!authUser ? <AuthLayout /> : <Navigate to='/chat' />}>
                    <Route path='/login' element={<Login />} />
                    <Route path='/signup' element={<SignUp />} />
                    <Route path='/forgot-password' element={<ForgotPassword />} />
                </Route>

                {authUser && (
                    <>
                    <Route path='/chat' element={<Home />} />
                    <Route path='/profile' element={<ProfilePage />} />
                    <Route path='/blocked' element={<BlockedUsers />} />
                    </>
                )}
                </Routes>
            <Toaster
                toastOptions={{
                    style: {
                        background: theme === 'dark' ? '#374151' : '#ffffff',
                        color: theme === 'dark' ? '#ffffff' : '#000000',
                    },
                }}
            />
        </div>
    );
}

export default App;
