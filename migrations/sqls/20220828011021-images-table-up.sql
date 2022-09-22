CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE images (
    id uuid DEFAULT uuid_generate_v4()  PRIMARY KEY,
    content text,
    size INTEGER,
    type VARCHAR(50)
);