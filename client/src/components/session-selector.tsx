import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export default function SessionSelector() {
  const [, setLocation] = useLocation();
  
  const durations = [
    { value: 5, label: "5", subtitle: "Quick Flow" },
    { value: 10, label: "10", subtitle: "Gentle Session" },
  ];

  const handleStartSession = (duration: number) => {
    setLocation(`/workout/${duration}`);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {durations.map((duration) => (
          <button
            key={duration.value}
            onClick={() => handleStartSession(duration.value)}
            className="group relative glass-card bg-gradient-to-br from-rose-400 to-rose-500 hover:from-rose-500 hover:to-rose-600 rounded-2xl p-6 smooth-transition hover:scale-105 border-none"
          >
            {/* Background decoration */}
            <div className="absolute top-2 right-2 w-8 h-8 bg-white bg-opacity-15 rounded-full"></div>
            <div className="absolute bottom-2 left-2 w-6 h-6 bg-white bg-opacity-10 rounded-full"></div>
            
            {/* Content */}
            <div className="relative z-10 text-center text-white">
              <div className="text-4xl font-bold mb-2 drop-shadow-sm">
                {duration.label}
              </div>
              <div className="text-sm mb-1 font-medium opacity-90">
                minutes
              </div>
              <div className="text-xs font-semibold tracking-wide uppercase opacity-80">
                {duration.subtitle}
              </div>
              
              {/* Icon */}
              <div className="mt-4 flex justify-center">
                <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center group-hover:bg-opacity-30 smooth-transition backdrop-blur-sm">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
