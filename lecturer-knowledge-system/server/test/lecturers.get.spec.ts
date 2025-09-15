import request from "supertest";
import { expect } from "chai";
import { app } from "../src/app";

describe("GET /lecturers", () => {
  it("should return list", async () => {
    const res = await request(app).get("/lecturers");
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("data");
    expect(res.body.data).to.be.an("array");
  });
});
