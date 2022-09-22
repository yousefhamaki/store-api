import supertest from "supertest";
import app from "../../server";
import UserModel from "../../app/models/user.model";
import User from "../../app/types/user.type";
import Branch from "../../app/types/branch.type";

const model = new UserModel();
const request = supertest(app);

const admin = {
  firstname: "yousef",
  lastname: "hamaki2",
  username: "yousef-hamaki56",
  email: "admin@gmail.com",
  password: "Hamaki_26033",
  rank: "admin",
} as User;

const mainBranch = {
  name: "branch name",
  status: true,
} as Branch;

const mainBranch3 = {
  name: "branch2 name",
  status: true,
} as Branch;

const mainBranch2 = {
  name: "branch name",
};

const branch = {
  name: "first branch",
  status: true,
} as Branch;

describe("POST /api/branch/main/create", function () {
  beforeAll(async () => {
    const create = await model.create(admin);
    const res = await request.post("/api/user/login").send(admin);

    // jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000000;
    admin.token = res.body.data.token;
    admin.id = create.id;
  });

  it("returns status code `200`", async () => {
    const res = await request
      .post("/api/branch/admin/main/create")
      .send(mainBranch)
      .set({ Authorization: admin.token });

    mainBranch.id = res.body.data.id;
    branch.main = res.body.data.id;
    expect(res.status).toEqual(200);
    expect(typeof res.body).toBe("object");
    expect(res.body.status).toBe("success");
  });

  it("returns status code `200`", async () => {
    const res = await request
      .post("/api/branch/admin/main/create")
      .send(mainBranch3)
      .set({ Authorization: admin.token });

    mainBranch3.id = res.body.data.id;
    expect(res.status).toEqual(200);
    expect(typeof res.body).toBe("object");
    expect(res.body.status).toBe("success");
  });

  it("returns status code `500`", async () => {
    const res = await request
      .post("/api/branch/admin/main/create")
      .send({ name: mainBranch.id as string, status: "falhellose" })
      .set({ Authorization: admin.token });

    expect(res.status).toEqual(500);
    expect(typeof res.body).toBe("object");
    expect(res.body.status).toBe(500);
  });

  it("returns status code `401`", async () => {
    const res = await request
      .post("/api/branch/admin/main/create")
      .send(mainBranch);

    expect(res.status).toEqual(401);
    expect(typeof res.body).toBe("object");
    expect(res.body.status).toBe(401);
  });

  it("returns status code `412`", async () => {
    const res = await request
      .post("/api/branch/admin/main/create")
      .send(mainBranch2)
      .set({ Authorization: admin.token });

    expect(res.status).toEqual(412);
    expect(typeof res.body).toBe("object");
    expect(res.body.status).toBe("failed");
  });
});

describe("POST /api/branch/create", function () {
  it("returns status code `200`", async () => {
    const res = await request
      .post("/api/branch/admin/create")
      .send(branch)
      .set({ Authorization: admin.token });

    branch.id = res.body.data.id;
    expect(res.status).toEqual(200);
    expect(typeof res.body).toBe("object");
    expect(res.body.status).toBe("success");
  });

  it("returns status code `500`", async () => {
    const res = await request
      .post("/api/branch/admin/create")
      .send({
        name: mainBranch.id as string,
        status: "falhellose",
        main: "djkskcndsc-dvsdvs",
      })
      .set({ Authorization: admin.token });

    expect(res.status).toEqual(500);
    expect(typeof res.body).toBe("object");
    expect(res.body.status).toBe(500);
  });

  it("returns status code `401`", async () => {
    const res = await request.post("/api/branch/admin/create").send(branch);

    expect(res.status).toEqual(401);
    expect(typeof res.body).toBe("object");
    expect(res.body.status).toBe(401);
  });

  it("returns status code `412`", async () => {
    const res = await request
      .post("/api/branch/admin/create")
      .send({})
      .set({ Authorization: admin.token });

    expect(res.status).toEqual(412);
    expect(typeof res.body).toBe("object");
    expect(res.body.status).toBe("failed");
  });
});

describe("PUT /api/branch/main/change/name", function () {
  it("returns status code `200`", async () => {
    const res = await request
      .put("/api/branch/admin/main/change/name")
      .send({ id: mainBranch.id as string, name: "new name" })
      .set({ Authorization: admin.token });

    expect(res.status).toEqual(200);
    expect(typeof res.body).toBe("object");
    expect(res.body.status).toBe("success");
  });

  it("returns status code `401`", async () => {
    const res = await request
      .put("/api/branch/admin/main/change/name")
      .send({ id: mainBranch.id as string, name: "new name" });

    expect(res.status).toEqual(401);
    expect(typeof res.body).toBe("object");
    expect(res.body.status).toBe(401);
  });

  it("returns status code `412`", async () => {
    const res = await request
      .put("/api/branch/admin/main/change/name")
      .send(mainBranch2)
      .set({ Authorization: admin.token });

    expect(res.status).toEqual(412);
    expect(typeof res.body).toBe("object");
    expect(res.body.status).toBe("failed");
  });
});

describe("PUT /api/branch/menu", function () {
  it("returns status code `200`", async () => {
    const res = await request.get("/api/branch/menu");

    expect(res.status).toEqual(200);
    expect(typeof res.body).toBe("object");
    expect(res.body.status).toBe("success");
  });
});

