import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  pregnancyWeek: integer("pregnancy_week").notNull().default(12),
  dailyGoal: integer("daily_goal").notNull().default(3),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const exercises = pgTable("exercises", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description").notNull(),
  instructions: text("instructions").notNull(),
  duration: integer("duration").notNull(), // in seconds
  difficulty: text("difficulty").notNull(), // beginner, intermediate, advanced
  category: text("category").notNull(), // breathing, stretching, strength, relaxation
  isPregnancySafe: boolean("is_pregnancy_safe").notNull().default(true),
  imageUrl: text("image_url"),
});

export const workoutSessions = pgTable("workout_sessions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  duration: integer("duration").notNull(), // in minutes (5, 10, 15)
  completedAt: timestamp("completed_at").notNull().default(sql`now()`),
  exercisesCompleted: integer("exercises_completed").notNull().default(0),
});

export const sessionExercises = pgTable("session_exercises", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  sessionId: varchar("session_id").notNull(),
  exerciseId: varchar("exercise_id").notNull(),
  completed: boolean("completed").notNull().default(false),
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
