import Branch from "../schema/Branch.schema";
import BranchType from "../types/branch.type";

class branchMongo {
  async create(info: BranchType) {
    try {
      const branch = new Branch({
        id: info.id,
        name: info.name,
        status: info.status,
        main_id: info.main,
        main_name: info.main_name,
        main_status: info.main_status,
      });
      const created = await branch.save();

      return created;
    } catch (err) {
      throw new Error(
        `unable to cache branch info of ${info.name} : ${
          (err as Error).message
        }`
      );
    }
  }

  async changeState(id: string, state: boolean) {
    try {
      const branch = await Branch.updateOne({ status: state }).where({
        id: id,
      });
      return branch;
    } catch (err) {
      throw new Error(
        `unable to update cache branch info of ${id} : ${
          (err as Error).message
        }`
      );
    }
  }

  async changeName(id: string, name: string) {
    try {
      const branch = await Branch.updateOne({ name: name }).where({ id: id });
      return branch;
    } catch (err) {
      throw new Error(
        `unable to update cache branch info of ${id} : ${
          (err as Error).message
        }`
      );
    }
  }

  async changeMain(id: string, main: string, name: string, status: boolean) {
    try {
      const branch = await Branch.updateOne({
        main_id: main,
        main_name: name,
        main_status: status,
      }).where({
        id: id,
      });
      return branch;
    } catch (err) {
      throw new Error(
        `unable to update cache branch info of ${id} : ${
          (err as Error).message
        }`
      );
    }
  }

  async changeMainName(id: string, name: string) {
    try {
      const branch = await Branch.updateMany({ main_name: name }).where({
        main_id: id,
      });
      return branch;
    } catch (err) {
      throw new Error(
        `unable to update cache branch info of ${id} : ${
          (err as Error).message
        }`
      );
    }
  }

  async changeMainStatus(id: string, status: boolean) {
    try {
      const branch = await Branch.updateMany({ main_status: status }).where({
        main_id: id,
      });
      return branch;
    } catch (err) {
      throw new Error(
        `unable to update cache branch info of ${id} : ${
          (err as Error).message
        }`
      );
    }
  }

  async delete(
    id: string
  ): Promise<{ deletedCount: number; acknowledged: boolean }> {
    try {
      const branch = await Branch.deleteOne({ id: id });
      return branch;
    } catch (err) {
      throw new Error(
        `unable to delete cache branch info of ${id} : ${
          (err as Error).message
        }`
      );
    }
  }
}

export default branchMongo;