describe("PUT /api/branch/change/name", function () {
  it("returns status code `200`", async () => {
    const res = await request
      .put("/api/branch/admin/change/name")
      .send({ id: branch.id as string, name: "new name" })
      .set({ Authorization: admin.token });

    expect(res.status).toEqual(200);
    expect(typeof res.body).toBe("object");
    expect(res.body.status).toBe("success");
  });

  it("returns status code `401`", async () => {
    const res = await request
      .put("/api/branch/admin/change/name")
      .send({ id: branch.id as string, name: "new name" });

    expect(res.status).toEqual(401);
    expect(typeof res.body).toBe("object");
    expect(res.body.status).toBe(401);
  });

  it("returns status code `412`", async () => {
    const res = await request
      .put("/api/branch/admin/change/name")
      .send(mainBranch2)
      .set({ Authorization: admin.token });

    expect(res.status).toEqual(412);
    expect(typeof res.body).toBe("object");
    expect(res.body.status).toBe("failed");
  });
});

describe("PUT /api/branch/change/state", function () {
  it("returns status code `200`", async () => {
    const res = await request
      .put("/api/branch/admin/change/state")
      .send({ id: branch.id as string, status: false })
      .set({ Authorization: admin.token });

    expect(res.status).toEqual(200);
    expect(typeof res.body).toBe("object");
    expect(res.body.status).toBe("success");
  });

  it("returns status code `401`", async () => {
    const res = await request
      .put("/api/branch/admin/change/state")
      .send({ id: branch.id as string, status: "new name" });

    expect(res.status).toEqual(401);
    expect(typeof res.body).toBe("object");
    expect(res.body.status).toBe(401);
  });

  it("returns status code `412`", async () => {
    const res = await request
      .put("/api/branch/admin/change/state")
      .send(mainBranch2)
      .set({ Authorization: admin.token });

    expect(res.status).toEqual(412);
    expect(typeof res.body).toBe("object");
    expect(res.body.status).toBe("failed");
  });
});

describe("PUT /api/branch/change/relation", function () {
  it("returns status code `200`", async () => {
    const res = await request
      .put("/api/branch/admin/change/relation")
      .send({ id: branch.id as string, main_id: mainBranch3.id as string })
      .set({ Authorization: admin.token });

    expect(res.status).toEqual(200);
    expect(typeof res.body).toBe("object");
    expect(res.body.status).toBe("success");
  });

  it("returns status code `401`", async () => {
    const res = await request
      .put("/api/branch/admin/change/relation")
      .send({ id: branch.id as string, status: "new name" });

    expect(res.status).toEqual(401);
    expect(typeof res.body).toBe("object");
    expect(res.body.status).toBe(401);
  });

  it("returns status code `412`", async () => {
    const res = await request
      .put("/api/branch/admin/change/relation")
      .send(mainBranch2)
      .set({ Authorization: admin.token });

    expect(res.status).toEqual(412);
    expect(typeof res.body).toBe("object");
    expect(res.body.status).toBe("failed");
  });
});

describe("PUT /api/branch/main/change/state", function () {
  it("returns status code `200`", async () => {
    const res = await request
      .put("/api/branch/admin/main/change/state")
      .send({ id: mainBranch.id as string, status: "false" })
      .set({ Authorization: admin.token });

    expect(res.status).toEqual(200);
    expect(typeof res.body).toBe("object");
    expect(res.body.status).toBe("success");
  });

  it("returns status code `500`", async () => {
    const res = await request
      .put("/api/branch/admin/main/change/state")
      .send({ id: mainBranch.id as string, status: "falhellose" })
      .set({ Authorization: admin.token });

    expect(res.status).toEqual(500);
    expect(typeof res.body).toBe("object");
    expect(res.body.status).toBe(500);
  });

  it("returns status code `401`", async () => {
    const res = await request
      .put("/api/branch/admin/main/change/state")
      .send({ id: mainBranch.id as string, status: false });

    expect(res.status).toEqual(401);
    expect(typeof res.body).toBe("object");
    expect(res.body.status).toBe(401);
  });

  it("returns status code `412`", async () => {
    const res = await request
      .put("/api/branch/admin/main/change/state")
      .send(mainBranch2)
      .set({ Authorization: admin.token });

    expect(res.status).toEqual(412);
    expect(typeof res.body).toBe("object");
    expect(res.body.status).toBe("failed");
  });
});

describe("DELETE /api/branch/main/create", function () {
  it("returns status code `200`", async () => {
    const res = await request
      .delete("/api/branch/admin/remove/" + branch.id)
      .set({ Authorization: admin.token });

    expect(res.status).toEqual(200);
  });

  it("returns status code `200`", async () => {
    const res = await request
      .delete("/api/branch/admin/main/remove/" + mainBranch.id)
      .set({ Authorization: admin.token });

    expect(res.status).toEqual(200);
  });

  it("returns status code `200`", async () => {
    const res = await request
      .delete("/api/branch/admin/main/remove/" + mainBranch3.id)
      .set({ Authorization: admin.token });

    expect(res.status).toEqual(200);
  });

  afterAll(async () => {
    await model.deleteUser(admin.id as string);
    // jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });
});
