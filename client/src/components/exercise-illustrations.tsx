// SVG illustrations for prenatal exercises
export const CatCowIllustration = () => (
  <svg viewBox="0 0 200 120" className="w-full h-24">
    <defs>
      <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#f3e8e8" />
        <stop offset="100%" stopColor="#e8d5d5" />
      </linearGradient>
    </defs>
    {/* Ground line */}
    <line x1="20" y1="100" x2="180" y2="100" stroke="#d1d5db" strokeWidth="2" />
    {/* Body in cat position */}
    <ellipse cx="100" cy="70" rx="40" ry="15" fill="url(#bodyGradient)" stroke="#b3b3b3" strokeWidth="1" />
    {/* Head */}
    <circle cx="70" cy="65" r="12" fill="url(#bodyGradient)" stroke="#b3b3b3" strokeWidth="1" />
    {/* Arms */}
    <line x1="80" y1="75" x2="80" y2="100" stroke="#d4a574" strokeWidth="4" strokeLinecap="round" />
    <line x1="120" y1="75" x2="120" y2="100" stroke="#d4a574" strokeWidth="4" strokeLinecap="round" />
    {/* Legs */}
    <line x1="85" y1="80" x2="85" y2="100" stroke="#d4a574" strokeWidth="4" strokeLinecap="round" />
    <line x1="115" y1="80" x2="115" y2="100" stroke="#d4a574" strokeWidth="4" strokeLinecap="round" />
    {/* Hair */}
    <path d="M 65 55 Q 70 50 75 55" fill="#8b6f47" />
    {/* Movement arrow */}
    <path d="M 100 45 Q 110 35 120 45" stroke="#8bb4a1" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" />
    <defs>
      <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#8bb4a1" />
      </marker>
    </defs>
  </svg>
);

export const BreathingIllustration = () => (
  <svg viewBox="0 0 200 120" className="w-full h-24">
    <defs>
      <radialGradient id="breathGradient" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#e0e7ff" />
        <stop offset="100%" stopColor="#c7d2fe" />
      </radialGradient>
    </defs>
    {/* Seated figure */}
    <rect x="85" y="70" width="30" height="40" rx="15" fill="url(#bodyGradient)" />
    {/* Head */}
    <circle cx="100" cy="50" r="15" fill="url(#bodyGradient)" stroke="#b3b3b3" strokeWidth="1" />
    {/* Hair */}
    <path d="M 90 40 Q 100 35 110 40" fill="#8b6f47" />
    {/* Arms in meditation pose */}
    <ellipse cx="70" cy="80" rx="8" ry="15" fill="#d4a574" transform="rotate(-20 70 80)" />
    <ellipse cx="130" cy="80" rx="8" ry="15" fill="#d4a574" transform="rotate(20 130 80)" />
    {/* Breath visualization */}
    <circle cx="100" cy="75" r="20" fill="url(#breathGradient)" opacity="0.6" />
    <circle cx="100" cy="75" r="15" fill="url(#breathGradient)" opacity="0.4" />
    <circle cx="100" cy="75" r="10" fill="url(#breathGradient)" opacity="0.3" />
    {/* Breath flow lines */}
    <path d="M 85 60 Q 100 55 115 60" stroke="#8bb4a1" strokeWidth="2" fill="none" opacity="0.7" />
    <path d="M 87 65 Q 100 62 113 65" stroke="#8bb4a1" strokeWidth="1.5" fill="none" opacity="0.5" />
  </svg>
);

export const WallPushUpIllustration = () => (
  <svg viewBox="0 0 200 120" className="w-full h-24">
    {/* Wall */}
    <rect x="20" y="10" width="8" height="100" fill="#e5e7eb" stroke="#d1d5db" strokeWidth="1" />
    {/* Ground */}
    <line x1="20" y1="110" x2="180" y2="110" stroke="#d1d5db" strokeWidth="2" />
    {/* Figure doing wall push-up */}
    <ellipse cx="110" cy="60" rx="25" ry="12" fill="url(#bodyGradient)" />
    {/* Head */}
    <circle cx="135" cy="55" r="10" fill="url(#bodyGradient)" stroke="#b3b3b3" strokeWidth="1" />
    {/* Arms */}
    <line x1="85" y1="55" x2="30" y2="45" stroke="#d4a574" strokeWidth="4" strokeLinecap="round" />
    <line x1="85" y1="65" x2="30" y2="55" stroke="#d4a574" strokeWidth="4" strokeLinecap="round" />
    {/* Legs */}
    <line x1="130" y1="70" x2="155" y2="110" stroke="#d4a574" strokeWidth="4" strokeLinecap="round" />
    <line x1="125" y1="70" x2="145" y2="110" stroke="#d4a574" strokeWidth="4" strokeLinecap="round" />
    {/* Hair */}
    <path d="M 130 48 Q 135 43 140 48" fill="#8b6f47" />
    {/* Movement arrow */}
    <path d="M 50 40 L 40 40" stroke="#f97316" strokeWidth="2" markerEnd="url(#arrowheadOrange)" />
    <defs>
      <marker id="arrowheadOrange" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#f97316" />
      </marker>
    </defs>
  </svg>
);

