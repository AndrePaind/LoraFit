import { type User, type InsertUser, type Exercise, type InsertExercise, type WorkoutSession, type InsertWorkoutSession, type SessionExercise, type InsertSessionExercise } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, updates: Partial<User>): Promise<User | undefined>;

  // Exercise operations
  getAllExercises(): Promise<Exercise[]>;
  getExercise(id: string): Promise<Exercise | undefined>;
  getExercisesByCategory(category: string): Promise<Exercise[]>;
  createExercise(exercise: InsertExercise): Promise<Exercise>;

  // Workout session operations
  createWorkoutSession(session: InsertWorkoutSession): Promise<WorkoutSession>;
  getUserSessions(userId: string): Promise<WorkoutSession[]>;
  getTodaySessions(userId: string): Promise<WorkoutSession[]>;
  getSessionById(id: string): Promise<WorkoutSession | undefined>;

  // Session exercise operations
  createSessionExercise(sessionExercise: InsertSessionExercise): Promise<SessionExercise>;
  getSessionExercises(sessionId: string): Promise<SessionExercise[]>;
  updateSessionExercise(id: string, updates: Partial<SessionExercise>): Promise<SessionExercise | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private exercises: Map<string, Exercise>;
  private workoutSessions: Map<string, WorkoutSession>;
  private sessionExercises: Map<string, SessionExercise>;

  constructor() {
    this.users = new Map();
    this.exercises = new Map();
    this.workoutSessions = new Map();
    this.sessionExercises = new Map();
    this.seedData();
  }

  private seedData() {
    // Create default user
    const defaultUser: User = {
      id: "default-user",
      username: "mama-to-be",
      pregnancyWeek: 24,
      dailyGoal: 3,
      createdAt: new Date(),
    };
    this.users.set(defaultUser.id, defaultUser);

    // Seed exercises
    const exercises: Exercise[] = [
      {
        id: "1",
        name: "Gentle Cat-Cow Stretch",
        description: "A safe spinal mobility exercise that helps relieve back tension and improves posture during pregnancy.",
        instructions: "Start on hands and knees. Arch your back gently while lifting your head (cow), then round your spine while tucking your chin (cat). Move slowly and breathe deeply.",
        duration: 120,
        difficulty: "beginner",
        category: "stretching",
        isPregnancySafe: true,
        imageUrl: null,
      },
      {
        id: "2",
        name: "Prenatal Breathing",
        description: "Deep breathing exercise to oxygenate your body and baby while promoting relaxation.",
        instructions: "Sit comfortably with your back straight. Place one hand on your chest and one on your belly. Breathe in slowly through your nose, feeling your belly rise. Exhale slowly through your mouth.",
        duration: 180,
        difficulty: "beginner",
        category: "breathing",
        isPregnancySafe: true,
        imageUrl: null,
      },
      {
        id: "3",
        name: "Wall Push-Ups",
        description: "Modified push-ups that strengthen your upper body safely during pregnancy.",
        instructions: "Stand arm's length from a wall. Place palms flat against the wall at shoulder height. Lean in and push back gently. Keep your body straight.",
        duration: 90,
        difficulty: "beginner",
        category: "strength",
        isPregnancySafe: true,
        imageUrl: null,
      },
      {
        id: "4",
        name: "Pelvic Tilts",
        description: "Helps strengthen abdominal muscles and relieve back pain.",
        instructions: "Lie on your back with knees bent. Tighten your abdominal muscles and tilt your pelvis slightly. Hold for 5 seconds, then relax.",
        duration: 150,
        difficulty: "beginner",
        category: "strength",
        isPregnancySafe: true,
        imageUrl: null,
      },
      {
        id: "5",
        name: "Seated Spinal Twist",
        description: "Gentle twisting motion to improve spinal mobility and reduce tension.",
        instructions: "Sit cross-legged. Place right hand behind you for support. Gently twist your torso to the right, then repeat on the left side.",
        duration: 100,
        difficulty: "beginner",
        category: "stretching",
        isPregnancySafe: true,
        imageUrl: null,
      },
      {
        id: "6",
        name: "Ankle Pumps",
        description: "Improves circulation and reduces swelling in feet and ankles.",
        instructions: "Sit or lie down comfortably. Flex and point your feet alternately. Make circles with your ankles in both directions.",
        duration: 80,
        difficulty: "beginner",
        category: "stretching",
        isPregnancySafe: true,
        imageUrl: null,
      },
    ];

    exercises.forEach(exercise => {
      this.exercises.set(exercise.id, exercise);
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser, 
      id, 
      createdAt: new Date() 
    };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, ...updates };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  async getAllExercises(): Promise<Exercise[]> {
    return Array.from(this.exercises.values());
  }

  async getExercise(id: string): Promise<Exercise | undefined> {
    return this.exercises.get(id);
  }

  async getExercisesByCategory(category: string): Promise<Exercise[]> {
    return Array.from(this.exercises.values()).filter(exercise => exercise.category === category);
  }

  async createExercise(insertExercise: InsertExercise): Promise<Exercise> {
    const id = randomUUID();
    const exercise: Exercise = {
      ...insertExercise,
      id,
      isPregnancySafe: true,
    };
    this.exercises.set(id, exercise);
    return exercise;
  }

  async createWorkoutSession(insertSession: InsertWorkoutSession): Promise<WorkoutSession> {
    const id = randomUUID();
    const session: WorkoutSession = {
      ...insertSession,
      id,
      completedAt: new Date(),
    };
    this.workoutSessions.set(id, session);
    return session;
  }

  async getUserSessions(userId: string): Promise<WorkoutSession[]> {
    return Array.from(this.workoutSessions.values()).filter(session => session.userId === userId);
  }

  async getTodaySessions(userId: string): Promise<WorkoutSession[]> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return Array.from(this.workoutSessions.values()).filter(session => 
      session.userId === userId && 
      session.completedAt >= today && 
      session.completedAt < tomorrow
    );
  }

  async getSessionById(id: string): Promise<WorkoutSession | undefined> {
    return this.workoutSessions.get(id);
  }

  async createSessionExercise(insertSessionExercise: InsertSessionExercise): Promise<SessionExercise> {
    const id = randomUUID();
    const sessionExercise: SessionExercise = {
      ...insertSessionExercise,
      id,
    };
    this.sessionExercises.set(id, sessionExercise);
    return sessionExercise;
  }

  async getSessionExercises(sessionId: string): Promise<SessionExercise[]> {
    return Array.from(this.sessionExercises.values()).filter(se => se.sessionId === sessionId);
  }

  async updateSessionExercise(id: string, updates: Partial<SessionExercise>): Promise<SessionExercise | undefined> {
    const sessionExercise = this.sessionExercises.get(id);
    if (!sessionExercise) return undefined;
    
    const updated = { ...sessionExercise, ...updates };
    this.sessionExercises.set(id, updated);
    return updated;
  }
}

export const storage = new MemStorage();
