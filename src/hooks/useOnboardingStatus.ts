import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getUserByEmail } from '../lib/supabase';

export const useOnboardingStatus = () => {
  const { user } = useAuth();
  const [profileCompleted, setProfileCompleted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      if (!user?.email) {
        setLoading(false);
        return;
      }
      try {
        const userData = await getUserByEmail(user.email);
        setProfileCompleted(userData?.profile_completed || false);
      } catch (error) {
        console.error('Error checking onboarding status:', error);
        setProfileCompleted(false);
      } finally {
        setLoading(false);
      }
    };
    checkOnboardingStatus();
  }, [user?.email]);

  return { profileCompleted, loading };
}; 