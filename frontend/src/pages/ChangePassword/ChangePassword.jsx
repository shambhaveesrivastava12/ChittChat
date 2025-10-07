import { useState } from "react";
import { Link } from "react-router-dom";
import useChangePassword from "../../hooks/useChangePassword";

const ChangePassword = () => {
	const [oldPassword, setOldPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const { loading, changePassword } = useChangePassword();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const success = await changePassword(oldPassword, newPassword, confirmPassword);
		if (success) {
			// Reset form on success
			setOldPassword("");
			setNewPassword("");
			setConfirmPassword("");
		}
	};

	return (
		<>
			<h1 className='text-3xl font-semibold text-center text-gray-800 dark:text-gray-200'>
				Change Password
				<span className='text-blue-500'> ChitChat</span>
			</h1>

			<form onSubmit={handleSubmit} className='mt-6'>
				<div>
					<label className='label p-2'>
						<span className='text-base label-text text-gray-800 dark:text-gray-200'>Current Password</span>
					</label>
					<input
						type='password'
						placeholder='Enter current password'
						className='w-full input input-bordered h-10 bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white'
						value={oldPassword}
						onChange={(e) => setOldPassword(e.target.value)}
					/>
				</div>

				<div>
					<label className='label mt-2'>
						<span className='text-base label-text text-gray-800 dark:text-gray-200'>New Password</span>
					</label>
					<input
						type='password'
						placeholder='Enter new password'
						className='w-full input input-bordered h-10 bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white'
						value={newPassword}
						onChange={(e) => setNewPassword(e.target.value)}
					/>
				</div>

				<div>
					<label className='label mt-2'>
						<span className='text-base label-text text-gray-800 dark:text-gray-200'>Confirm New Password</span>
					</label>
					<input
						type='password'
						placeholder='Confirm new password'
						className='w-full input input-bordered h-10 bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white'
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
					/>
				</div>

				<div className='flex justify-between items-center mt-4'>
					<Link
						to='/'
						className='text-sm hover:underline hover:text-blue-600 text-gray-800 dark:text-gray-200'
					>
						Back to Home
					</Link>
					<Link to='/forgot-password' className='text-sm hover:underline hover:text-blue-600 text-gray-800 dark:text-gray-200'>
						Forgot Password?
					</Link>
				</div>

				<div>
					<button className='btn btn-block btn-sm mt-4 bg-sky-500 text-white dark:bg-sky-600' disabled={loading}>
						{loading ? <span className='loading loading-spinner '></span> : "Change Password"}
					</button>
				</div>
			</form>
		</>
	);
};
export default ChangePassword;
