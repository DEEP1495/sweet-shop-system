import dotenv from "dotenv";
dotenv.config();

import request from "supertest";
import mongoose from "mongoose";
import app from "../app";

let userToken: string;
let adminToken: string;

beforeAll(async () => {
  const mongoUri = process.env.MONGO_URI as string;
  await mongoose.connect(mongoUri);

  // -------------------------
  // Register NORMAL user
  // -------------------------
  const userRes = await request(app)
    .post("/api/auth/register")
    .send({
      name: "Normal User",
      email: "normaluser@gmail.com",
      password: "123456",
    });

  userToken = userRes.body.token;

  // -------------------------
  // Register ADMIN user
  // -------------------------
  await request(app)
    .post("/api/auth/register")
    .send({
      name: "Admin User",
      email: "adminuser@gmail.com",
      password: "123456",
    });

  // Promote admin user in DB
  await mongoose.connection
    .collection("users")
    .updateOne(
      { email: "adminuser@gmail.com" },
      { $set: { role: "admin" } }
    );

  // 🔑 LOGIN AGAIN to get ADMIN token
  const adminLoginRes = await request(app)
    .post("/api/auth/login")
    .send({
      email: "adminuser@gmail.com",
      password: "123456",
    });

  adminToken = adminLoginRes.body.token;
}, 15000);

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
}, 15000);

describe("Sweet API (Role Based)", () => {
  it("should NOT allow non-admin user to create a sweet", async () => {
    const res = await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${userToken}`)
      .send({
        name: "Rasgulla",
        category: "Dessert",
        price: 40,
        quantity: 10,
      });

    expect(res.status).toBe(403);
    expect(res.body.message).toBe("Admin only route");
  });

  it("should allow admin user to create a sweet", async () => {
    const res = await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        name: "Kaju Katli",
        category: "Dessert",
        price: 100,
        quantity: 5,
      });

    expect(res.status).toBe(201);
    expect(res.body.name).toBe("Kaju Katli");
  });
});
