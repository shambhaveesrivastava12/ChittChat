import { useState, useEffect, useCallback } from 'react';

// Custom hook to fetch user profile data
// Returns: { profileData, loading }
const useGetUserProfileData = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchProfile = useCallback(async (signal) => {
    setLoading(true);
    const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

    try {
      const res = await fetch(`${API}/api/users/profile`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies in the request
        signal,
      });

      if (!res.ok) {
        throw new Error('Failed to fetch profile');
      }

      const data = await res.json();
      setProfileData(data);
    } catch (err) {
      if (err.name === 'AbortError') {
        return;
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    fetchProfile(controller.signal);
    return () => controller.abort();
  }, [fetchProfile]);

  return { profileData, loading };
};
export default useGetUserProfileData;