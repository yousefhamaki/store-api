"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const config_1 = __importDefault(require("../config"));
const pool = new pg_1.Pool({
    host: config_1.default.dbhost,
    database: config_1.default.database,
    user: config_1.default.dbuser,
    password: config_1.default.dbpass,
    port: parseInt(config_1.default.dbport, 10),
    max: 4,
});
pool.on("error", (err) => {
    console.error(err.message);
});
exports.default = pool;
