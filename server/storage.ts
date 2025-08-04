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
      username: "Lora",
      pregnancyWeek: 24,
      dailyGoal: 1,
      createdAt: new Date(),
    };
    this.users.set(defaultUser.id, defaultUser);

    // Seed exercises
    const exercises: Exercise[] = [
      {
        id: "1",
        name: "Grounding Yourself",
        description: "A peaceful seated meditation pose to center yourself and connect with your baby.",
        instructions: "Sit cross-legged in a comfortable position. Rest your hands on your knees with palms facing up. Close your eyes and breathe deeply, focusing on the connection with your baby.",
        duration: 43,
        difficulty: "beginner",
        category: "breathing",
        isPregnancySafe: true,
        imageUrl: null,
      },
      {
        id: "2",
        name: "Cat and Cow",
        description: "A soothing spinal movement to relieve back tension and improve flexibility.",
        instructions: "Start on hands and knees. For cow pose, drop your belly and lift your chest. For cat pose, round your spine toward the ceiling. Move slowly between both positions.",
        duration: 43,
        difficulty: "beginner",
        category: "stretching",
        isPregnancySafe: true,
        imageUrl: null,
      },
      {
        id: "3",
        name: "Hip Stretch",
        description: "Gentle hip opening stretch to prepare your body and relieve pelvic tension.",
        instructions: "Lie on your back and bring one knee to your chest. Hold gently and breathe deeply. Switch sides. Use a pillow for head support if needed.",
        duration: 43,
        difficulty: "beginner",
        category: "stretching",
        isPregnancySafe: true,
        imageUrl: null,
      },
      {
        id: "4",
        name: "Lunges",
        description: "Modified lunges to strengthen your legs and improve balance safely.",
        instructions: "Step one foot forward into a lunge position. Keep your front knee over your ankle. Hold for 15-30 seconds, then switch sides. Use a wall or chair for support if needed.",
        duration: 43,
        difficulty: "intermediate",
        category: "strength",
        isPregnancySafe: true,
        imageUrl: null,
      },
      {
        id: "5",
        name: "Squats",
        description: "Pregnancy-safe squats to strengthen your legs and prepare for labor.",
        instructions: "Stand with feet hip-width apart, hands together at chest. Slowly lower into a squat, keeping your chest up. Rise back up slowly. Use a chair for support if needed.",
        duration: 43,
        difficulty: "intermediate",
        category: "strength",
        isPregnancySafe: true,
        imageUrl: null,
      },
      {
        id: "6",
        name: "Windmill",
        description: "Gentle side stretch to improve flexibility and relieve side tension.",
        instructions: "Stand with feet wide apart. Reach one arm up and over to the side, creating a gentle side bend. Hold and breathe, then switch sides.",
        duration: 43,
        difficulty: "beginner",
        category: "stretching",
        isPregnancySafe: true,
        imageUrl: null,
      },
      {
        id: "7",
        name: "Child Pose",
        description: "A restful pose to relax your body and mind while supporting your growing belly.",
        instructions: "Kneel on the floor and sit back on your heels. Slowly fold forward, extending your arms in front. Keep your knees wide to make room for your belly.",
        duration: 43,
        difficulty: "beginner",
        category: "relaxation",
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
