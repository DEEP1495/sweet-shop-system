import dotenv from "dotenv";
dotenv.config();

import request from "supertest";
import mongoose from "mongoose";
import app from "../app";

beforeAll(async () => {
  const mongoUri = process.env.MONGO_URI as string;
  await mongoose.connect(mongoUri);
}, 15000);

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
}, 15000);

describe("Auth API", () => {

  it("should register a new user", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Test User",
        email: "testuser@gmail.com",
        password: "123456",
      });

    expect(res.status).toBe(201);
    expect(res.body.token).toBeDefined();
  });

  // 👇 PUT YOUR LOGIN TEST HERE
  it(
    "should login an existing user",
    async () => {
      const res = await request(app)
        .post("/api/auth/login")
        .send({
          email: "testuser@gmail.com",
          password: "123456",
        });

      expect(res.status).toBe(200);
      expect(res.body.token).toBeDefined();
    },
    10000
  );

});
