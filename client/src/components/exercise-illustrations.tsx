// SVG illustrations for prenatal exercises based on provided images
export const GroundingYourselfIllustration = () => (
  <svg viewBox="0 0 200 120" className="w-full h-24">
    <defs>
      <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8b7dd6" />
        <stop offset="100%" stopColor="#a294e6" />
      </linearGradient>
      <linearGradient id="skinGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#d4a574" />
        <stop offset="100%" stopColor="#c89860" />
      </linearGradient>
    </defs>
    {/* Background gradient */}
    <rect width="200" height="120" fill="url(#backgroundGradient)" />
    <defs>
      <linearGradient id="backgroundGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f5f3ff" />
        <stop offset="100%" stopColor="#e0e7ff" />
      </linearGradient>
    </defs>
    {/* Seated cross-legged figure */}
    <ellipse cx="100" cy="80" rx="30" ry="15" fill="url(#bodyGradient)" />
    {/* Torso */}
    <ellipse cx="100" cy="65" rx="20" ry="25" fill="url(#bodyGradient)" />
    {/* Head */}
    <circle cx="100" cy="35" r="15" fill="url(#skinGradient)" />
    {/* Hair bun */}
    <circle cx="100" cy="25" r="8" fill="#2d1810" />
    {/* Arms positioned on knees */}
    <ellipse cx="80" cy="70" rx="8" ry="20" fill="url(#skinGradient)" transform="rotate(-30 80 70)" />
    <ellipse cx="120" cy="70" rx="8" ry="20" fill="url(#skinGradient)" transform="rotate(30 120 70)" />
    {/* Hands resting on knees */}
    <circle cx="75" cy="85" r="6" fill="url(#skinGradient)" />
    <circle cx="125" cy="85" r="6" fill="url(#skinGradient)" />
    {/* Peaceful aura lines */}
    <circle cx="100" cy="60" r="50" fill="none" stroke="#c7d2fe" strokeWidth="1" opacity="0.4" />
    <circle cx="100" cy="60" r="35" fill="none" stroke="#c7d2fe" strokeWidth="1" opacity="0.6" />
  </svg>
);

export const CatCowIllustration = () => (
  <svg viewBox="0 0 200 120" className="w-full h-24">
    <defs>
      <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8b7dd6" />
        <stop offset="100%" stopColor="#a294e6" />
      </linearGradient>
      <linearGradient id="skinGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#d4a574" />
        <stop offset="100%" stopColor="#c89860" />
      </linearGradient>
    </defs>
    {/* Two positions - Cat and Cow */}
    {/* Cat position (top) */}
    <g transform="translate(0, -10)">
      <ellipse cx="100" cy="50" rx="35" ry="12" fill="url(#bodyGradient)" />
      <circle cx="70" cy="45" r="10" fill="url(#skinGradient)" />
      <circle cx="70" cy="38" r="6" fill="#2d1810" />
      {/* Arms and legs */}
      <line x1="80" y1="55" x2="80" y2="75" stroke="url(#skinGradient)" strokeWidth="6" strokeLinecap="round" />
      <line x1="120" y1="55" x2="120" y2="75" stroke="url(#skinGradient)" strokeWidth="6" strokeLinecap="round" />
      <line x1="85" y1="58" x2="85" y2="78" stroke="url(#skinGradient)" strokeWidth="6" strokeLinecap="round" />
      <line x1="115" y1="58" x2="115" y2="78" stroke="url(#skinGradient)" strokeWidth="6" strokeLinecap="round" />
    </g>
    {/* Cow position (bottom) */}
    <g transform="translate(0, 30)">
      <ellipse cx="100" cy="50" rx="35" ry="12" fill="url(#bodyGradient)" transform="rotate(-5 100 50)" />
      <circle cx="70" cy="42" r="10" fill="url(#skinGradient)" />
      <circle cx="70" cy="35" r="6" fill="#2d1810" />
      {/* Arms and legs */}
      <line x1="80" y1="55" x2="80" y2="75" stroke="url(#skinGradient)" strokeWidth="6" strokeLinecap="round" />
      <line x1="120" y1="55" x2="120" y2="75" stroke="url(#skinGradient)" strokeWidth="6" strokeLinecap="round" />
      <line x1="85" y1="58" x2="85" y2="78" stroke="url(#skinGradient)" strokeWidth="6" strokeLinecap="round" />
      <line x1="115" y1="58" x2="115" y2="78" stroke="url(#skinGradient)" strokeWidth="6" strokeLinecap="round" />
    </g>
  </svg>
);

