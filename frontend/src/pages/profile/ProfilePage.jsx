import { useEffect, useState } from "react";
import useGetUserProfileData from "../../hooks/useGetUserProfileData";
import useUpdateProfile from "../../hooks/useUpdateProfile";

const ProfilePage = () => {
    const { profileData, loading } = useGetUserProfileData();
    const { loading: updating, updateProfile } = useUpdateProfile();
    const [isEditing, setIsEditing] = useState(false);
    const [profileForm, setProfileForm] = useState({
        name: profileData?.name || '',
        about: profileData?.about || '',
        avatar: profileData?.avatar || ''
    });

    useEffect(() => {
        if (profileData) {
            setProfileForm({
                name: profileData.name || '',
                about: profileData.about || '',
                avatar: profileData.avatar || ''
            });
        }
    }, [profileData]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[450px] md:h-[550px] w-2/6 rounded-lg bg-gray-300 dark:bg-gray-900/60">
                <span className="text-2xl font-semibold text-gray-700 dark:text-gray-200">Loading...</span>
            </div>
        );
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfileForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        try {
            await updateProfile(profileForm);
            profileData.about = profileForm.about;
            setIsEditing(false);
        } catch (error) {
            console.error('Failed to update profile:', error);
        }
    };

    const handleCancel = () => {
        setProfileForm({
            name: profileData.name || '',
            about: profileData.about || '',
            avatar: profileData.avatar || ''
        });
        setIsEditing(false);
    };
    // console.log(profileData);
    return (
        <div className="flex sm:h-[450px] md:h-[550px] w-2/6 rounded-lg overflow-hidden bg-gray-300 dark:bg-gray-900/60 backdrop-filter backdrop-blur-md bg-opacity-40 justify-center items-center shadow-lg">
            {profileData ? (
                !isEditing ? (
                    <div className="flex flex-col items-center space-y-8 px-8 py-10">
                        {/* Profile Pic */}
                        <div>
                            <img
                                src={profileData.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(profileData.name || profileData.username)}&background=0D8ABC&color=fff&rounded=true&size=200`}
                                alt={profileData.username}
                                className="rounded-full w-52 h-52 border-4 border-white dark:border-gray-700 shadow-lg"
                                onError={(e) => {
                                    e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(profileData.name || profileData.username)}&background=0D8ABC&color=fff&rounded=true&size=200`;
                                }}
                            />
                        </div>
                        <div className="text-center">
                            <h2 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-4">@{profileData.username}</h2>
                            <div className="space-y-6 text-xl text-gray-700 dark:text-gray-300">
                                <div className="flex justify-center space-x-4">
                                    <span className="font-bold">Email:</span>
                                    <p>{profileData.email}</p>
                                </div>
                                <div className="flex justify-center space-x-4">
                                    <span className="font-bold">About me:</span>
                                    <p>{profileData.about}</p>
                                </div>
                                <div className="flex justify-center space-x-4">
                                    <span className="font-bold">Name:</span>
                                    <p>{profileData.name}</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                                onClick={() => setIsEditing(true)}
                            >
                                Edit Profile
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center space-y-6 px-8 py-10 w-full">
                        <button
                            className="self-start mb-4 text-white hover:underline"
                            onClick={handleCancel}
                        >
                            &larr; Back to profile
                        </button>

                        <div className="flex flex-col space-y-4 w-full max-w-md">
                            <label className="text-gray-700 dark:text-gray-300 font-semibold">
                                Name
                                <input
                                    type="text"
                                    name="name"
                                    value={profileForm.name}
                                    onChange={handleInputChange}
                                    className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 text-white"
                                />
                            </label>
                            <label className="text-gray-700 dark:text-gray-300 font-semibold">
                                About Me
                                <textarea
                                    name="about"
                                    value={profileForm.about}
                                    onChange={handleInputChange}
                                    rows={2}
                                    className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 text-white"
                                />
                            </label>
                            <label className="text-gray-700 dark:text-gray-300 font-semibold">
                                Avatar URL
                                <input
                                    type="text"
                                    name="avatar"
                                    value={profileForm.avatar}
                                    onChange={handleInputChange}
                                    className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 text-white "
                                />
                            </label>

                            {profileForm.avatar && (
                                <div className="flex justify-center mt-2">
                                    <img
                                        src={profileForm.avatar}
                                        alt="Avatar Preview"
                                        className="rounded-full w-32 h-32 border-2 border-gray-400"
                                        onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/150')}
                                    />
                                </div>
                            )}

                            <div className="flex justify-between mt-6">
                                <button
                                    onClick={handleCancel}
                                    className="px-4 py-2 bg-gray-400 rounded-md hover:bg-gray-500 text-white"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSave}
                                    disabled={updating}
                                    className="px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {updating ? 'Saving...' : 'Save'}
                                </button>
                            </div>
                        </div>
                    </div>
                )
            ) : (
                <div className="text-gray-700 dark:text-gray-300 font-semibold text-2xl">
                    No profile data available.
                </div>
            )}
        </div>
    );
};

export default ProfilePage;
