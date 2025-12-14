import request from "supertest";
import app from "../app";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

let token: string;

/**
 * Runs once BEFORE all tests
 */
beforeAll(async () => {
  // Connect to MongoDB for this test file
  await mongoose.connect(process.env.MONGO_URI as string);

  // Register ADMIN user
  await request(app).post("/api/auth/register").send({
    name: "Admin User",
    email: "admin@sweet.com",
    password: "password123",
  });

  // 🔑 Manually promote user to ADMIN (test shortcut)
  await mongoose.connection.collection("users").updateOne(
    { email: "admin@sweet.com" },
    { $set: { role: "admin" } }
  );

  // Login ADMIN user
  const res = await request(app).post("/api/auth/login").send({
    email: "admin@sweet.com",
    password: "password123",
  });

  token = res.body.token;
});

/**
 * Runs once AFTER all tests
 */
afterAll(async () => {
  await mongoose.disconnect();
});

describe("Sweet API", () => {
  it("should NOT create sweet without auth", async () => {
    const res = await request(app).post("/api/sweets").send({
      name: "Ladoo",
      category: "Indian",
      price: 10,
      quantity: 50,
    });

    expect(res.status).toBe(401);
  });

  it("should create a sweet (ADMIN only)", async () => {
    const res = await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Ladoo",
        category: "Indian",
        price: 10,
        quantity: 50,
      });

    expect(res.status).toBe(201);
    expect(res.body.name).toBe("Ladoo");
  });

  it("should fetch all sweets", async () => {
    const res = await request(app)
      .get("/api/sweets")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
