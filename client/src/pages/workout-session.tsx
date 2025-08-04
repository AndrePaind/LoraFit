import { useQuery, useMutation } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { useState, useEffect } from "react";
import { type Exercise } from "@shared/schema";
import ExerciseTimer from "@/components/exercise-timer";
import { Button } from "@/components/ui/button";
import { X, ArrowLeft } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function WorkoutSession() {
  const { toast } = useToast();
  const [, params] = useRoute("/workout/:duration");
  const duration = parseInt(params?.duration || "10");
  
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [sessionExercises, setSessionExercises] = useState<Exercise[]>([]);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [sessionStarted, setSessionStarted] = useState(false);

  const { data: allExercises = [] } = useQuery<Exercise[]>({
    queryKey: ["/api/exercises"],
  });

  const createSessionMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", "/api/sessions", {
        duration,
        exercisesCompleted: 0,
      });
      return response.json();
    },
    onSuccess: (session) => {
      setSessionId(session.id);
      setSessionStarted(true);
    },
  });

  const completeSessionMutation = useMutation({
    mutationFn: async (exercisesCompleted: number) => {
      if (!sessionId) return;
      const response = await apiRequest("PATCH", `/api/sessions/${sessionId}`, {
        exercisesCompleted,
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/sessions"] });
      queryClient.invalidateQueries({ queryKey: ["/api/sessions/today"] });
      toast({
        title: "Amazing work, Lora! 🎉",
        description: "You and baby girl did great today!",
      });
    },
  });

  // Generate exercise list - include ALL exercises for every session
  useEffect(() => {
    if (allExercises.length > 0) {
      // Always include all 7 exercises in the same order
      setSessionExercises([...allExercises]);
    }
  }, [allExercises, duration]);

  const startSession = () => {
    createSessionMutation.mutate();
  };

  const handleExerciseComplete = () => {
    if (currentExerciseIndex < sessionExercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    } else {
      // Session completed
      completeSessionMutation.mutate(sessionExercises.length);
      // Navigate back to home
      window.location.href = "/";
    }
  };

  const handleSkipExercise = () => {
    handleExerciseComplete();
  };

  const handleExitSession = () => {
    if (sessionStarted && sessionId) {
      completeSessionMutation.mutate(currentExerciseIndex);
    }
    window.location.href = "/";
  };

  const currentExercise = sessionExercises[currentExerciseIndex];
  const progress = sessionExercises.length > 0 ? ((currentExerciseIndex + 1) / sessionExercises.length) * 100 : 0;

  if (!sessionStarted) {
    return (
      <div className="max-w-sm mx-auto bg-white min-h-screen shadow-xl relative">
        {/* Header */}
        <header className="bg-gradient-to-r from-sage-400 to-sage-500 px-6 py-8 text-white relative">
          <button 
            onClick={() => window.location.href = "/"}
            className="absolute top-6 left-6 w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="text-center">
            <h1 className="text-2xl font-semibold mb-2">Hi Lora! 💕</h1>
            <p className="text-sage-50 text-sm">Ready for your {duration}-minute session? You and baby girl are going to do great!</p>
          </div>
        </header>

        {/* Content */}
        <main className="p-6">
          {/* Start Session Button - moved to top */}
          <div className="mb-8">
            <Button 
              onClick={startSession}
              disabled={createSessionMutation.isPending || sessionExercises.length === 0}
              className="w-full bg-sage-500 hover:bg-sage-600 py-4 text-lg font-semibold"
            >
              {createSessionMutation.isPending ? "Starting..." : "Start Session"}
            </Button>
          </div>

          <div className="text-center mb-8">
            <div className="w-32 h-32 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl font-bold text-sage-600">{duration}</span>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Session Overview</h2>
            <p className="text-gray-600 mb-6">
              You'll be doing {sessionExercises.length} exercises for approximately {duration} minutes.
            </p>
          </div>

          {sessionExercises.length > 0 && (
            <div className="mb-8">
              <h3 className="font-semibold text-gray-800 mb-4">Exercises in this session:</h3>
              <div className="space-y-2">
                {sessionExercises.map((exercise, index) => (
                  <div key={exercise.id} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                    <span className="text-sm font-medium">{exercise.name}</span>
                    <span className="text-xs text-gray-500">{duration === 5 ? '43s' : '86s'}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="bg-peach-50 border border-peach-200 rounded-lg p-4">
            <p className="text-sm text-gray-600 text-center">
              Lora, remember to listen to your body and baby girl. Stay hydrated and take breaks whenever needed! 💕
            </p>
          </div>
        </main>
      </div>
    );
  }

  if (!currentExercise) {
    return (
      <div className="max-w-sm mx-auto bg-white min-h-screen shadow-xl flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-sage-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading exercises...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-sm mx-auto bg-white min-h-screen shadow-xl relative">
      {/* Header with progress */}
      <header className="bg-gradient-to-r from-sage-400 to-sage-500 px-6 py-6 text-white relative">
        <button 
          onClick={handleExitSession}
          className="absolute top-6 right-6 w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center"
        >
          <X className="w-4 h-4" />
        </button>
        
        <div className="text-center">
          <h1 className="text-lg font-semibold mb-2">Exercise {currentExerciseIndex + 1} of {sessionExercises.length}</h1>
          <div className="w-full bg-white bg-opacity-20 rounded-full h-2">
            <div 
              className="bg-white h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </header>

      {/* Exercise Timer */}
      <main className="flex-1">
        <ExerciseTimer
          exercise={currentExercise}
          onComplete={handleExerciseComplete}
          onSkip={handleSkipExercise}
          sessionDuration={duration}
        />
      </main>
    </div>
  );
}
