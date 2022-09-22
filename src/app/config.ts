import dotenv from "dotenv";

dotenv.config();

const {
  PORT,
  PGHOST,
  NODE_ENV,
  PGUSER,
  PGPASSWORD,
  PGDATABASE,
  PGDATABASE_TEST,
  PGPORT,
  BCRYPT_PASSWORD,
  BCRYPT_ROUNDS,
  TOKEN_SECRET,
  MONGO_DB_NAME,
  PER_PAGE,
  ACTIVE_MONGO,
  REQUEST_LIMIT,
  TIME_LIMIT,
  MESSAGE_LIMIT,
  ACTIVE_HOME,
  EMAIL_GMAIL,
  PASSWORD_GMAIL,
} = process.env;

export default {
  port: PORT,
  dbhost: PGHOST,
  dbuser: PGUSER,
  dbpass: PGPASSWORD,
  database: NODE_ENV === "dev" ? PGDATABASE : PGDATABASE_TEST,
  dbport: PGPORT,
  pcryptPass: BCRYPT_PASSWORD,
  pacryptRounds: BCRYPT_ROUNDS,
  secretToken: TOKEN_SECRET,
  MongoDbName: MONGO_DB_NAME,
  perPage: Number(PER_PAGE),
  activeMongo: ACTIVE_MONGO === "true" ? true : false,
  RequestLimit: Number(REQUEST_LIMIT),
  TimeLimit: Number(TIME_LIMIT),
  MessageLimit: MESSAGE_LIMIT,
  ActiveHome: ACTIVE_HOME === "true" ? true : false,
  EmailGmail: EMAIL_GMAIL,
  GmailPassword: PASSWORD_GMAIL,
};
