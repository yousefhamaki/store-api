import config from "../config";
import db from "../database/Connect";
import insertOrder from "../traits/orderQuery";
import resetOrder from "../traits/resetOrder";
import Order from "../types/order.type";
import ProductOrder from "../types/products_order";

class orderModel {
  async create(order: Order): Promise<Order[]> {
    try {
      const connect = await db.connect();
      const query = insertOrder(order);
      const result = await connect.query(query);
      //release connection
      connect.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not create order : ${(err as Error).message}`);
    }
  }

  async getUserOrders(user_id: string): Promise<Order> {
    try {
      const connect = await db.connect();
      const query = `SELECT  
                      array_to_json(array_agg(products.*)) as products, 
                      orders.user_id, products_order.product_id,
                      orders.country, orders.address, orders.phone,
                      orders.postalCode, orders.status,
                      products_order.order_id  
                        FROM products
                        INNER JOIN products_order
                            ON products.id = products_order.product_id
                        INNER JOIN orders
                            ON orders.id = products_order.order_id
                        WHERE
                            orders.user_id = $1
                        AND
                            status='active'
                        GROUP BY
                            orders.user_id, products_order.product_id, products_order.order_id, orders.id
                        ORDER BY orders.id ASC;`;
      const result = await connect.query(query, [user_id]);
      connect.release();
      if (result.rows.length > 0) {
        return resetOrder(result.rows);
      } else {
        return result.rows[0];
      }
    } catch (err) {
      throw new Error(
        `Unable to get orders of this user ${user_id} : ${
          (err as Error).message
        }`
      );
    }
  }

  async getOrder(id: string): Promise<Order> {
    try {
      const connect = await db.connect();
      const query = `SELECT  
                      array_to_json(array_agg(products.*)) as products, 
                      orders.user_id, products_order.product_id,
                      orders.country, orders.address, orders.phone,
                      orders.postalCode, orders.status,
                      products_order.order_id  
                        FROM products
                        INNER JOIN products_order
                            ON products.id = products_order.product_id
                        INNER JOIN orders
                            ON orders.id = products_order.order_id
                        WHERE
                            orders.id = $1
                        GROUP BY
                            orders.user_id, products_order.product_id, products_order.order_id, orders.id
                        ORDER BY orders.id ASC;`;
      const result = await connect.query(query, [id]);
      connect.release();
      if (result.rows.length > 0) {
        return resetOrder(result.rows);
      } else {
        return result.rows[0];
      }
    } catch (err) {
      throw new Error(`Could not get order ${id} : ${(err as Error).message}`);
    }
  }

  async completedOrders(user_id: string): Promise<Order[]> {
    try {
      const connect = await db.connect();
      const query = `SELECT id, country, address, phone,postalCode, status, city
                      FROM orders
                      WHERE
                        user_id = $1
                      AND
                          status='complete'
                      ORDER BY id ASC;`;
      const result = await connect.query(query, [user_id]);
      connect.release();
      return result.rows;
    } catch (err) {
      throw new Error(
        `Unable to get orders of this user ${user_id} : ${
          (err as Error).message
        }`
      );
    }
  }

  async getActiveOrders(): Promise<Order[]> {
    try {
      const connect = await db.connect();
      const query = `SELECT  
                      id, country, address, phone,postalCode, status, city
                        FROM orders
                        WHERE
                            status='active'
                        ORDER BY id ASC;`;
      const result = await connect.query(query);
      connect.release();
      return result.rows;
    } catch (err) {
      throw new Error(
        `Unable to get active orders  : ${(err as Error).message}`
      );
    }
  }

  async removeOrder(id: string): Promise<Order> {
    try {
      const connect = await db.connect();
      const query = `WITH products_order AS (
                DELETE from products_order WHERE order_id = $1 returning *
            )
            DELETE from orders WHERE id=$1 returning *;`;
      const result = await connect.query(query, [id]);
      //release connection
      connect.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not remove order : ${(err as Error).message}`);
    }
  }

  async mostselled(): Promise<ProductOrder[]> {
    try {
      const connect = await db.connect();
      const query = `SELECT products_order.product_id, SUM(products_order.quantity) AS TotalQuantity,
                  products.title, products.images, products.price, products.isonsale,
                  products.branch, products.saleprice, branches.name AS branchName
                  from products_order
                  INNER JOIN products
                  ON products_order.product_id = products.id
                  INNER JOIN branches
                  ON branches.id = products.branch AND branches.status=true
                  GROUP BY products_order.product_id, products.id, branches.id
                  ORDER BY SUM(products_order.quantity) DESC
                  LIMIT 5;`;
      const result = await connect.query(query);
      connect.release();
      return result.rows;
    } catch (err) {
      throw new Error(
        `Unable to get most products saled  : ${(err as Error).message}`
      );
    }
  }

  async getAllOrders(page: number): Promise<Order[]> {
    try {
      const perPage = config.perPage;
      const skip = (page - 1) * perPage;

      const connect = await db.connect();
      const query = `SELECT id, country, address, phone,postalCode, status, city
                    FROM orders ORDER BY id ASC LIMIT $1 OFFSET $2;`;
      const result = await connect.query(query, [perPage, skip]);
      connect.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Unable to get orders  : ${(err as Error).message}`);
    }
  }

  async countRows(tableName: string): Promise<number> {
    try {
      const connect = await db.connect();
      const query = `SELECT count(*) FROM ${tableName};`;
      const result = await connect.query(query);
      connect.release();
      return Number(result.rows[0].count);
    } catch (err) {
      throw new Error(`Unable to get orders  : ${(err as Error).message}`);
    }
  }

  async changeState(id: string, state: string): Promise<Order> {
    try {
      const connect = await db.connect();
      const query = `UPDATE orders SET status=$1 WHERE id=$2 returning *;`;
      const result = await connect.query(query, [state, id]);
      connect.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Unable to change order state  : ${(err as Error).message}`
      );
    }
  }
}

export default orderModel;
