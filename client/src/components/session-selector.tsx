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
          <Button
            key={duration.value}
            onClick={() => handleStartSession(duration.value)}
            className="h-20 flex flex-col items-center justify-center bg-sage-500 hover:bg-sage-600 rounded-xl"
          >
            <div className="text-2xl font-bold text-white mb-1">
              {duration.label}
            </div>
            <div className="text-xs text-sage-100">minutes</div>
            <div className="text-xs text-sage-100 mt-1">{duration.subtitle}</div>
          </Button>
        ))}
      </div>
    </div>
  );
}
