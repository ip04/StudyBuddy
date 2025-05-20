const request = require("supertest");
const app = require("../app");
const { expect } = require("chai");

let token;

before(async function () {
  this.timeout(20000); // עד 10 שניות

  await request(app).post("/api/auth/signup").send({
    username: "usertest",
    email: "usertest@example.com",
    password: "testpass123",
  });

  const res = await request(app).post("/api/auth/login").send({
    email: "usertest@example.com",
    password: "testpass123",
  });

  token = res.body.token;
});

describe("GET /api/users/me", () => {
  it("should return current user's profile", async () => {
    const res = await request(app)
      .get("/api/users/me")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("email", "user1@example.com");
    expect(res.body).to.have.property("username", "user1");
    expect(res.body).to.not.have.property("password"); // בדוק שסיסמה לא נחשפת
  });
});

describe("PUT /api/users/update", () => {
  it("should update the username", async () => {
    const res = await request(app)
      .put("/api/users/update")
      .set("Authorization", `Bearer ${token}`)
      .send({ username: "updateduser" });

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("username", "updateduser");
  });
});
