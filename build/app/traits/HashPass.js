"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config"));
const bcrypt_1 = __importDefault(require("bcrypt"));
exports.MakeHash = (pass) => {
    const rounds = parseInt(config_1.default.pacryptRounds, 10);
    return bcrypt_1.default.hashSync(`${config_1.default.pcryptPass}${pass}`, rounds);
};
exports.check = (pass, hash) => {
    return bcrypt_1.default.compareSync(`${config_1.default.pcryptPass}${pass}`, hash);
};
exports.default = exports;
