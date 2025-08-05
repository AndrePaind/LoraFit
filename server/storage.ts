import { type User, type InsertUser, type Exercise, type InsertExercise, type WorkoutSession, type InsertWorkoutSession, type SessionExercise, type InsertSessionExercise } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, updates: Partial<User>): Promise<User | undefined>;
  updateUserStreak(userId: string): Promise<User | undefined>;

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
      currentStreak: 0,
      longestStreak: 0,
      lastWorkoutDate: null,
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
      pregnancyWeek: insertUser.pregnancyWeek || 12,
      dailyGoal: insertUser.dailyGoal || 3,
      currentStreak: 0,
      longestStreak: 0,
      lastWorkoutDate: null,
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

  async updateUserStreak(userId: string): Promise<User | undefined> {
    const user = this.users.get(userId);
    if (!user) return undefined;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    // Check if user worked out today
    const todaySessions = await this.getTodaySessions(userId);
    if (todaySessions.length === 0) {
      return user; // No workout today, don't update streak
    }

    let newStreak = user.currentStreak;
    const lastWorkoutDate = user.lastWorkoutDate;

    if (!lastWorkoutDate) {
      // First workout ever
      newStreak = 1;
    } else {
      const lastWorkout = new Date(lastWorkoutDate);
      lastWorkout.setHours(0, 0, 0, 0);

      if (lastWorkout.getTime() === yesterday.getTime()) {
        // Consecutive day - increment streak
        newStreak = user.currentStreak + 1;
      } else if (lastWorkout.getTime() < yesterday.getTime()) {
        // Missed a day(s) - reset streak
        newStreak = 1;
      }
      // If lastWorkout is today, don't change streak (already counted)
    }

    const updatedUser = {
      ...user,
      currentStreak: newStreak,
      longestStreak: Math.max(user.longestStreak, newStreak),
      lastWorkoutDate: today,
    };

    this.users.set(userId, updatedUser);
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
      imageUrl: insertExercise.imageUrl || null,
    };
    this.exercises.set(id, exercise);
    return exercise;
  }

  async createWorkoutSession(insertSession: InsertWorkoutSession): Promise<WorkoutSession> {
    const id = randomUUID();
    const session: WorkoutSession = {
      ...insertSession,
      id,
      exercisesCompleted: insertSession.exercisesCompleted || 0,
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
      completed: insertSessionExercise.completed || false,
      timeSpent: insertSessionExercise.timeSpent || 0,
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

import { users, exercises, workoutSessions, sessionExercises } from "@shared/schema";
import { db } from "./db";
import { eq, and, gte, lt } from "drizzle-orm";

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User | undefined> {
    const [user] = await db
      .update(users)
      .set(updates)
      .where(eq(users.id, id))
      .returning();
    return user || undefined;
  }

  async updateUserStreak(userId: string): Promise<User | undefined> {
    const user = await this.getUser(userId);
    if (!user) return undefined;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    // Check if user worked out today
    const todaySessions = await this.getTodaySessions(userId);
    if (todaySessions.length === 0) {
      return user; // No workout today, don't update streak
    }

    let newStreak = user.currentStreak;
    const lastWorkoutDate = user.lastWorkoutDate;

    if (!lastWorkoutDate) {
      // First workout ever
      newStreak = 1;
    } else {
      const lastWorkout = new Date(lastWorkoutDate);
      lastWorkout.setHours(0, 0, 0, 0);

      if (lastWorkout.getTime() === yesterday.getTime()) {
        // Consecutive day - increment streak
        newStreak = user.currentStreak + 1;
      } else if (lastWorkout.getTime() < yesterday.getTime()) {
        // Missed a day(s) - reset streak
        newStreak = 1;
      }
      // If lastWorkout is today, don't change streak (already counted)
    }

    const [updatedUser] = await db
      .update(users)
      .set({
        currentStreak: newStreak,
        longestStreak: Math.max(user.longestStreak, newStreak),
        lastWorkoutDate: today,
      })
      .where(eq(users.id, userId))
      .returning();

    return updatedUser;
  }

  async getAllExercises(): Promise<Exercise[]> {
    return await db.select().from(exercises);
  }

  async getExercise(id: string): Promise<Exercise | undefined> {
    const [exercise] = await db.select().from(exercises).where(eq(exercises.id, id));
    return exercise || undefined;
  }

  async getExercisesByCategory(category: string): Promise<Exercise[]> {
    return await db.select().from(exercises).where(eq(exercises.category, category));
  }

  async createExercise(insertExercise: InsertExercise): Promise<Exercise> {
    const [exercise] = await db
      .insert(exercises)
      .values(insertExercise)
      .returning();
    return exercise;
  }

  async createWorkoutSession(insertSession: InsertWorkoutSession): Promise<WorkoutSession> {
    const [session] = await db
      .insert(workoutSessions)
      .values(insertSession)
      .returning();
    return session;
  }

  async getUserSessions(userId: string): Promise<WorkoutSession[]> {
    return await db.select().from(workoutSessions).where(eq(workoutSessions.userId, userId));
  }

  async getTodaySessions(userId: string): Promise<WorkoutSession[]> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return await db
      .select()
      .from(workoutSessions)
      .where(
        and(
          eq(workoutSessions.userId, userId),
          gte(workoutSessions.completedAt, today),
          lt(workoutSessions.completedAt, tomorrow)
        )
      );
  }

  async getSessionById(id: string): Promise<WorkoutSession | undefined> {
    const [session] = await db.select().from(workoutSessions).where(eq(workoutSessions.id, id));
    return session || undefined;
  }

  async createSessionExercise(insertSessionExercise: InsertSessionExercise): Promise<SessionExercise> {
    const [sessionExercise] = await db
      .insert(sessionExercises)
      .values(insertSessionExercise)
      .returning();
    return sessionExercise;
  }

  async getSessionExercises(sessionId: string): Promise<SessionExercise[]> {
    return await db.select().from(sessionExercises).where(eq(sessionExercises.sessionId, sessionId));
  }

  async updateSessionExercise(id: string, updates: Partial<SessionExercise>): Promise<SessionExercise | undefined> {
    const [sessionExercise] = await db
      .update(sessionExercises)
      .set(updates)
      .where(eq(sessionExercises.id, id))
      .returning();
    return sessionExercise || undefined;
  }
}

export const storage = new DatabaseStorage();
