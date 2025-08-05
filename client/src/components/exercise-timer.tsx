import { useState, useEffect } from "react";
import { Play, Pause, SkipForward } from "lucide-react";
import { type Exercise } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { useAutoTimer } from "@/hooks/use-auto-timer";
import { ExerciseIllustration } from "./exercise-illustrations";

interface ExerciseTimerProps {
  exercise: Exercise;
  onComplete: () => void;
  onSkip: () => void;
  sessionDuration: number;
}

export default function ExerciseTimer({ exercise, onComplete, onSkip, sessionDuration }: ExerciseTimerProps) {
  const [hasStarted, setHasStarted] = useState(false);
  const [countdownNumber, setCountdownNumber] = useState<number | null>(null);
  const [showMidpointMessage, setShowMidpointMessage] = useState(false);
  
  // Calculate exercise duration based on session type
  const exerciseDuration = sessionDuration === 5 ? 40 : 80; // 5 min = 40s each, 10 min = 80s each

  // Create a callback that handles completion
  const handleTimerComplete = () => {
    onComplete();
  };
  
  const { 
    timeRemaining, 
    isRunning, 
    isCompleted, 
    startTimer,
    pauseTimer,
    resumeTimer,
    resetTimer
  } = useAutoTimer({
    duration: exerciseDuration,
    exerciseId: exercise.id, // Add exercise ID to force reset on exercise change
    onComplete: handleTimerComplete,
    onCountdown: (seconds) => {
      setCountdownNumber(seconds);
      // Clear countdown number after showing
      setTimeout(() => setCountdownNumber(null), 800);
    },
    onMidpoint: () => {
      setShowMidpointMessage(true);
      // Clear midpoint message after showing
      setTimeout(() => setShowMidpointMessage(false), 2000);
    }
  });

  // Auto-start the timer when exercise changes
  useEffect(() => {
    setHasStarted(true);
    setCountdownNumber(null);
    setShowMidpointMessage(false);
    
    // Start the timer immediately for new exercise
    const timer = setTimeout(() => {
      startTimer();
    }, 500); // Delay to ensure reset completes first

    return () => clearTimeout(timer);
  }, [exercise.id]);

  const handlePlayPause = () => {
    if (isRunning) {
      pauseTimer();
    } else {
      resumeTimer();
    }
  };

  const handleSkip = () => {
    onSkip();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = ((exerciseDuration - timeRemaining) / exerciseDuration) * 100;
  const strokeDasharray = 2 * Math.PI * 45; // circumference
  const strokeDashoffset = strokeDasharray - (strokeDasharray * progressPercentage) / 100;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-rose-600 bg-rose-100';
      case 'intermediate': return 'text-blush-600 bg-blush-100';
      case 'advanced': return 'text-red-600 bg-red-100';
      default: return 'text-mauve-600 bg-mauve-100';
    }
  };

  return (
    <div className="p-6 h-full flex flex-col safe-area-bottom">
      {/* Exercise Info */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold text-contrast mb-2">{exercise.name}</h2>
        <p className="text-contrast-light text-sm mb-4">{exercise.description}</p>
        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(exercise.difficulty)}`}>
          {exercise.difficulty.charAt(0).toUpperCase() + exercise.difficulty.slice(1)}
        </span>
      </div>

      {/* Exercise Illustration */}
      <div className="mb-6">
        <ExerciseIllustration exerciseId={exercise.id} className="h-40 w-full" />
      </div>

      {/* Timer */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="relative mb-8">
          <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 100 100">
            <circle 
              cx="50" 
              cy="50" 
              r="45" 
              stroke="#E5E7EB" 
              strokeWidth="6" 
              fill="none"
            />
            <circle 
              cx="50" 
              cy="50" 
              r="45" 
              stroke="hsl(340, 75%, 55%)" 
              strokeWidth="6" 
              fill="none"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-linear"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-contrast">
              {formatTime(timeRemaining)}
            </span>
            <span className="text-xs text-contrast-light">
              / {formatTime(exerciseDuration)}
            </span>
            {countdownNumber && (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-6xl font-bold text-rose-500 animate-pulse drop-shadow-sm">
                  {countdownNumber}
                </span>
              </div>
            )}
            {showMidpointMessage && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-rose-500 text-white px-4 py-2 rounded-lg shadow-lg animate-pulse">
                  <span className="text-sm font-semibold">Halfway! 💪</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-6 mb-8">
          <Button
            onClick={handlePlayPause}
            className="w-16 h-16 rounded-full bg-gradient-to-br from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 p-0 smooth-transition shadow-lg hover:shadow-xl border-none"
            disabled={isCompleted}
          >
            {isRunning ? (
              <Pause className="w-6 h-6 text-white" />
            ) : (
              <Play className="w-6 h-6 text-white ml-1" />
            )}
          </Button>
          
          <Button
            onClick={handleSkip}
            className="w-16 h-16 rounded-full bg-gradient-to-br from-peach-400 to-peach-500 hover:from-peach-500 hover:to-peach-600 p-0 smooth-transition shadow-lg hover:shadow-xl border-none"
            disabled={isCompleted}
          >
            <SkipForward className="w-6 h-6 text-white" />
          </Button>
        </div>
        
        {hasStarted && !isCompleted && (
          <div className="text-center mb-6">
            <p className="text-lg font-medium text-contrast">Keep going, Lora! 💪</p>
            <p className="text-sm text-contrast-light">
              {isRunning ? "Timer running - will auto-advance" : "Timer paused"}
            </p>
          </div>
        )}

        {/* Exercise Instructions */}
        <div className="glass-card rounded-xl p-4 w-full smooth-transition">
          <h4 className="font-semibold text-contrast mb-2">Instructions</h4>
          <p className="text-sm text-contrast-light leading-relaxed">{exercise.instructions}</p>
        </div>

        {isCompleted && (
          <div className="mt-4 text-center">
            <p className="text-rose-600 font-medium">Exercise completed! 🎉</p>
            <p className="text-sm text-contrast-light">Moving to next exercise...</p>
          </div>
        )}
      </div>
    </div>
  );
}
