import { db } from "./db";
import { users, exercises } from "@shared/schema";

async function seed() {
  console.log("🌱 Seeding database...");

  // Create default user
  try {
    await db.insert(users).values({
      id: "default-user",
      username: "Lora",
      pregnancyWeek: 24,
      dailyGoal: 1,
      currentStreak: 0,
      longestStreak: 0,
      lastWorkoutDate: null,
    }).onConflictDoNothing();
    console.log("✅ Default user created");
  } catch (error) {
    console.log("🔄 Default user already exists");
  }

  // Seed exercises
  const exerciseData = [
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

  try {
    await db.insert(exercises).values(exerciseData).onConflictDoNothing();
    console.log("✅ Exercises seeded");
  } catch (error) {
    console.log("🔄 Exercises already exist");
  }

  console.log("🎉 Database seeding completed!");
}

seed().catch(console.error);
