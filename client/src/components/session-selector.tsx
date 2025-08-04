import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function SessionSelector() {
  const [selectedDuration, setSelectedDuration] = useState<number | null>(null);

  const durations = [
    { value: 5, label: "5", subtitle: "Quick Start" },
    { value: 10, label: "10", subtitle: "Balanced" },
    { value: 15, label: "15", subtitle: "Extended" },
  ];

  const handleStartSession = () => {
    if (selectedDuration) {
      window.location.href = `/workout/${selectedDuration}`;
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        {durations.map((duration) => (
          <button
            key={duration.value}
            onClick={() => setSelectedDuration(duration.value)}
            className={`rounded-xl p-4 text-center transition-all duration-200 border-2 relative ${
              selectedDuration === duration.value
                ? "border-sage-400 bg-sage-100"
                : "border-gray-200 bg-gray-50 hover:border-gray-300 hover:bg-gray-100"
            }`}
          >
            <div className={`text-2xl font-bold mb-1 ${
              selectedDuration === duration.value ? "text-sage-600" : "text-gray-700"
            }`}>
              {duration.label}
            </div>
            <div className="text-xs text-gray-600">minutes</div>
            <div className="text-xs text-gray-500 mt-1">{duration.subtitle}</div>
            
            {selectedDuration === duration.value && (
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-peach-400 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>
      
      {selectedDuration && (
        <Button 
          onClick={handleStartSession}
          className="w-full bg-sage-500 hover:bg-sage-600 py-3 text-lg"
        >
          Start {selectedDuration} Minute Session
        </Button>
      )}
    </div>
  );
}
