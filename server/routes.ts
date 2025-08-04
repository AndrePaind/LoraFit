import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertWorkoutSessionSchema, insertSessionExerciseSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get default user
  app.get("/api/user", async (req, res) => {
    try {
      const user = await storage.getUser("default-user");
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Failed to get user" });
    }
  });

  // Update user
  app.patch("/api/user", async (req, res) => {
    try {
      const updates = req.body;
      const user = await storage.updateUser("default-user", updates);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Failed to update user" });
    }
  });

  // Get all exercises
  app.get("/api/exercises", async (req, res) => {
    try {
      const exercises = await storage.getAllExercises();
      res.json(exercises);
    } catch (error) {
      res.status(500).json({ message: "Failed to get exercises" });
    }
  });

  // Get exercises by category
  app.get("/api/exercises/category/:category", async (req, res) => {
    try {
      const { category } = req.params;
      const exercises = await storage.getExercisesByCategory(category);
      res.json(exercises);
    } catch (error) {
      res.status(500).json({ message: "Failed to get exercises by category" });
    }
  });

  // Create workout session
  app.post("/api/sessions", async (req, res) => {
    try {
      const sessionData = insertWorkoutSessionSchema.parse({
        ...req.body,
        userId: "default-user"
      });
      const session = await storage.createWorkoutSession(sessionData);
      res.json(session);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid session data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create session" });
    }
  });

  // Get user sessions
  app.get("/api/sessions", async (req, res) => {
    try {
      const sessions = await storage.getUserSessions("default-user");
      res.json(sessions);
    } catch (error) {
      res.status(500).json({ message: "Failed to get sessions" });
    }
  });

  // Get today's sessions
  app.get("/api/sessions/today", async (req, res) => {
    try {
      const sessions = await storage.getTodaySessions("default-user");
      res.json(sessions);
    } catch (error) {
      res.status(500).json({ message: "Failed to get today's sessions" });
    }
  });

  // Create session exercise
  app.post("/api/session-exercises", async (req, res) => {
    try {
      const sessionExerciseData = insertSessionExerciseSchema.parse(req.body);
      const sessionExercise = await storage.createSessionExercise(sessionExerciseData);
      res.json(sessionExercise);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid session exercise data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create session exercise" });
    }
  });

  // Get session exercises
  app.get("/api/session-exercises/:sessionId", async (req, res) => {
    try {
      const { sessionId } = req.params;
      const sessionExercises = await storage.getSessionExercises(sessionId);
      res.json(sessionExercises);
    } catch (error) {
      res.status(500).json({ message: "Failed to get session exercises" });
    }
  });

  // Update session exercise
  app.patch("/api/session-exercises/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
      const sessionExercise = await storage.updateSessionExercise(id, updates);
      if (!sessionExercise) {
        return res.status(404).json({ message: "Session exercise not found" });
      }
      res.json(sessionExercise);
    } catch (error) {
      res.status(500).json({ message: "Failed to update session exercise" });
    }
  });

  // Complete session and update streak
  app.patch("/api/sessions/:sessionId", async (req, res) => {
    try {
      const { sessionId } = req.params;
      const { exercisesCompleted } = req.body;
      
      // Update the session
      const session = await storage.getSessionById(sessionId);
      if (!session) {
        return res.status(404).json({ message: "Session not found" });
      }

      // Update streak
      const updatedUser = await storage.updateUserStreak("default-user");
      
      res.json({ 
        message: "Session completed", 
        user: updatedUser,
        exercisesCompleted 
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to complete session" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
