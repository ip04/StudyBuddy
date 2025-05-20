const request = require("supertest");
const app = require("../app");
const { expect } = require("chai");

describe("/", () => {
  it("should return status 200 and correct message", async () => {
    const res = await request(app).get("/");
    expect(res.status).to.equal(200);
    expect(res.text).to.equal("StudyBuddy API is working 🚀");
  });
});
