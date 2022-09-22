import User from "../schema/user.schema";
import config from "../config";
import UserType from "../types/user.type";

class UserMongo {
  async create(info: UserType) {
    try {
      const user = new User({
        id: info.db_id,
        firstname: info.firstname,
        lastname: info.lastname,
        username: info.username,
        email: info.email,
        rank: info.rank,
      });
      const created = await user.save();

      return created;
    } catch (err) {
      throw new Error(
        `unable to cache user info of ${info.db_id} : ${(err as Error).message}`
      );
    }
  }

  async getAll(page: number) {
    try {
      const skip = ((page - 1) * Number(config.perPage)) as number;
      const users = await User.find({}).limit(10).skip(skip);
      return users;
    } catch (err) {
      throw new Error(
        `unable to get users info of page ${page} : ${(err as Error).message}`
      );
    }
  }

  async getUser(id: string) {
    try {
      const user = await User.findOne({ id: id });
      return user;
    } catch (err) {
      throw new Error(
        `unable to get user info of ${id} : ${(err as Error).message}`
      );
    }
  }

  async deleteUser(
    id: string
  ): Promise<{ deletedCount: number; acknowledged: boolean }> {
    try {
      const user = await User.deleteOne({ id: id });
      return user;
    } catch (err) {
      throw new Error(
        `unable to delete cache user info of ${id} : ${(err as Error).message}`
      );
    }
  }

  async updateInfo(user: UserType) {
    try {
      const info = await User.updateOne({
        id: user.id,
        username: user.username,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
      }).where({ id: user.id });
      return info;
    } catch (err) {
      throw new Error(
        `unable to update user info of ${user.id} : ${(err as Error).message}`
      );
    }
  }

  async searchEmail(email: string) {
    try {
      const user = await User.findOne({ email: email });
      return user;
    } catch (err) {
      throw new Error(
        `unable to get data of ${email} : ${(err as Error).message}`
      );
    }
  }

  async searchUserName(username: string) {
    try {
      const user = await User.findOne({ username: username });
      return user;
    } catch (err) {
      throw new Error(
        `unable to get data of ${username} : ${(err as Error).message}`
      );
    }
  }
}

export default UserMongo;
