import { useQuery } from "@tanstack/react-query";
import { type User, type WorkoutSession } from "@shared/schema";
import BottomNavigation from "@/components/bottom-navigation";
import { Calendar, Clock, Target, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Progress() {
  const { data: user } = useQuery<User>({
    queryKey: ["/api/user"],
  });

  const { data: sessions = [] } = useQuery<WorkoutSession[]>({
    queryKey: ["/api/sessions"],
  });

  const { data: todaySessions = [] } = useQuery<WorkoutSession[]>({
    queryKey: ["/api/sessions/today"],
  });

  // Calculate stats
  const totalSessions = sessions.length;
  const totalMinutes = sessions.reduce((sum, session) => sum + session.duration, 0);
  const averagePerWeek = Math.round((totalSessions / 4) * 10) / 10; // Assuming last 4 weeks
  const currentStreak = todaySessions.length > 0 ? 1 : 0; // Simplified streak calculation

  // Group sessions by date for the last 7 days
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return date;
  }).reverse();

  const sessionsByDate = last7Days.map(date => {
    const dateStr = date.toDateString();
    const daySessions = sessions.filter(session => 
      new Date(session.completedAt).toDateString() === dateStr
    );
    return {
      date: dateStr,
      count: daySessions.length,
      totalMinutes: daySessions.reduce((sum, session) => sum + session.duration, 0)
    };
  });

  return (
    <div className="max-w-sm mx-auto bg-white min-h-screen shadow-xl relative">
      {/* Header */}
      <header className="bg-gradient-to-r from-sage-400 to-sage-500 px-6 py-8 text-white">
        <h1 className="text-2xl font-semibold mb-2">Your Progress</h1>
        <p className="text-sage-50 text-sm">Track your prenatal fitness journey</p>
      </header>

      {/* Content */}
      <main className="p-6 pb-24 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Target className="w-5 h-5 text-sage-500" />
                <div>
                  <p className="text-xs text-gray-600">Total Sessions</p>
                  <p className="text-lg font-bold text-gray-800">{totalSessions}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-peach-500" />
                <div>
                  <p className="text-xs text-gray-600">Total Minutes</p>
                  <p className="text-lg font-bold text-gray-800">{totalMinutes}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-lavender-500" />
                <div>
                  <p className="text-xs text-gray-600">Weekly Average</p>
                  <p className="text-lg font-bold text-gray-800">{averagePerWeek}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-sage-600" />
                <div>
                  <p className="text-xs text-gray-600">Current Streak</p>
                  <p className="text-lg font-bold text-gray-800">{currentStreak}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Weekly Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Last 7 Days</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {sessionsByDate.map((day, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    {new Date(day.date).toLocaleDateString('en', { weekday: 'short', month: 'short', day: 'numeric' })}
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="text-sm font-medium">{day.count} sessions</div>
                    <div className="w-8 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-sage-400 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min((day.count / 3) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pregnancy Progress */}
        {user && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Pregnancy Journey</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-3xl font-bold text-sage-600 mb-2">{user.pregnancyWeek} weeks</div>
                <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                  <div 
                    className="bg-gradient-to-r from-sage-400 to-sage-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min((user.pregnancyWeek / 40) * 100, 100)}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600">
                  {40 - user.pregnancyWeek} weeks to go
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Motivational Message */}
        <div className="bg-gradient-to-r from-peach-50 to-lavender-50 rounded-xl p-4 text-center">
          <h3 className="font-semibold text-gray-800 mb-2">Keep it up! 🌟</h3>
          <p className="text-sm text-gray-600">
            Every session brings you closer to a healthier pregnancy and delivery. 
            You're doing great!
          </p>
        </div>
      </main>

      <BottomNavigation currentPage="progress" />
    </div>
  );
}