export const HipStretchIllustration = () => (
  <svg viewBox="0 0 200 120" className="w-full h-24">
    <defs>
      <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8b7dd6" />
        <stop offset="100%" stopColor="#a294e6" />
      </linearGradient>
      <linearGradient id="skinGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#d4a574" />
        <stop offset="100%" stopColor="#c89860" />
      </linearGradient>
    </defs>
    {/* Figure lying on side doing hip stretch */}
    <ellipse cx="100" cy="70" rx="30" ry="15" fill="url(#bodyGradient)" />
    {/* Head */}
    <circle cx="70" cy="65" r="12" fill="url(#skinGradient)" />
    <circle cx="70" cy="58" r="6" fill="#2d1810" />
    {/* Bent knee being pulled to chest */}
    <ellipse cx="115" cy="55" rx="12" ry="20" fill="url(#bodyGradient)" transform="rotate(-45 115 55)" />
    {/* Extended leg */}
    <ellipse cx="120" cy="80" rx="8" ry="25" fill="url(#bodyGradient)" />
    {/* Arms */}
    <ellipse cx="90" cy="60" rx="6" ry="15" fill="url(#skinGradient)" transform="rotate(-20 90 60)" />
    <ellipse cx="105" cy="55" rx="6" ry="12" fill="url(#skinGradient)" transform="rotate(30 105 55)" />
  </svg>
);

export const LungesIllustration = () => (
  <svg viewBox="0 0 200 120" className="w-full h-24">
    <defs>
      <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8b7dd6" />
        <stop offset="100%" stopColor="#a294e6" />
      </linearGradient>
      <linearGradient id="skinGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#d4a574" />
        <stop offset="100%" stopColor="#c89860" />
      </linearGradient>
    </defs>
    {/* Two figures showing lunge progression */}
    {/* Standing position */}
    <g transform="translate(-30, 0)">
      <ellipse cx="80" cy="65" rx="15" ry="25" fill="url(#bodyGradient)" />
      <circle cx="80" cy="30" r="12" fill="url(#skinGradient)" />
      <circle cx="80" cy="23" r="6" fill="#2d1810" />
      <ellipse cx="65" cy="55" rx="6" ry="15" fill="url(#skinGradient)" transform="rotate(-10 65 55)" />
      <ellipse cx="95" cy="55" rx="6" ry="15" fill="url(#skinGradient)" transform="rotate(10 95 55)" />
      {/* Legs */}
      <ellipse cx="75" cy="90" rx="8" ry="20" fill="url(#bodyGradient)" />
      <ellipse cx="85" cy="90" rx="8" ry="20" fill="url(#bodyGradient)" />
    </g>
    {/* Lunge position */}
    <g transform="translate(30, 0)">
      <ellipse cx="120" cy="65" rx="15" ry="25" fill="url(#bodyGradient)" />
      <circle cx="120" cy="30" r="12" fill="url(#skinGradient)" />
      <circle cx="120" cy="23" r="6" fill="#2d1810" />
      <ellipse cx="105" cy="55" rx="6" ry="15" fill="url(#skinGradient)" transform="rotate(-10 105 55)" />
      <ellipse cx="135" cy="55" rx="6" ry="15" fill="url(#skinGradient)" transform="rotate(10 135 55)" />
      {/* Front leg bent */}
      <ellipse cx="110" cy="85" rx="8" ry="18" fill="url(#bodyGradient)" transform="rotate(-20 110 85)" />
      {/* Back leg extended */}
      <ellipse cx="140" cy="95" rx="8" ry="25" fill="url(#bodyGradient)" transform="rotate(45 140 95)" />
    </g>
  </svg>
);

