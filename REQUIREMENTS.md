## API Endpoints

#### Products

- Index {link: http://localhost:5000/api/product, method: [GET], required: [token]}
- Show {link: http://localhost:5000/api/product/:id, method: [GET], required: [token][:id is product id]}
- Create {link: http://localhost:5000/api/product/create, method: [POST], required: [token][name, price]}

#### Users

- Index {link: http://localhost:5000/api/user, method: [GET], required: [token]}
- Show {link: http://localhost:5000/api/user/:id, method: [GET], required: [:id equal user id][token]}
- Create {link: http://localhost:5000/api/user, method: [POST], required: [username,firstname,
  lastname, email, password]}
- login {link: http://localhost:5000/api/user/login, method: [POST], required: [email, password]}
- Update {link: http://localhost:5000/api/user/change, method: [PUT], required: [token][username,firstname, lastname, email]}
- Update {link: http://localhost:5000/api/user/change/:id, method: [PUT], required: [token][:id equal user id][oldpass, newpass]}
- Delete {link: http://localhost:5000/api/user/delete/:id, method: [DELETE], required: [token][:id equal user id]}

#### Orders

- Index (User Orders) {link: http://localhost:5000/api/order/me, method: [GET], required: [token]}
- Show {link: http://localhost:5000/api/order/details/:id, method: [GET], required: [token][:id is order_id]} **Notice** It will only return the order details to the initiator of the order otherwise it will return an empty object
- Create {link: http://localhost:5000/api/order/create, method: [POST], required: [token][products][products must be array contains objects][{id: product_id, quantity: quantity of this product}]
- Completed Orders {link: http://localhost:5000/api/order/completed, method: [GET], required: [token]}

## Data Shapes

#### Product

- id character uuid uuid_generate_v4()
- name VARCHAR(50)
- price VARCHAR(50)

#### User

- id character uuid uuid_generate_v4()
- email VARCHAR(50)
- firstName VARCHAR(50)
- lastName VARCHAR(50)
- password VARCHAR(255)

#### Orders

- id character uuid uuid_generate_v4()
- user_id character uuid uuid_generate_v4()
- status of order (active or complete) VARCHAR(50)

#### product_orders

- id character uuid uuid_generate_v4()
- product_id character uuid uuid_generate_v4()
- order_id uuid uuid_generate_v4()
- quantity integer
