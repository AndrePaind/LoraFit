// Import your provided exercise images
import groundingImage from "@assets/1_Grounding YOursefl_1754348100313.png";
import catCowImage from "@assets/2_Cat and Cow_1754348100312.png";
import hipStretchImage from "@assets/3_ Hip Stretch_1754348100310.png";
import lungesImage from "@assets/4_ Lounges_1754348100309.png";
import squatsImage from "@assets/5_ Squats_1754348100308.png";
import windmillImage from "@assets/6_WindMills_1754348100307.png";
import childPoseImage from "@assets/7_ Child Pose_1754348100306.png";

interface ExerciseIllustrationProps {
  exerciseId: string;
  className?: string;
}

export const ExerciseIllustration = ({ exerciseId, className = "" }: ExerciseIllustrationProps) => {
  const exerciseImages: Record<string, string> = {
    "1": groundingImage,
    "2": catCowImage,
    "3": hipStretchImage,
    "4": lungesImage,
    "5": squatsImage,
    "6": windmillImage,
    "7": childPoseImage,
  };

  const imageUrl = exerciseImages[exerciseId];
  
  if (!imageUrl) {
    // Default illustration for exercises without specific images
    return (
      <div className={`bg-gradient-to-br from-sage-100 to-lavender-100 rounded-lg flex items-center justify-center ${className}`}>
        <div className="text-sage-600 text-2xl">🧘‍♀️</div>
      </div>
    );
  }

  return (
    <div className={`bg-gradient-to-br from-cream to-sage-50 rounded-lg p-2 ${className}`}>
      <img 
        src={imageUrl} 
        alt={`Exercise ${exerciseId} illustration`}
        className="w-full h-full object-contain rounded-md"
      />
    </div>
  );
};