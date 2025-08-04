import { useQuery, useMutation } from "@tanstack/react-query";
import { type User } from "@shared/schema";
import BottomNavigation from "@/components/bottom-navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User as UserIcon, Baby, Target, Calendar } from "lucide-react";
import { useState } from "react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function Profile() {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [pregnancyWeek, setPregnancyWeek] = useState("");
  const [dailyGoal, setDailyGoal] = useState("");

  const { data: user } = useQuery<User>({
    queryKey: ["/api/user"],
    onSuccess: (data) => {
      if (data) {
        setPregnancyWeek(data.pregnancyWeek.toString());
        setDailyGoal(data.dailyGoal.toString());
      }
    }
  });

  const updateUserMutation = useMutation({
    mutationFn: async (updates: Partial<User>) => {
      const response = await apiRequest("PATCH", "/api/user", updates);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/user"] });
      setIsEditing(false);
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSave = () => {
    const updates = {
      pregnancyWeek: parseInt(pregnancyWeek),
      dailyGoal: parseInt(dailyGoal),
    };
    updateUserMutation.mutate(updates);
  };

  const handleCancel = () => {
    if (user) {
      setPregnancyWeek(user.pregnancyWeek.toString());
      setDailyGoal(user.dailyGoal.toString());
    }
    setIsEditing(false);
  };

  if (!user) {
    return (
      <div className="max-w-sm mx-auto bg-white min-h-screen shadow-xl">
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-sage-500"></div>
        </div>
      </div>
    );
  }

  const trimesterInfo = {
    1: { name: "First Trimester", range: "1-12 weeks", color: "bg-peach-100 text-peach-700" },
    2: { name: "Second Trimester", range: "13-26 weeks", color: "bg-sage-100 text-sage-700" },
    3: { name: "Third Trimester", range: "27-40 weeks", color: "bg-lavender-100 text-lavender-700" },
  };

  const currentTrimester = user.pregnancyWeek <= 12 ? 1 : user.pregnancyWeek <= 26 ? 2 : 3;
  const trimester = trimesterInfo[currentTrimester as keyof typeof trimesterInfo];

  return (
    <div className="max-w-sm mx-auto bg-white min-h-screen shadow-xl relative">
      {/* Header */}
      <header className="bg-gradient-to-r from-sage-400 to-sage-500 px-6 py-8 text-white">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <UserIcon className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold">{user.username}</h1>
            <p className="text-sage-50 text-sm">Mama-to-be</p>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="p-6 pb-24 space-y-6">
        {/* Pregnancy Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Baby className="w-5 h-5 text-sage-500" />
              <span>Pregnancy Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="pregnancyWeek">Current Week</Label>
              {isEditing ? (
                <Input
                  id="pregnancyWeek"
                  type="number"
                  min="1"
                  max="42"
                  value={pregnancyWeek}
                  onChange={(e) => setPregnancyWeek(e.target.value)}
                  className="w-20"
                />
              ) : (
                <span className="font-semibold">{user.pregnancyWeek} weeks</span>
              )}
            </div>
            
            <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${trimester.color}`}>
              {trimester.name} ({trimester.range})
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-sage-400 to-sage-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${Math.min((user.pregnancyWeek / 40) * 100, 100)}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 text-center">
              {40 - user.pregnancyWeek} weeks to go
            </p>
          </CardContent>
        </Card>

        {/* Goals */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-peach-500" />
              <span>Daily Goals</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <Label htmlFor="dailyGoal">Sessions per day</Label>
              {isEditing ? (
                <Input
                  id="dailyGoal"
                  type="number"
                  min="1"
                  max="10"
                  value={dailyGoal}
                  onChange={(e) => setDailyGoal(e.target.value)}
                  className="w-20"
                />
              ) : (
                <span className="font-semibold">{user.dailyGoal} sessions</span>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Account Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-lavender-500" />
              <span>Account Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Username</span>
                <span className="font-medium">{user.username}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Member since</span>
                <span className="font-medium">
                  {new Date(user.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          {isEditing ? (
            <div className="flex space-x-3">
              <Button 
                onClick={handleSave}
                disabled={updateUserMutation.isPending}
                className="flex-1 bg-sage-500 hover:bg-sage-600"
              >
                {updateUserMutation.isPending ? "Saving..." : "Save Changes"}
              </Button>
              <Button 
                onClick={handleCancel}
                variant="outline"
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          ) : (
            <Button 
              onClick={() => setIsEditing(true)}
              className="w-full bg-sage-500 hover:bg-sage-600"
            >
              Edit Profile
            </Button>
          )}
        </div>

        {/* Safety Notice */}
        <div className="bg-peach-50 border border-peach-200 rounded-lg p-4">
          <h3 className="font-semibold text-gray-800 mb-2">Important Safety Notice</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            Always consult with your healthcare provider before starting any exercise program during pregnancy. 
            This app is designed to complement, not replace, professional medical advice.
          </p>
        </div>
      </main>

      <BottomNavigation currentPage="profile" />
    </div>
  );
}
