const request = require("supertest");
const app = require("../app");
const { expect } = require("chai");
const mongoose = require("mongoose");
const User = require("../models/User");

describe("Auth API", async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGO_URI);
  }
});

//clear users between tests
afterEach(async () => {
  await User.deleteMany({});
});

after(async () => {
  await mongoose.connection.close();
});

describe("POST /api/auth/signup", () => {
  it("should register a new user", async () => {
    const res = await request(app).post("/api/auth/signup").send({
      username: "testuser",
      email: "test@example.com",
      password: "123456",
    });
    expect(res.status).to.equal(201);
    expect(res.body.message).to.equal("User created seccessfully");
  });
});

describe("POST /api/auth/login", () => {
  beforeEach(async () => {
    //creating user before each login
    await request(app).post("/api/auth/signup").send({
      username: "testuser",
      email: "test@example.com",
      password: "123456",
    });
  });

  it("should login an existing user and return a token", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "test@example.com",
      password: "123456",
    });
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("token");
  });

  it("should fail with invalid credentials", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "wrong@example.com",
      password: "wrongpass",
    });

    expect(res.status).to.equal(401);
    expect(res.body.message).to.equal("Invalid credentials");
  });
});
