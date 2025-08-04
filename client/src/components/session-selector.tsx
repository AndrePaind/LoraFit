import { Button } from "@/components/ui/button";

export default function SessionSelector() {
  const durations = [
    { value: 5, label: "5", subtitle: "Short" },
    { value: 10, label: "10", subtitle: "Extended" },
  ];

  const handleStartSession = (duration: number) => {
    window.location.href = `/workout/${duration}`;
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {durations.map((duration) => (
          <button
            key={duration.value}
            onClick={() => handleStartSession(duration.value)}
            className="group relative bg-gradient-to-br from-sage-400 to-sage-500 hover:from-sage-500 hover:to-sage-600 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            {/* Background decoration */}
            <div className="absolute top-2 right-2 w-8 h-8 bg-white bg-opacity-10 rounded-full"></div>
            <div className="absolute bottom-2 left-2 w-6 h-6 bg-white bg-opacity-5 rounded-full"></div>
            
            {/* Content */}
            <div className="relative z-10 text-center">
              <div className="text-3xl font-bold text-white mb-2">
                {duration.label}
              </div>
              <div className="text-sm text-white text-opacity-90 mb-1">
                minutes
              </div>
              <div className="text-xs text-white text-opacity-80 font-medium">
                {duration.subtitle}
              </div>
              
              {/* Icon */}
              <div className="mt-3 flex justify-center">
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center group-hover:bg-opacity-30 transition-all duration-300">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
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
