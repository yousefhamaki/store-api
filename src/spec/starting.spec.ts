import supertest from "supertest";
import app from "../server";

const request = supertest(app);

//test starting server
describe("GET /", function () {
  it("returns status code `200`", async () => {
    const res = await request.get("/");
    expect(res.status).toEqual(200);
  });

  it("returns typeof body `object`", async () => {
    const res = await request.get("/");
    expect(typeof res.body).toBe("object");
  });

  it("returns status from body `success`", async () => {
    const res = await request.get("/");
    expect(res.body.status).toBe("success");
  });
});
