import { useState } from "react";
import toast from "react-hot-toast";

const useChangePassword = () => {
	const [loading, setLoading] = useState(false);

	const changePassword = async (oldPassword, newPassword, confirmPassword) => {
		const success = handleInputErrors(oldPassword, newPassword, confirmPassword);
		if (!success) return;
		setLoading(true);
		try {
			const API = import.meta.env.VITE_API_URL || "";
			const res = await fetch(`${API}/api/auth/profile/change-password`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				credentials: "include",
				body: JSON.stringify({ oldPassword, newPassword, confirmPassword }),
			});

			const data = await res.json();
			if (data.error) {
				throw new Error(data.error);
			}

			toast.success(data.message);
			return true;
		} catch (error) {
			toast.error(error.message);
			return false;
		} finally {
			setLoading(false);
		}
	};

	return { loading, changePassword };
};
export default useChangePassword;

function handleInputErrors(oldPassword, newPassword, confirmPassword) {
	if (!oldPassword || !newPassword || !confirmPassword) {
		toast.error("Please fill in all fields");
		return false;
	}

	if (newPassword !== confirmPassword) {
		toast.error("New passwords don't match");
		return false;
	}

	if (newPassword.length < 6) {
		toast.error("Password must be at least 6 characters long");
		return false;
	}

	return true;
}
