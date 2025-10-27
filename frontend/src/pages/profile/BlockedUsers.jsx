import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import useGetBlockedUsers from "../../hooks/useGetBlockedUsers";
import useUnblockUser from "../../hooks/useUnblockUser";

const BlockedUsers = () => {
  const navigate = useNavigate();
  const { loading, users, refresh } = useGetBlockedUsers();
  const { loading: unblocking, unblockUser } = useUnblockUser();

  const handleUnblock = async (id) => {
    const ok = await unblockUser(id);
    if (ok) refresh();
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <div className="w-full max-w-xl rounded-lg bg-gray-300 dark:bg-gray-900/60 backdrop-filter backdrop-blur-md bg-opacity-40 shadow-lg p-8 relative">
        <IoIosArrowBack className="absolute top-6 left-5 cursor-pointer h-[25px] w-[25px] text-gray-700" onClick={() => navigate('/chat')} />
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Blocked users</h2>
        {loading ? (
          <div className="flex justify-center py-8"><span className="loading loading-spinner"></span></div>
        ) : users.length === 0 ? (
          <p className="text-gray-700 dark:text-gray-300">You haven&apos;t blocked anyone.</p>
        ) : (
          <ul className="space-y-3">
            {users.map((u) => (
              <li key={u._id} className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <img src={u.profilePic || `https://ui-avatars.com/api/?name=${encodeURIComponent(u.fullName || u.username)}&background=0D8ABC&color=fff&rounded=true&size=64`} alt={u.username} className="w-10 h-10 rounded-full" />
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">{u.fullName || u.username}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">@{u.username}</div>
                  </div>
                </div>
                <button
                  className="px-3 py-1 bg-blue-600 text-white rounded disabled:opacity-50"
                  disabled={unblocking}
                  onClick={() => handleUnblock(u._id)}
                >
                  {unblocking ? '...' : 'Unblock'}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default BlockedUsers;
