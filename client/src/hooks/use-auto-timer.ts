import { useState, useEffect, useRef } from 'react';

interface UseAutoTimerProps {
  duration: number;
  exerciseId?: string;
  onComplete: () => void;
  onCountdown?: (seconds: number) => void;
}

export function useAutoTimer({ duration, exerciseId, onComplete, onCountdown }: UseAutoTimerProps) {
  const [timeRemaining, setTimeRemaining] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const onCompleteRef = useRef(onComplete);
  const onCountdownRef = useRef(onCountdown);

  // Update refs when callbacks change
  useEffect(() => {
    onCompleteRef.current = onComplete;
    onCountdownRef.current = onCountdown;
  }, [onComplete, onCountdown]);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Initialize audio context
  useEffect(() => {
    const initAudio = async () => {
      try {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      } catch (error) {
        console.log('Audio not available');
      }
    };
    initAudio();

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  // Play countdown beep sound
  const playBeep = (frequency = 800, duration = 200) => {
    if (!audioContextRef.current) return;
    
    try {
      const oscillator = audioContextRef.current.createOscillator();
      const gainNode = audioContextRef.current.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContextRef.current.destination);
      
      oscillator.frequency.value = frequency;
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.3, audioContextRef.current.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + duration / 1000);
      
      oscillator.start(audioContextRef.current.currentTime);
      oscillator.stop(audioContextRef.current.currentTime + duration / 1000);
    } catch (error) {
      console.log('Could not play sound');
    }
  };

  const startTimer = () => {
    setIsRunning(true);
    setIsCompleted(false);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resumeTimer = () => {
    if (!isCompleted && timeRemaining > 0) {
      setIsRunning(true);
    }
  };

  const resetTimer = () => {
    setTimeRemaining(duration);
    setIsRunning(false);
    setIsCompleted(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  useEffect(() => {
    if (isRunning && timeRemaining > 0) {
      intervalRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          const newTime = prev - 1;
          
          // Countdown sound notifications (3-2-1)
          if (newTime === 3 || newTime === 2 || newTime === 1) {
            playBeep(newTime === 1 ? 1000 : 800, 150);
            onCountdownRef.current?.(newTime);
          }
          
          if (newTime <= 0) {
            console.log('⏰ TIMER: Timer reached 0, stopping and calling onComplete in 1 second');
            setIsRunning(false);
            setIsCompleted(true);
            // Play completion sound
            setTimeout(() => playBeep(1200, 300), 100);
            setTimeout(() => {
              console.log('⏰ TIMER: Calling onComplete now');
              onCompleteRef.current?.();
            }, 1000); // Auto-advance after 1 second
            return 0;
          }
          
          return newTime;
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
  }, [isRunning, timeRemaining]);

  useEffect(() => {
    console.log('🔄 TIMER RESET: Duration:', duration, 'Exercise ID:', exerciseId);
    setTimeRemaining(duration);
    setIsCompleted(false);
    setIsRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, [duration, exerciseId]);

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