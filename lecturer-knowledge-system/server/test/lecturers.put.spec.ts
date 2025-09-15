import request from "supertest";
import { expect } from "chai";
import { app } from "../src/app";

describe("PUT /lecturers/:id/knowledge", () => {
  it("updates knowledge", async () => {
    const res = await request(app)
      .put("/lecturers/1/knowledge")
      .send({ domain: "AI Tools", level: "Medium" });
    expect([200,204]).to.include(res.status);
  });
});