export const PelvicTiltIllustration = () => (
  <svg viewBox="0 0 200 120" className="w-full h-24">
    {/* Mat/ground */}
    <rect x="40" y="95" width="120" height="15" rx="7" fill="#e0e7ff" opacity="0.7" />
    {/* Figure lying down */}
    <ellipse cx="100" cy="75" rx="35" ry="15" fill="url(#bodyGradient)" />
    {/* Head */}
    <circle cx="65" cy="70" r="12" fill="url(#bodyGradient)" stroke="#b3b3b3" strokeWidth="1" />
    {/* Bent knees */}
    <ellipse cx="85" cy="60" rx="8" ry="18" fill="#d4a574" transform="rotate(-15 85 60)" />
    <ellipse cx="115" cy="60" rx="8" ry="18" fill="#d4a574" transform="rotate(15 115 60)" />
    {/* Arms */}
    <ellipse cx="75" cy="85" rx="15" ry="6" fill="#d4a574" />
    <ellipse cx="125" cy="85" rx="15" ry="6" fill="#d4a574" />
    {/* Hair */}
    <path d="M 60 62 Q 65 57 70 62" fill="#8b6f47" />
    {/* Pelvic movement arrow */}
    <path d="M 100 90 Q 105 95 110 90" stroke="#8bb4a1" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" />
  </svg>
);

export const AnklePumpsIllustration = () => (
  <svg viewBox="0 0 200 120" className="w-full h-24">
    {/* Chair */}
    <rect x="40" y="70" width="60" height="40" fill="#e5e7eb" stroke="#d1d5db" strokeWidth="1" />
    <rect x="35" y="65" width="70" height="8" fill="#e5e7eb" stroke="#d1d5db" strokeWidth="1" />
    {/* Figure sitting */}
    <ellipse cx="70" cy="60" rx="20" ry="10" fill="url(#bodyGradient)" />
    {/* Head */}
    <circle cx="70" cy="40" r="12" fill="url(#bodyGradient)" stroke="#b3b3b3" strokeWidth="1" />
    {/* Arms */}
    <ellipse cx="50" cy="65" rx="6" ry="12" fill="#d4a574" />
    <ellipse cx="90" cy="65" rx="6" ry="12" fill="#d4a574" />
    {/* Legs */}
    <rect x="60" y="70" width="6" height="25" fill="#d4a574" />
    <rect x="74" y="70" width="6" height="25" fill="#d4a574" />
    {/* Feet with movement */}
    <ellipse cx="65" cy="100" rx="8" ry="4" fill="#8b6f47" />
    <ellipse cx="79" cy="100" rx="8" ry="4" fill="#8b6f47" />
    {/* Hair */}
    <path d="M 65 32 Q 70 27 75 32" fill="#8b6f47" />
    {/* Movement arrows for ankle pumps */}
    <path d="M 55 105 L 50 105" stroke="#8bb4a1" strokeWidth="2" markerEnd="url(#arrowhead)" />
    <path d="M 89 105 L 94 105" stroke="#8bb4a1" strokeWidth="2" markerEnd="url(#arrowhead)" />
    <path d="M 65 108 L 65 113" stroke="#8bb4a1" strokeWidth="2" markerEnd="url(#arrowhead)" />
    <path d="M 79 108 L 79 113" stroke="#8bb4a1" strokeWidth="2" markerEnd="url(#arrowhead)" />
  </svg>
);

export const SpinalTwistIllustration = () => (
  <svg viewBox="0 0 200 120" className="w-full h-24">
    {/* Mat */}
    <circle cx="100" cy="90" r="60" fill="#e0e7ff" opacity="0.3" />
    {/* Figure sitting cross-legged */}
    <ellipse cx="100" cy="75" rx="25" ry="12" fill="url(#bodyGradient)" />
    {/* Head turned */}
    <circle cx="110" cy="50" r="12" fill="url(#bodyGradient)" stroke="#b3b3b3" strokeWidth="1" />
    {/* Crossed legs */}
    <ellipse cx="85" cy="85" rx="12" ry="6" fill="#d4a574" transform="rotate(-20 85 85)" />
    <ellipse cx="115" cy="85" rx="12" ry="6" fill="#d4a574" transform="rotate(20 115 85)" />
    {/* Arms - one supporting, one twisting */}
    <ellipse cx="125" cy="70" rx="6" ry="15" fill="#d4a574" transform="rotate(30 125 70)" />
    <ellipse cx="85" cy="65" rx="6" ry="12" fill="#d4a574" transform="rotate(-45 85 65)" />
    {/* Hair */}
    <path d="M 105 42 Q 110 37 115 42" fill="#8b6f47" />
    {/* Twist arrow */}
    <path d="M 90 55 Q 100 45 110 55" stroke="#c084fc" strokeWidth="2" fill="none" markerEnd="url(#arrowheadPurple)" />
    <defs>
      <marker id="arrowheadPurple" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#c084fc" />
      </marker>
    </defs>
  </svg>
);

interface ExerciseIllustrationProps {
  exerciseId: string;
  className?: string;
}

export const ExerciseIllustration = ({ exerciseId, className = "" }: ExerciseIllustrationProps) => {
  const illustrations: Record<string, () => JSX.Element> = {
    "1": CatCowIllustration,
    "2": BreathingIllustration,
    "3": WallPushUpIllustration,
    "4": PelvicTiltIllustration,
    "5": SpinalTwistIllustration,
    "6": AnklePumpsIllustration,
  };

  const IllustrationComponent = illustrations[exerciseId];
  
  if (!IllustrationComponent) {
    // Default illustration for exercises without specific images
    return (
      <div className={`bg-gradient-to-br from-sage-100 to-lavender-100 rounded-lg flex items-center justify-center ${className}`}>
        <div className="text-sage-600 text-2xl">🧘‍♀️</div>
      </div>
    );
  }

  return (
    <div className={`bg-gradient-to-br from-cream to-sage-50 rounded-lg p-2 ${className}`}>
      <IllustrationComponent />
    </div>
  );
};