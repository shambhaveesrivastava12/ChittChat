import { useEffect, useRef, useState } from "react";
import { createPortal } from 'react-dom';
import { useNavigate } from "react-router-dom";
import useGetUserProfileData from "../../hooks/useGetUserProfileData";
import LogoutButton from '../sidebar/LogoutButton'

const ProfileButton = () => {
    const { profileData, loading } = useGetUserProfileData();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const containerRef = useRef(null);
    const menuRef = useRef(null);

    console.log("Profile Data:", profileData);

    useEffect(() => {
        function handleClickOutside(e) {
            const target = e.target;
            if (
                containerRef.current && !containerRef.current.contains(target) &&
                (!menuRef.current || !menuRef.current.contains(target))
            ) {
                setOpen(false);
            }
        }

        function handleKey(e) {
            if (e.key === "Escape") setOpen(false);
        }

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleKey);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleKey);
        };
    }, []);

    if (loading) {
        return <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" disabled>Loading...</button>;
    }

    return (
        <div className="relative" ref={containerRef}>
            <button
                className="text-white px-2 py-1 rounded transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.8)]"
                onClick={() => setOpen((s) => !s)}
                aria-haspopup="true"
                aria-expanded={open}
            >
                <img src={profileData?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(profileData?.name || profileData?.username)}&background=0D8ABC&color=fff&rounded=true&size=128`} alt="user profile pic" className="w-12 h-12 rounded-full transition-all duration-300 hover:shadow-[0_0_25px_rgba(59,130,246,0.9)] hover:scale-110"
                    onError={(e) => {
                        const fallbackName = (profileData && (profileData.name || profileData.username)) || 'User';
                        e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(fallbackName)}&background=0D8ABC&color=fff&rounded=true&size=128`;
                    }}
                />
            </button>

            {open && (() => {
                const rect = containerRef.current?.getBoundingClientRect();
                const defaultStyles = rect ? {
                    position: 'fixed',
                    bottom: window.innerHeight - rect.top + 8 - window.scrollY,
                    left: rect.right - 176 + window.scrollX,
                    width: 176,
                } : { position: 'fixed', top: 0, left: 0 };

                return createPortal(
                    <div ref={menuRef} style={defaultStyles} className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded shadow-lg z-[9999] ring-1 ring-black ring-opacity-5">
                        <button
                            className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                            onClick={() => {
                                setOpen(false);
                                navigate('/profile');
                            }}
                        >
                            Edit profile
                        </button>
                        <div className="border-t border-gray-100 dark:border-gray-700" />
                        <LogoutButton className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700" />
                    </div>,
                    document.body
                );
            })()}
        </div>
    );
}

export default ProfileButton;