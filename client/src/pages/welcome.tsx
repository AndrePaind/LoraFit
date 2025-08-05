import { Heart } from "lucide-react";
import { useLocation } from "wouter";

export default function Welcome() {
  const [, setLocation] = useLocation();

  const handleHeartClick = () => {
    setLocation("/home");
  };

  return (
    <div className="max-w-sm mx-auto min-h-screen safe-area-inset bg-gradient-to-br from-rose-500 via-rose-400 to-blush-400 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-10 right-10 w-24 h-24 bg-white opacity-10 rounded-full animate-pulse"></div>
      <div className="absolute bottom-20 left-8 w-16 h-16 bg-white opacity-5 rounded-full animate-pulse delay-1000"></div>
      <div className="absolute top-1/3 left-6 w-8 h-8 bg-white opacity-15 rounded-full animate-pulse delay-500"></div>
      <div className="absolute bottom-1/3 right-12 w-12 h-12 bg-white opacity-8 rounded-full animate-pulse delay-700"></div>
      
      {/* Main content */}
      <div className="text-center z-10 px-8">
        <h1 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">
          Welcome Lora!
        </h1>
        
        <p className="text-white text-lg mb-8 opacity-90 leading-relaxed">
          Ready for your prenatal wellness journey with baby girl?
        </p>
        
        {/* Interactive Heart */}
        <div 
          onClick={handleHeartClick}
          className="cursor-pointer transform transition-all duration-300 hover:scale-110 active:scale-95 mb-8"
        >
          <div className="w-32 h-32 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm shadow-2xl hover:bg-opacity-30 transition-all duration-300 mx-auto animate-pulse">
            <Heart 
              className="w-16 h-16 text-white drop-shadow-lg" 
              fill="white"
            />
          </div>
        </div>
        
        <p className="text-white text-sm opacity-75 animate-bounce">
          Tap the heart to continue
        </p>
      </div>
      
      {/* Bottom decorative gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black opacity-10"></div>
    </div>
  );
}