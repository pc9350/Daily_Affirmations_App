import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define the progress state shape
interface ProgressState {
  xp: number;
  level: number;
  streak: number;
  lastCheckIn: number;
}

// Define the context value shape (state + functions)
interface ProgressContextValue extends ProgressState {
  gainXP: (amount: number) => boolean;
  checkIn: () => void;
}

// Create the context with a default undefined value
const ProgressContext = createContext<ProgressContextValue | undefined>(undefined);

// Calculate level from XP
const calculateLevel = (xp: number): number => Math.floor(xp / 100) + 1;

// Props for the provider component
interface ProgressProviderProps {
  children: ReactNode;
}

// The provider component
export const ProgressProvider = ({ children }: ProgressProviderProps) => {
  // Initialize state from storage or with defaults
  const [progress, setProgress] = useState<ProgressState>({
    xp: 0,
    level: 1,
    streak: 0,
    lastCheckIn: 0,
  });

  // Load saved progress from storage on mount
  useEffect(() => {
    const loadProgress = async () => {
      try {
        // TODO: Implement actual storage logic when backend is ready
        // For now just use the default values
      } catch (error) {
        console.error('Failed to load progress:', error);
      }
    };

    loadProgress();
  }, []);

  // Save progress when it changes
  useEffect(() => {
    const saveProgress = async () => {
      try {
        // TODO: Implement actual storage logic when backend is ready
      } catch (error) {
        console.error('Failed to save progress:', error);
      }
    };

    saveProgress();
  }, [progress]);

  // Function to gain XP and update level if needed
  const gainXP = (amount: number): boolean => {
    const newXP = progress.xp + amount;
    const oldLevel = progress.level;
    const newLevel = calculateLevel(newXP);
    const leveledUp = newLevel > oldLevel;

    setProgress(prev => ({
      ...prev,
      xp: newXP,
      level: newLevel,
    }));

    return leveledUp;
  };

  // Function to handle daily check-in
  const checkIn = () => {
    const now = Date.now();
    const oneDayMs = 24 * 60 * 60 * 1000;
    
    // Check if more than 24h since last check-in
    const timeSinceLastCheckIn = progress.lastCheckIn > 0 ? now - progress.lastCheckIn : oneDayMs + 1;
    const shouldResetStreak = timeSinceLastCheckIn > oneDayMs;
    
    setProgress(prev => ({
      ...prev,
      streak: shouldResetStreak ? 1 : prev.streak + 1,
      lastCheckIn: now,
    }));
    
    // Gain 10 XP for checking in
    gainXP(10);
  };

  const value: ProgressContextValue = {
    ...progress,
    gainXP,
    checkIn,
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
};

// Custom hook to use the progress context
export const useProgress = (): ProgressContextValue => {
  const context = useContext(ProgressContext);
  
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  
  return context;
}; 