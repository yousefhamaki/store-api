import ProductOrder from "./products_order";

type Order = {
  id?: string;
  user_id: string;
  order_id?: string;
  product_id?: string;
  products: ProductOrder[];
  status: string;
  address: string;
  city: string;
  country: string;
  phone: string;
  postalCode?: string;
  postalcode?: string;
};

export default Order;
