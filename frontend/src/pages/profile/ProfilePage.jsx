import { useEffect, useState } from "react";
import useGetUserProfileData from "../../hooks/useGetUserProfileData";
import useUpdateProfile from "../../hooks/useUpdateProfile";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";


const ProfilePage = () => {
  const { profileData, loading } = useGetUserProfileData();
  const { loading: updating, updateProfile } = useUpdateProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [profileForm, setProfileForm] = useState({
    name: profileData?.name || '',
    about: profileData?.about || '',
    avatar: profileData?.avatar || ''
  });
  const navigate = useNavigate()

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
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-full max-w-xl rounded-lg bg-gray-300 dark:bg-gray-900/60 p-8 shadow-lg">
          <span className="text-2xl font-semibold text-gray-700 dark:text-gray-200">Loading...</span>
        </div>
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

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <div className="w-full max-w-xl rounded-lg bg-gray-300 dark:bg-gray-900/60 backdrop-filter backdrop-blur-md bg-opacity-40 shadow-lg p-8 relative">
        <IoIosArrowBack className="absolute top-6 left-5 cursor-pointer h-[25px] w-[25px] text-gray-700" onClick={() => {
            navigate('/chat')
        }}/>
        {profileData ? (
          !isEditing ? (
            <div className="flex flex-col items-center space-y-8">
              <img
                src={profileData.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(profileData.name || profileData.username)}&background=0D8ABC&color=fff&rounded=true&size=200`}
                alt={profileData.username}
                className="rounded-full w-52 h-52 border-4 border-white dark:border-gray-700 shadow-lg"
                onError={(e) => {
                  e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(profileData.name || profileData.username)}&background=0D8ABC&color=fff&rounded=true&size=200`;
                }}
              />
              <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white">@{profileData.username}</h2>
              <div className="space-y-4 text-lg text-gray-700 dark:text-gray-300 text-center">
                <p><strong>Email:</strong> {profileData.email}</p>
                <p><strong>About me:</strong> {profileData.about}</p>
                <p><strong>Name:</strong> {profileData.name}</p>
              </div>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </button>
            </div>
          ) : (
            <div className="flex flex-col space-y-6">
              <button
                className="text-white hover:underline self-start"
                onClick={handleCancel}
              >
                &larr; Back to profile
              </button>

              <div className="space-y-4">
                <label className="block text-gray-700 dark:text-gray-300 font-semibold">
                  Name
                  <input
                    type="text"
                    name="name"
                    value={profileForm.name}
                    onChange={handleInputChange}
                    className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 text-white"
                  />
                </label>
                <label className="block text-gray-700 dark:text-gray-300 font-semibold">
                  About Me
                  <textarea
                    name="about"
                    value={profileForm.about}
                    onChange={handleInputChange}
                    rows={2}
                    className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 text-white"
                  />
                </label>
                <label className="block text-gray-700 dark:text-gray-300 font-semibold">
                  Avatar URL
                  <input
                    type="text"
                    name="avatar"
                    value={profileForm.avatar}
                    onChange={handleInputChange}
                    className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 text-white"
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
            <p className="text-center">No profile data available.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
