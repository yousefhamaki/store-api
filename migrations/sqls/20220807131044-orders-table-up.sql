CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE orders (
    id uuid DEFAULT uuid_generate_v4()  PRIMARY KEY,
    user_id uuid REFERENCES users(id),
    -- payment_id uuid REFERENCES users(id),
    address VARCHAR(225),
    city VARCHAR(225),
    country VARCHAR(225),
    phone VARCHAR(15),
    postalCode VARCHAR(20),
    status VARCHAR(15)
);
