CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE branches (
    id uuid DEFAULT uuid_generate_v4()  PRIMARY KEY,
    name VARCHAR(50),
    main  uuid REFERENCES main_branches(id),
    status Boolean DEFAULT true
);