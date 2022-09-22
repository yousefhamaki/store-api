CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE product_features (
    id uuid DEFAULT uuid_generate_v4()  PRIMARY KEY,
    product_id uuid REFERENCES products(id),
    feature VARCHAR(50)
);