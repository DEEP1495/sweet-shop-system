import request from "supertest";
import app from "../app";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

let adminToken: string;
let userToken: string;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI as string);

  // -------- ADMIN SETUP --------
  await request(app).post("/api/auth/register").send({
    name: "Search Admin",
    email: "search@admin.com",
    password: "password123",
  });

  await mongoose.connection.collection("users").updateOne(
    { email: "search@admin.com" },
    { $set: { role: "admin" } }
  );

  const adminLogin = await request(app).post("/api/auth/login").send({
    email: "search@admin.com",
    password: "password123",
  });

  adminToken = adminLogin.body.token;

  // -------- USER SETUP --------
  await request(app).post("/api/auth/register").send({
    name: "Search User",
    email: "search@user.com",
    password: "password123",
  });

  const userLogin = await request(app).post("/api/auth/login").send({
    email: "search@user.com",
    password: "password123",
  });

  userToken = userLogin.body.token;

  // -------- CREATE SWEET (ADMIN ONLY) --------
  await request(app)
    .post("/api/sweets")
    .set("Authorization", `Bearer ${adminToken}`)
    .send({
      name: "Rasgulla",
      category: "Bengali",
      price: 30,
      quantity: 10,
    });
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe("Sweet Search API", () => {
  it("should search sweets by category", async () => {
    const res = await request(app)
      .get("/api/sweets/search?category=Bengali")
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("should search sweets by price range", async () => {
    const res = await request(app)
      .get("/api/sweets/search?minPrice=20")
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.status).toBe(200);
    expect(res.body[0].price).toBeGreaterThanOrEqual(20);
  });
});
