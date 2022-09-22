CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE products (
    id uuid DEFAULT uuid_generate_v4()  PRIMARY KEY,
    title VARCHAR(50),
    images json NOT NULL,
    describtion VARCHAR(255),
    price integer NOT NULL,
    isonSale boolean DEFAULT false,
    countinstroke integer NOT NULL,
    branch  uuid REFERENCES branches(id) NOT NULL,
    salePrice integer NOT NULL
);