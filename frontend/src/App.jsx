// frontend/src/App.jsx

import { Navigate, Route, Routes, Outlet } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ChangePassword from "./pages/ChangePassword/ChangePassword";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";
import { useContext } from "react";
import { ThemeContext } from "./context/ThemeContext";
import AuthLayout from "./components/layout/AuthLayout";

function App() {
    const { authUser } = useAuthContext();
    const { theme } = useContext(ThemeContext);

    return (
        <div className='p-4 h-screen flex items-center justify-center'>
            <Routes>
                <Route path='/' element={authUser ? <Home /> : <Navigate to={"/login"} />} />

                {/* All auth routes will now use the AuthLayout */}
                <Route element={authUser ? <Navigate to='/' /> : <AuthLayout />}>
                    <Route path='/login' element={<Login />} />
                    <Route path='/signup' element={<SignUp />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                </Route>

                {/* Protected route for change password */}
                <Route element={authUser ? <AuthLayout /> : <Navigate to={"/login"} />}>
                    <Route path="/change-password" element={<ChangePassword />} />
                </Route>
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