export const SquatsIllustration = () => (
  <svg viewBox="0 0 200 120" className="w-full h-24">
    <defs>
      <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8b7dd6" />
        <stop offset="100%" stopColor="#a294e6" />
      </linearGradient>
      <linearGradient id="skinGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#d4a574" />
        <stop offset="100%" stopColor="#c89860" />
      </linearGradient>
    </defs>
    {/* Figure in squat position */}
    <ellipse cx="100" cy="75" rx="20" ry="30" fill="url(#bodyGradient)" />
    {/* Head */}
    <circle cx="100" cy="35" r="12" fill="url(#skinGradient)" />
    <circle cx="100" cy="28" r="6" fill="#2d1810" />
    {/* Arms positioned together at chest */}
    <ellipse cx="85" cy="55" rx="6" ry="12" fill="url(#skinGradient)" transform="rotate(-20 85 55)" />
    <ellipse cx="115" cy="55" rx="6" ry="12" fill="url(#skinGradient)" transform="rotate(20 115 55)" />
    {/* Hands together */}
    <ellipse cx="100" cy="50" rx="8" ry="6" fill="url(#skinGradient)" />
    {/* Bent legs in squat */}
    <ellipse cx="85" cy="95" rx="10" ry="20" fill="url(#bodyGradient)" transform="rotate(-30 85 95)" />
    <ellipse cx="115" cy="95" rx="10" ry="20" fill="url(#bodyGradient)" transform="rotate(30 115 95)" />
    {/* Feet */}
    <ellipse cx="75" cy="110" rx="8" ry="4" fill="#8b6f47" />
    <ellipse cx="125" cy="110" rx="8" ry="4" fill="#8b6f47" />
  </svg>
);

export const WindmillIllustration = () => (
  <svg viewBox="0 0 200 120" className="w-full h-24">
    <defs>
      <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8b7dd6" />
        <stop offset="100%" stopColor="#a294e6" />
      </linearGradient>
      <linearGradient id="skinGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#d4a574" />
        <stop offset="100%" stopColor="#c89860" />
      </linearGradient>
    </defs>
    {/* Figure in side bend/windmill pose */}
    <ellipse cx="100" cy="65" rx="18" ry="30" fill="url(#bodyGradient)" transform="rotate(15 100 65)" />
    {/* Head */}
    <circle cx="95" cy="35" r="12" fill="url(#skinGradient)" />
    <circle cx="95" cy="28" r="6" fill="#2d1810" />
    {/* One arm reaching up and over */}
    <ellipse cx="80" cy="45" rx="6" ry="20" fill="url(#skinGradient)" transform="rotate(-45 80 45)" />
    {/* Other arm down */}
    <ellipse cx="120" cy="70" rx="6" ry="15" fill="url(#skinGradient)" transform="rotate(45 120 70)" />
    {/* Legs spread wide */}
    <ellipse cx="85" cy="95" rx="8" ry="25" fill="url(#bodyGradient)" />
    <ellipse cx="115" cy="95" rx="8" ry="25" fill="url(#bodyGradient)" />
    {/* Feet */}
    <ellipse cx="85" cy="115" rx="8" ry="4" fill="#8b6f47" />
    <ellipse cx="115" cy="115" rx="8" ry="4" fill="#8b6f47" />
  </svg>
);

export const ChildPoseIllustration = () => (
  <svg viewBox="0 0 200 120" className="w-full h-24">
    <defs>
      <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8b7dd6" />
        <stop offset="100%" stopColor="#a294e6" />
      </linearGradient>
      <linearGradient id="skinGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#d4a574" />
        <stop offset="100%" stopColor="#c89860" />
      </linearGradient>
    </defs>
    {/* Figure in child's pose */}
    <ellipse cx="120" cy="75" rx="25" ry="18" fill="url(#bodyGradient)" />
    {/* Head down */}
    <circle cx="90" cy="70" r="10" fill="url(#skinGradient)" />
    <circle cx="90" cy="65" r="5" fill="#2d1810" />
    {/* Arms extended forward */}
    <ellipse cx="70" cy="75" rx="15" ry="6" fill="url(#skinGradient)" />
    <ellipse cx="70" cy="85" rx="15" ry="6" fill="url(#skinGradient)" />
    {/* Folded legs underneath */}
    <ellipse cx="140" cy="85" rx="12" ry="8" fill="url(#bodyGradient)" />
    <ellipse cx="140" cy="95" rx="12" ry="8" fill="url(#bodyGradient)" />
  </svg>
);

interface ExerciseIllustrationProps {
  exerciseId: string;
  className?: string;
}

export const ExerciseIllustration = ({ exerciseId, className = "" }: ExerciseIllustrationProps) => {
  const illustrations: Record<string, () => JSX.Element> = {
    "1": GroundingYourselfIllustration,
    "2": CatCowIllustration,
    "3": HipStretchIllustration,
    "4": LungesIllustration,
    "5": SquatsIllustration,
    "6": WindmillIllustration,
    "7": ChildPoseIllustration,
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