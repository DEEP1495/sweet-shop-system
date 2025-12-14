import request from "supertest";
import app from "../app";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

let adminToken: string;
let sweetId: string;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI as string);

  // Register admin
  await request(app).post("/api/auth/register").send({
    name: "Inventory Admin",
    email: "inventory@admin.com",
    password: "password123",
  });

  // Promote to admin
  await mongoose.connection.collection("users").updateOne(
    { email: "inventory@admin.com" },
    { $set: { role: "admin" } }
  );

  // Login admin
  const loginRes = await request(app).post("/api/auth/login").send({
    email: "inventory@admin.com",
    password: "password123",
  });

  adminToken = loginRes.body.token;

  // Create sweet
  const sweetRes = await request(app)
    .post("/api/sweets")
    .set("Authorization", `Bearer ${adminToken}`)
    .send({
      name: "Barfi",
      category: "Indian",
      price: 20,
      quantity: 10,
    });

  sweetId = sweetRes.body._id;
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe("Inventory API", () => {
  it("should purchase a sweet and reduce quantity", async () => {
    const res = await request(app)
      .post(`/api/sweets/${sweetId}/purchase`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ quantity: 1 });

    expect(res.status).toBe(200);
    expect(res.body.quantity).toBe(9);
  });

  it("should restock a sweet (admin only)", async () => {
    const res = await request(app)
      .post(`/api/sweets/${sweetId}/restock`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ amount: 5 });

    expect(res.status).toBe(200);
    expect(res.body.quantity).toBe(14);
  });
});
