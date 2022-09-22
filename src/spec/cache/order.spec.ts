import Order from "../../app/types/order.type";
import orderMongo from "../../app/mongo/order.mongo";
import config from "../../app/config";

const model = new orderMongo();

const order = {
  id: "bkjhgbkjh",
  user_id: "hgfhn",
  products: [
    {
      id: "hgdhgc",
      quantity: 12,
    },
    {
      id: "gsfdgds",
      quantity: 9,
    },
    {
      id: "dfadcdz",
      quantity: 9,
    },
  ],
  city: "elmahalla elkopra",
  address: "32 mohammed abotahon street",
  country: "egypt",
  phone: "01094938462",
  postalCode: "+20",
  status: "active",
} as Order;

if (config.activeMongo) {
  describe("Testing (order cache model) mongo", function () {
    it("it expect new order created in orders from cache", async () => {
      const create = await model.create(order);

      expect(model.create).toBeDefined;
      expect(create.city).toEqual(order.city);
    });

    it("it expect get order from cache", async () => {
      const create = await model.getOrder(order.id as string);

      expect(model.getOrder).toBeDefined;
      expect(create?.city).toEqual(order.city);
    });

    it("it expect get orders from cache", async () => {
      const create = await model.getUserOrders(order.user_id as string);

      expect(model.getUserOrders).toBeDefined;
      expect(create[0].city).toEqual(order.city);
    });

    it("it expect get completed orders from cache", async () => {
      const create = await model.getCompletedOrders(order.user_id as string);

      expect(model.getCompletedOrders).toBeDefined;
      expect(create.length).toEqual(0);
    });

    it("it expect get active order from cache", async () => {
      const create = await model.getActiveOrders(order.user_id as string);

      expect(model.getActiveOrders).toBeDefined;
      expect(create[0].city).toEqual(order.city);
    });

    it("it expect remove order in orders from cache", async () => {
      const create = await model.remove(order.id as string);

      expect(model.remove).toBeDefined;
      expect(create.deletedCount).toEqual(1);
    });
  });
}
