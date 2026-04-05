import express from "express";
import { prisma } from "../lib/prisma.js"; // MUST include .js for ES Modules

const app = express();
app.use(express.json());

// 1. Create user with a todo (Equivalent to the first half of your script.ts)
app.post("/users", async (req, res) => {
  try {
    const user = await prisma.user.create({
      data: {
        name: "Alice",
        email: `alice-${Date.now()}@prisma.io`, // Ensures unique email on multiple clicks
        password: "securepassword",
        todos: {
          create: {
            title: "Hello World",
            description: "This is my first todo via Express!",
            done: false,
          },
        },
      },
      include: {
        todos: true,
      },
    });

    console.log("Created user:", user);
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create user" });
  }
});

// 2. Fetch all users (Equivalent to the second half of your script.ts)
app.get("/users", async (req, res) => {
  try {
    const allUsers = await prisma.user.findMany({
      include: {
        todos: true,
      },
    });

    console.log("All users:", JSON.stringify(allUsers, null, 2));
    res.status(200).json(allUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// Start the Express server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});