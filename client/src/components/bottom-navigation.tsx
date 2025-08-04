import { Home, Dumbbell, TrendingUp, User } from "lucide-react";
import { Link } from "wouter";

interface BottomNavigationProps {
  currentPage: "home" | "exercises" | "progress" | "profile";
}

export default function BottomNavigation({ currentPage }: BottomNavigationProps) {
  const navItems = [
    { id: "home", label: "Home", icon: Home, path: "/" },
    { id: "exercises", label: "Exercises", icon: Dumbbell, path: "/exercises" },
    { id: "progress", label: "Progress", icon: TrendingUp, path: "/progress" },
    { id: "profile", label: "Profile", icon: User, path: "/profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-sm bg-white border-t border-gray-200 px-6 py-3">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = currentPage === item.id;
          const Icon = item.icon;
          
          return (
            <Link key={item.id} href={item.path}>
              <button className={`flex flex-col items-center space-y-1 transition-colors duration-200 ${
                isActive ? "text-sage-500" : "text-gray-400 hover:text-sage-500"
              }`}>
                <Icon className="w-5 h-5" />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
