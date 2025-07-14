import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

export const useWelcomeLetter = () => {
  const [showWelcomeLetter, setShowWelcomeLetter] = useState(false);
  const { user } = useAuth();

  // Verificar se é a primeira vez que a usuária acessa o app
  useEffect(() => {
    if (user && user.profile_completed) {
      const hasSeenWelcomeLetter = localStorage.getItem('welcomeLetterSeen');
      if (!hasSeenWelcomeLetter) {
        setShowWelcomeLetter(true);
      }
    }
  }, [user]);

  const closeWelcomeLetter = () => {
    setShowWelcomeLetter(false);
    localStorage.setItem('welcomeLetterSeen', 'true');
  };

  const showWelcomeLetterAgain = () => {
    setShowWelcomeLetter(true);
  };

  return {
    showWelcomeLetter,
    closeWelcomeLetter,
    showWelcomeLetterAgain,
  };
}; 