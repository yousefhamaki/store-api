CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE main_branches (
    id uuid DEFAULT uuid_generate_v4()  PRIMARY KEY,
    name VARCHAR(50),
    status Boolean DEFAULT true
);