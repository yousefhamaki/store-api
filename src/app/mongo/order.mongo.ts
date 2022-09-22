import Order from "../types/order.type";
import Schema from "../schema/order.schema";

class orderMongo {
  async create(info: Order) {
    try {
      const order = new Schema(info);
      const created = await order.save();

      return created;
    } catch (err) {
      throw new Error(
        `unable to cache order info of ${info.id as string} : ${
          (err as Error).message
        }`
      );
    }
  }

  async getUserOrders(id: string) {
    try {
      const orders = Schema.find({ user_id: id });

      return orders;
    } catch (err) {
      throw new Error(
        `unable to get orders cache order info of ${id as string} : ${
          (err as Error).message
        }`
      );
    }
  }

  async getOrder(id: string) {
    try {
      const order = Schema.findOne({ id: id });

      return order;
    } catch (err) {
      throw new Error(
        `unable to get order cache order info of ${id as string} : ${
          (err as Error).message
        }`
      );
    }
  }

  async getCompletedOrders(id: string) {
    try {
      const orders = Schema.find({ user_id: id }).where({ status: "complete" });

      return orders;
    } catch (err) {
      throw new Error(
        `unable to get orders cache order info of ${id as string} : ${
          (err as Error).message
        }`
      );
    }
  }

  async getActiveOrders(id: string) {
    try {
      const orders = Schema.find({ user_id: id }).where({ status: "active" });

      return orders;
    } catch (err) {
      throw new Error(
        `unable to get orders cache order info of ${id as string} : ${
          (err as Error).message
        }`
      );
    }
  }

  async updateOrder(order: Order) {
    try {
      const data = await Schema.updateOne(order).where({ id: order.id });

      return data;
    } catch (err) {
      throw new Error(
        `unable to update cache order info of ${order.id} : ${
          (err as Error).message
        }`
      );
    }
  }

  async remove(id: string) {
    try {
      const order = await Schema.deleteOne({ id: id });

      return order;
    } catch (err) {
      throw new Error(
        `unable to remove cache of order info of ${id as string} : ${
          (err as Error).message
        }`
      );
    }
  }
}

export default orderMongo;
