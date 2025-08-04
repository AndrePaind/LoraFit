import { useState } from "react";
import { Play, Pause, SkipForward } from "lucide-react";
import { type Exercise } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { useTimer } from "@/hooks/use-timer";
import { ExerciseIllustration } from "./exercise-illustrations";

interface ExerciseTimerProps {
  exercise: Exercise;
  onComplete: () => void;
  onSkip: () => void;
}

export default function ExerciseTimer({ exercise, onComplete, onSkip }: ExerciseTimerProps) {
  const [hasStarted, setHasStarted] = useState(false);
  
  const { 
    timeRemaining, 
    isRunning, 
    isCompleted, 
    startTimer, 
    pauseTimer, 
    resumeTimer 
  } = useTimer({
    duration: exercise.duration,
    onComplete: () => {
      setTimeout(onComplete, 1000); // Small delay before moving to next exercise
    }
  });

  const handlePlayPause = () => {
    if (!hasStarted) {
      setHasStarted(true);
      startTimer();
    } else if (isRunning) {
      pauseTimer();
    } else {
      resumeTimer();
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = ((exercise.duration - timeRemaining) / exercise.duration) * 100;
  const strokeDasharray = 2 * Math.PI * 45; // circumference
  const strokeDashoffset = strokeDasharray - (strokeDasharray * progressPercentage) / 100;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-sage-500';
      case 'intermediate': return 'text-peach-500';
      case 'advanced': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="p-6 h-full flex flex-col">
      {/* Exercise Info */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">{exercise.name}</h2>
        <p className="text-gray-600 text-sm mb-4">{exercise.description}</p>
        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(exercise.difficulty)} bg-gray-100`}>
          {exercise.difficulty.charAt(0).toUpperCase() + exercise.difficulty.slice(1)}
        </span>
      </div>

      {/* Exercise Illustration */}
      <div className="mb-6">
        <ExerciseIllustration exerciseId={exercise.id} className="h-24 w-full" />
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
              stroke="var(--sage-400)" 
              strokeWidth="6" 
              fill="none"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-linear"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-gray-800">
              {formatTime(timeRemaining)}
            </span>
            <span className="text-xs text-gray-500">
              / {formatTime(exercise.duration)}
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center space-x-4 mb-8">
          <Button
            variant="outline"
            size="lg"
            onClick={onSkip}
            className="w-12 h-12 rounded-full p-0"
          >
            <SkipForward className="w-5 h-5" />
          </Button>
          
          <Button
            onClick={handlePlayPause}
            className="w-16 h-16 rounded-full bg-sage-500 hover:bg-sage-600 p-0"
            disabled={isCompleted}
          >
            {isRunning ? (
              <Pause className="w-6 h-6 text-white" />
            ) : (
              <Play className="w-6 h-6 text-white ml-1" />
            )}
          </Button>
          
          <div className="w-12 h-12"></div> {/* Spacer for symmetry */}
        </div>

        {/* Exercise Instructions */}
        <div className="bg-lavender-50 rounded-xl p-4 w-full">
          <h4 className="font-semibold text-gray-800 mb-2">Instructions</h4>
          <p className="text-sm text-gray-600 leading-relaxed">{exercise.instructions}</p>
        </div>

        {isCompleted && (
          <div className="mt-4 text-center">
            <p className="text-sage-600 font-medium">Exercise completed! 🎉</p>
            <p className="text-sm text-gray-500">Moving to next exercise...</p>
          </div>
        )}
      </div>
    </div>
  );
}
