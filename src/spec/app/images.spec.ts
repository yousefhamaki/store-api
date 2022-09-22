import supertest from "supertest";
import UserModel from "../../app/models/user.model";
import User from "../../app/types/user.type";
import app from "../../server";

const request = supertest(app);
const model = new UserModel();
let image = "";
const fake = "f832131d-7ed8-4c21-af14-88d43b53d603";

const admin = {
  firstname: "yousef",
  lastname: "hamaki2",
  username: "yousef-hamaki56",
  email: "admin@gmail.com",
  password: "Hamaki_26033",
  rank: "admin",
} as User;

describe("upload", function () {
  beforeAll(async () => {
    const create = await model.create(admin);
    const res = await request.post("/api/user/login").send(admin);

    admin.token = res.body.data.token;
    admin.id = create.id;
  });

  it("a file", async () => {
    const res = await request
      .post("/api/images/upload")
      .attach("image", "db-relation.png")
      .set({ Authorization: admin.token });

    image = res.body.data.id;
    expect(res.status).toEqual(200);
    expect(res.body.data.id).toBeDefined;
  });

  // it("error authorization", async () => {
  //   const res = await request
  //     .post("/api/images/upload")
  //     .attach("image", "db-relation.png")
  //     .set({ Authorization: "admin.token" });

  //   console.log(res.body);
  //   expect(res.status).toEqual(401);
  // });
});

describe("getImage", function () {
  it("expect getting image by id", async () => {
    const res = await request.get("/api/images/" + image);

    expect(res.status).toEqual(200);
    expect(res.headers["content-type"]).toEqual("image/png");
  });

  it("expect getting error", async () => {
    const res = await request.get("/api/images/" + fake);

    expect(res.status).toEqual(404);
  });

  it("expect getting params error", async () => {
    const res = await request.get("/api/images/hnkdf54b-dfffdbdv-dbb");

    expect(res.status).toEqual(412);
  });

  afterAll(async () => {
    await model.deleteUser(admin.id as string);
  });
});
