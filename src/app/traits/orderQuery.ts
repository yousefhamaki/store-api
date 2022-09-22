import Order from "../types/order.type";

const insertOrder = (order: Order): string => {
  let result = `WITH orders as (
    INSERT INTO orders(user_id, address, city, country, phone, postalCode, status) 
    VALUES ('${order.user_id}', '${order.address}', '${order.city}',
    '${order.country}', '${order.phone}', '${order.postalCode}', '${order.status}') returning *)
    INSERT INTO products_order(order_id, product_id, quantity) 
    VALUES  `;

  const returning = " returning *;";
  const products = order.products;

  for (let x = 0; x < products.length; x++) {
    let plus = "";
    if (x === products.length - 1) {
      plus = `((select orders.id from orders), '${products[x].product_id}','${products[x].quantity}')`;
    } else {
      plus = `((select orders.id from orders),'${products[x].product_id}','${products[x].quantity}'), `;
    }
    result = result + plus;
  }
  result = result + returning;
  return result;
};

export default insertOrder;
