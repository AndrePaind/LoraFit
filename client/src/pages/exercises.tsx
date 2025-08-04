import { useQuery } from "@tanstack/react-query";
import { type Exercise } from "@shared/schema";
import ExerciseCard from "@/components/exercise-card";
import BottomNavigation from "@/components/bottom-navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Exercises() {
  const { data: exercises = [], isLoading } = useQuery<Exercise[]>({
    queryKey: ["/api/exercises"],
  });

  const categories = ["all", "breathing", "stretching", "strength", "relaxation"];
  
  const filterExercises = (category: string) => {
    if (category === "all") return exercises;
    return exercises.filter(exercise => exercise.category === category);
  };

  if (isLoading) {
    return (
      <div className="max-w-sm mx-auto bg-white min-h-screen shadow-xl">
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-sage-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-sm mx-auto bg-white min-h-screen shadow-xl relative">
      {/* Header */}
      <header className="bg-gradient-to-r from-sage-400 to-sage-500 px-6 py-8 text-white">
        <h1 className="text-2xl font-semibold mb-2">Exercise Library</h1>
        <p className="text-sage-50 text-sm">Safe prenatal exercises for every stage</p>
      </header>

      {/* Content */}
      <main className="p-6 pb-24">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-6">
            {categories.map(category => (
              <TabsTrigger 
                key={category} 
                value={category}
                className="text-xs px-2"
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {categories.map(category => (
            <TabsContent key={category} value={category} className="space-y-4">
              {filterExercises(category).map(exercise => (
                <ExerciseCard key={exercise.id} exercise={exercise} />
              ))}
              {filterExercises(category).length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No exercises found in this category.
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </main>

      <BottomNavigation currentPage="exercises" />
    </div>
  );
}
