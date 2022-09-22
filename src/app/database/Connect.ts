import { Pool } from "pg";
import config from "../config";
// import { Client } from "pg";
// import dotenv from "dotenv";

const pool = new Pool({
  host: config.dbhost,
  database: config.database,
  user: config.dbuser,
  password: config.dbpass,
  port: parseInt(config.dbport as string, 10),
  max: 4,
});

pool.on("error", (err: Error) => {
  console.error(err.message);
});

export default pool;

// dotenv.config();
// const client = new Client({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false,
//   },
// });

// export default client;
