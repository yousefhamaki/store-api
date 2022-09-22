"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config"));
const Gmail_1 = __importDefault(require("./Gmail"));
const mail = (options) => {
    options.from = config_1.default.EmailGmail;
    const result = {
        status: "waiting",
        data: {},
    };
    Gmail_1.default.sendMail(options, function (error, info) {
        if (error) {
            result.status = "failed";
            result.data = error;
        }
        else {
            result.status = "success";
            result.data = info;
        }
    });
    return result;
};
exports.default = mail;
