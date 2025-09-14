# LoraFit - Pregnancy Fitness App

A comprehensive pregnancy fitness application designed to help expectant mothers maintain their health and wellness throughout their pregnancy journey. LoraFit provides safe, guided exercises tailored specifically for pregnant women.

## 🌟 Features

- **Pregnancy-Safe Exercises**: Curated collection of exercises designed specifically for pregnant women
- **Personalized Workouts**: Customizable workout sessions based on pregnancy week and fitness level
- **Progress Tracking**: Monitor your fitness journey with streak tracking and workout history
- **Exercise Categories**: 
  - Breathing exercises for relaxation and stress relief
  - Stretching routines to improve flexibility
  - Strength training adapted for pregnancy
  - Relaxation poses for rest and recovery
- **Timer-Based Sessions**: Guided workout sessions with built-in timers
- **Mobile-First Design**: Responsive interface optimized for mobile devices
- **User Profiles**: Track pregnancy week, daily goals, and personal progress

## 🏗️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Radix UI** for accessible component library
- **Framer Motion** for animations
- **Wouter** for client-side routing
- **TanStack Query** for data fetching and caching
- **React Hook Form** for form management

### Backend
- **Express.js** with TypeScript
- **Drizzle ORM** for database operations
- **SQLite** for local development (easily configurable for PostgreSQL)
- **Express Session** for user session management

### Development Tools
- **TypeScript** for type safety
- **ESBuild** for production builds
- **Drizzle Kit** for database migrations
- **TSX** for TypeScript execution

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd LoraFit
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up the database**
   ```bash
   # Set the database URL environment variable
   export DATABASE_URL="sqlite://./dev.db"
   
   # Create and seed the database
   npm run db:push
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5000` to view the application.

## 📁 Project Structure

```
LoraFit/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   │   ├── ui/        # Base UI components (Radix UI)
│   │   │   ├── exercise-card.tsx
│   │   │   ├── exercise-timer.tsx
│   │   │   └── ...
│   │   ├── pages/         # Application pages
│   │   │   ├── home.tsx
│   │   │   ├── exercises.tsx
│   │   │   ├── workout-session.tsx
│   │   │   └── ...
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utility functions
│   │   └── main.tsx       # Application entry point
├── server/                # Backend Express application
│   ├── index.ts          # Server entry point
│   ├── routes.ts         # API route definitions
│   ├── db.ts            # Database configuration
│   └── seed.ts          # Database seeding
├── shared/               # Shared code between frontend and backend
│   └── schema.ts        # Database schema definitions
├── attached_assets/      # Exercise images and assets
└── package.json         # Project dependencies and scripts
```

## 🗄️ Database Schema

The application uses the following main entities:

### Users
- Personal information and pregnancy tracking
- Streak counters and daily goals
- Workout history

### Exercises
- Exercise details (name, description, instructions)
- Duration and difficulty levels
- Category classification (breathing, stretching, strength, relaxation)
- Pregnancy safety indicators

### Workout Sessions
- User workout history
- Session duration and completion tracking
- Exercise completion counts

### Session Exercises
- Individual exercise tracking within sessions
- Time spent and completion status

## 🎯 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run db:push` - Push database schema changes
- `npm run check` - TypeScript type checking

## 🏃‍♀️ Exercise Categories

### Breathing Exercises
- **Grounding Yourself**: Meditation pose for centering and baby connection
- Focus on deep breathing and mindfulness

### Stretching
- **Cat and Cow**: Spinal movement for back tension relief
- **Hip Stretch**: Gentle hip opening for pelvic tension relief
- **Windmill**: Side stretch for flexibility improvement

### Strength Training
- **Lunges**: Modified lunges for leg strength and balance
- **Squats**: Pregnancy-safe squats for labor preparation

### Relaxation
- **Child Pose**: Restful pose for body and mind relaxation

## 🔧 Configuration

### Environment Variables

- `DATABASE_URL`: Database connection string
- `NODE_ENV`: Environment (development/production)
- `PORT`: Server port (default: 5000)

### Database Configuration

The application supports both SQLite (default) and PostgreSQL:

**SQLite (Development)**
```bash
export DATABASE_URL="sqlite://./dev.db"
```

**PostgreSQL (Production)**
```bash
export DATABASE_URL="postgresql://user:password@localhost:5432/lorafit"
```

## 🎨 UI Components

The application uses a comprehensive set of UI components built on Radix UI:

- **Navigation**: Bottom navigation, breadcrumbs
- **Forms**: Input fields, selectors, checkboxes
- **Feedback**: Alerts, toasts, progress indicators
- **Layout**: Cards, sheets, dialogs, accordions
- **Data Display**: Tables, charts, badges

## 📱 Mobile Experience

LoraFit is designed with a mobile-first approach:

- Responsive design that works on all screen sizes
- Touch-friendly interface elements
- Optimized for one-handed use
- Fast loading and smooth animations

## 🚀 Deployment

### Production Build

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Start production server**
   ```bash
   npm run start
   ```

### Environment Setup

Ensure you have the following environment variables set in production:

- `DATABASE_URL`: Your production database URL
- `NODE_ENV=production`
- `PORT`: Your desired port (default: 5000)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Exercise routines designed with pregnancy safety in mind
- UI components powered by Radix UI
- Built with modern web technologies for optimal performance

## 📞 Support

For support or questions, please open an issue in the repository or contact the development team.

---

**LoraFit** - Supporting your pregnancy fitness journey, one workout at a time. 💪🤱
