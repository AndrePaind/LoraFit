import { sql } from "drizzle-orm";
import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = sqliteTable("users", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  username: text("username").notNull().unique(),
  pregnancyWeek: integer("pregnancy_week").notNull().default(12),
  dailyGoal: integer("daily_goal").notNull().default(3),
  currentStreak: integer("current_streak").notNull().default(0),
  longestStreak: integer("longest_streak").notNull().default(0),
  lastWorkoutDate: integer("last_workout_date", { mode: 'timestamp' }),
  createdAt: integer("created_at", { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
});

export const exercises = sqliteTable("exercises", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  description: text("description").notNull(),
  instructions: text("instructions").notNull(),
  duration: integer("duration").notNull(), // in seconds
  difficulty: text("difficulty").notNull(), // beginner, intermediate, advanced
  category: text("category").notNull(), // breathing, stretching, strength, relaxation
  isPregnancySafe: integer("is_pregnancy_safe", { mode: 'boolean' }).notNull().default(1),
  imageUrl: text("image_url"),
});

export const workoutSessions = sqliteTable("workout_sessions", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: text("user_id").notNull(),
  duration: integer("duration").notNull(), // in minutes (5, 10, 15)
  completedAt: integer("completed_at", { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
  exercisesCompleted: integer("exercises_completed").notNull().default(0),
});

export const sessionExercises = sqliteTable("session_exercises", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  sessionId: text("session_id").notNull(),
  exerciseId: text("exercise_id").notNull(),
  completed: integer("completed", { mode: 'boolean' }).notNull().default(0),
  timeSpent: integer("time_spent").notNull().default(0), // in seconds
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  pregnancyWeek: true,
  dailyGoal: true,
});

export const insertExerciseSchema = createInsertSchema(exercises).pick({
  name: true,
  description: true,
  instructions: true,
  duration: true,
  difficulty: true,
  category: true,
  imageUrl: true,
});

export const insertWorkoutSessionSchema = createInsertSchema(workoutSessions).pick({
  userId: true,
  duration: true,
  exercisesCompleted: true,
});

export const insertSessionExerciseSchema = createInsertSchema(sessionExercises).pick({
  sessionId: true,
  exerciseId: true,
  completed: true,
  timeSpent: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertExercise = z.infer<typeof insertExerciseSchema>;
export type Exercise = typeof exercises.$inferSelect;
export type InsertWorkoutSession = z.infer<typeof insertWorkoutSessionSchema>;
export type WorkoutSession = typeof workoutSessions.$inferSelect;
export type InsertSessionExercise = z.infer<typeof insertSessionExerciseSchema>;
export type SessionExercise = typeof sessionExercises.$inferSelect;
