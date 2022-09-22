import branchMongo from "../../app/mongo/Branch.mongo";
import Branch from "../../app/types/branch.type";
import config from "../../app/config";

const model = new branchMongo();

const branch = {
  id: "dfwefvcd",
  name: "first branch",
  status: true,
  main: "hgcnhv",
  main_name: "jfhkdfvcdsf",
  main_status: true,
} as Branch;

if (config.activeMongo) {
  describe("Testing (Branch cache model) mongo", function () {
    it("it expect new branch created in branch from cache", async () => {
      const create = await model.create(branch);

      expect(model.create).toBeDefined;
      expect(create.name).toEqual(branch.name);
    });

    it("it expect change branch state in branch from cache", async () => {
      const create = await model.changeState(branch.id as string, false);

      expect(model.changeState).toBeDefined;
      expect(create.matchedCount).toEqual(1);
    });

    it("it expect change branch name in branch from cache", async () => {
      const create = await model.changeName(
        branch.id as string,
        "edit branch name"
      );

      expect(model.changeName).toBeDefined;
      expect(create.matchedCount).toEqual(1);
    });

    it("it expect change branch main_name in branch from cache", async () => {
      const create = await model.changeMainName(
        branch.main as string,
        "new name"
      );

      expect(model.changeMain).toBeDefined;
      expect(create.matchedCount).toEqual(1);
    });

    it("it expect change branch main_state in branch from cache", async () => {
      const create = await model.changeMainStatus(branch.main as string, true);

      expect(model.changeMain).toBeDefined;
      expect(create.matchedCount).toEqual(1);
    });

    it("it expect change branch main_info in branch from cache", async () => {
      const create = await model.changeMain(
        branch.id as string,
        "main_id",
        "name",
        false
      );

      expect(model.changeMain).toBeDefined;
      expect(create.matchedCount).toEqual(1);
    });

    it("it expect remove branch in branch from cache", async () => {
      const create = await model.delete(branch.id as string);

      expect(model.delete).toBeDefined;
      expect(create.deletedCount).toEqual(1);
    });
  });
}
