import UserMongo from "../../app/mongo/user.mongo";
import User from "../../app/types/user.type";
import config from "../../app/config";

const model = new UserMongo();

const user = {
  firstname: "yousef",
  lastname: "hamaki2",
  username: "yousef-hamaki",
  email: "yousefhamaki3@gmail.com",
  rank: "user",
  db_id: "adfaefead",
} as User;

const user2 = {
  firstname: "yousef",
  lastname: "hamaki",
  username: "yousef-hamaki",
  email: "yousefhamaki5@gmail.com",
  rank: "user",
  id: "adfaefead",
} as User;

if (config.activeMongo) {
  describe("Testing (user cache model) mongo", function () {
    it("it expect new user created", async () => {
      const create = await model.create(user);
      user.id = create.id as string;

      expect(model.create).toBeDefined;
      expect(create.id).toBeDefined;
      expect(create.firstname).toBeDefined;
      expect(create.lastname).toBeDefined;
      expect(create.username).toBeDefined;
      expect(create.email).toBeDefined;
    });

    it("it expect get users from cache", async () => {
      const create = await model.getAll(1);

      expect(model.getAll).toBeDefined;
      expect(create.length).toBeGreaterThan(0);
    });

    it("it expect get user by id from cache", async () => {
      const create = await model.getUser(user.db_id);

      expect(model.getUser).toBeDefined;
      expect(create?.id).toBeDefined;
      expect(create?.firstname).toEqual(user.firstname);
      expect(create?.lastname).toEqual(user.lastname);
      expect(create?.username).toEqual(user.username);
      expect(create?.email).toEqual(user.email);
    });

    it("it expect get user by username from cache", async () => {
      const create = await model.searchUserName(user.username);

      expect(model.searchUserName).toBeDefined;
      expect(create?.id).toBeDefined;
      expect(create?.firstname).toEqual(user.firstname);
      expect(create?.lastname).toEqual(user.lastname);
      expect(create?.username).toEqual(user.username);
      expect(create?.email).toEqual(user.email);
    });

    it("it expect get user by email from cache", async () => {
      const create = await model.searchEmail(user.email);

      expect(model.searchEmail).toBeDefined;
      expect(create?.id).toBeDefined;
      expect(create?.firstname).toEqual(user.firstname);
      expect(create?.lastname).toEqual(user.lastname);
      expect(create?.username).toEqual(user.username);
      expect(create?.email).toEqual(user.email);
    });

    it("it expect get user by username from cache", async () => {
      const create = await model.searchUserName("user.username");

      expect(model.searchUserName).toBeDefined;
      expect(create).toBeNull;
    });

    it("it expect get user by email from cache", async () => {
      const create = await model.searchEmail("user.email");

      expect(model.searchEmail).toBeDefined;
      expect(create).toBeNull;
    });

    it("it expect update user by id from cache", async () => {
      const create = await model.updateInfo(user2);

      expect(model.updateInfo).toBeDefined;
      expect(create.matchedCount).toEqual(1);
    });

    it("it expect user removed", async () => {
      const create = await model.deleteUser(user.db_id);

      expect(model.deleteUser).toBeDefined;
      expect(create.deletedCount).toEqual(1);
    });
  });
}
