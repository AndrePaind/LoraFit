import { Clock, BarChart3 } from "lucide-react";
import { type Exercise } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExerciseIllustration } from "./exercise-illustrations";

interface ExerciseCardProps {
  exercise: Exercise;
}

export default function ExerciseCard({ exercise }: ExerciseCardProps) {
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    if (minutes > 0) {
      return remainingSeconds > 0 ? `${minutes}m ${remainingSeconds}s` : `${minutes}m`;
    }
    return `${remainingSeconds}s`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-rose-100 text-rose-700';
      case 'intermediate': return 'bg-blush-100 text-blush-600';
      case 'advanced': return 'bg-red-100 text-red-700';
      default: return 'bg-mauve-100 text-mauve-600';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'breathing': return 'bg-blush-100 text-blush-600';
      case 'stretching': return 'bg-rose-100 text-rose-700';
      case 'strength': return 'bg-peach-100 text-peach-600';
      case 'relaxation': return 'bg-mauve-100 text-mauve-600';
      default: return 'bg-rose-100 text-rose-600';
    }
  };

  const handleTryExercise = () => {
    // Create a single-exercise session
    window.location.href = `/workout/single?exercise=${exercise.id}`;
  };

  return (
    <Card className="glass-card smooth-transition hover:shadow-lg hover:scale-[1.02] border-rose-200">
      <CardContent className="p-4">
        {/* Exercise Illustration */}
        <div className="mb-4">
          <ExerciseIllustration exerciseId={exercise.id} className="h-32 w-full" />
        </div>
        
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-semibold text-contrast text-lg leading-tight pr-2">
            {exercise.name}
          </h3>
          <div className="flex space-x-1">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(exercise.category)}`}>
              {exercise.category}
            </span>
          </div>
        </div>
        
        <p className="text-sm text-contrast-light mb-4 leading-relaxed">
          {exercise.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-xs text-contrast-light">
            <div className="flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span>{formatDuration(exercise.duration)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <BarChart3 className="w-3 h-3" />
              <span className={`px-2 py-1 rounded-full font-medium ${getDifficultyColor(exercise.difficulty)}`}>
                {exercise.difficulty}
              </span>
            </div>
          </div>
          
          <Button 
            onClick={handleTryExercise}
            size="sm"
            className="bg-sage-400 hover:bg-sage-500 text-white"
          >
            Try Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
