import { useState } from "react";
import toast from "react-hot-toast";

const useUpdateProfile = () => {
    const [loading, setLoading] = useState(false);

    const updateProfile = async (profileData) => {
        setLoading(true);
        try {
            const API = import.meta.env.VITE_API_URL || "";
            const res = await fetch(`${API}/api/users/update`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(profileData),
            });

            const data = await res.json();
            
            if (!res.ok) {
                throw new Error(data.message || data.error || "Failed to update profile");
            }

            toast.success("Profile updated successfully!");
            return data;
        } catch (error) {
            toast.error(error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return { loading, updateProfile };
};

export default useUpdateProfile;
