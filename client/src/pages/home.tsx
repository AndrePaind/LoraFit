import { useQuery } from "@tanstack/react-query";
import { Heart } from "lucide-react";
import { type User, type WorkoutSession, type Exercise } from "@shared/schema";
import SessionSelector from "@/components/session-selector";
import ExerciseCard from "@/components/exercise-card";

export default function Home() {
  const { data: user } = useQuery<User>({
    queryKey: ["/api/user"],
  });

  const { data: todaySessions = [] } = useQuery<WorkoutSession[]>({
    queryKey: ["/api/sessions/today"],
  });

  const { data: exercises = [], isLoading } = useQuery<Exercise[]>({
    queryKey: ["/api/exercises"],
  });

  const progressPercentage = user ? Math.round((todaySessions.length / user.dailyGoal) * 100) : 0;
  const strokeDashoffset = 251.2 - (251.2 * progressPercentage) / 100;

  return (
    <div className="max-w-sm mx-auto bg-white min-h-screen shadow-xl">
      {/* Header */}
      <header className="px-6 py-8 text-white relative overflow-hidden" style={{ background: 'linear-gradient(to right, #8bb4a1, #7aa693)' }}>
        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -translate-y-8 translate-x-8"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-5 rounded-full translate-y-8 -translate-x-8"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-semibold text-gray-800">Hi Lora! 💕</h1>
            <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <Heart className="w-5 h-5 text-gray-800" />
            </div>
          </div>
          <p className="text-gray-800 text-sm leading-relaxed">Safe prenatal exercises for you and baby girl</p>
          
          {user && (
            <div className="mt-4 bg-white bg-opacity-15 rounded-lg p-3">
              <div className="text-xs text-gray-700 mb-1">Your Journey</div>
              <div className="flex items-center">
                <span className="text-lg font-medium text-gray-800">{user.pregnancyWeek} weeks</span>
                <div className="ml-2 flex-1 bg-white bg-opacity-20 h-2 rounded-full">
                  <div 
                    className="bg-gray-800 h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${Math.min((user.pregnancyWeek / 40) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6 pb-8">
        {/* Session Selector */}
        <section className="mb-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Choose Your Session</h2>
            <p className="text-gray-600 text-base leading-relaxed">Pick a duration that feels right for you and baby girl today</p>
          </div>
          <SessionSelector />
        </section>

        {/* Today's Progress */}
        <section className="mb-8">
          <div className="bg-gradient-to-r from-sage-50 to-lavender-50 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Today's Progress</h3>
              <div className="text-2xl">🌸</div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <div className="text-sm text-gray-600 mb-2">Sessions Completed</div>
                <div className="flex items-center">
                  <span className="text-2xl font-bold text-sage-600">{todaySessions.length}</span>
                  <span className="text-gray-500 text-sm ml-1">/ {user?.dailyGoal || 1} goal</span>
                </div>
              </div>
              
              <div className="w-16 h-16 relative">
                <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" stroke="#E5E7EB" strokeWidth="8" fill="none"/>
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="40" 
                    stroke="var(--sage-400)" 
                    strokeWidth="8" 
                    fill="none"
                    strokeDasharray="251.2" 
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    className="transition-all duration-500"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm font-semibold text-sage-600">{progressPercentage}%</span>
                </div>
              </div>
            </div>
            
            <div className="mt-4 flex space-x-2">
              {Array.from({ length: user?.dailyGoal || 1 }).map((_, index) => (
                <div 
                  key={index}
                  className={`w-3 h-3 rounded-full ${
                    index < todaySessions.length ? 'bg-sage-400' : 'bg-gray-200'
                  }`}
                ></div>
              ))}
            </div>
          </div>
        </section>

        

        {/* Exercise Library */}
        <section className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Exercise Library</h3>
          <p className="text-gray-600 text-sm mb-6">Safe prenatal exercises for every stage</p>
          
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sage-500"></div>
            </div>
          ) : (
            <div className="space-y-4">
              {exercises.map(exercise => (
                <ExerciseCard key={exercise.id} exercise={exercise} />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
