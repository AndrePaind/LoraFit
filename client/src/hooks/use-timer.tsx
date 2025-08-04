import { useState, useEffect, useRef } from "react";

interface UseTimerProps {
  duration: number; // in seconds
  onComplete?: () => void;
}

export function useTimer({ duration, onComplete }: UseTimerProps) {
  const [timeRemaining, setTimeRemaining] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = () => {
    setIsRunning(true);
    setTimeRemaining(duration);
    setIsCompleted(false);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resumeTimer = () => {
    setIsRunning(true);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeRemaining(duration);
    setIsCompleted(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  useEffect(() => {
    if (isRunning && timeRemaining > 0) {
      intervalRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            setIsRunning(false);
            setIsCompleted(true);
            if (onComplete) {
              onComplete();
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeRemaining, onComplete]);

  // Reset timer when duration changes
  useEffect(() => {
    resetTimer();
  }, [duration]);

  return {
    timeRemaining,
    isRunning,
    isCompleted,
    startTimer,
    pauseTimer,
    resumeTimer,
    resetTimer,
  };
}
