"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const reutrnRequest_1 = __importDefault(require("../requests/reutrnRequest"));
const CheckQuery_1 = __importDefault(require("../traits/CheckQuery"));
const Query = (required) => {
    return (req, res, next) => {
        let data = req.method === "GET" ? req.params : req.body;
        if (req.method === "DELETE") {
            data = req.params;
        }
        const requestInfo = (0, CheckQuery_1.default)(data, required);
        if (requestInfo.length > 0) {
            return res.status(412).json((0, reutrnRequest_1.default)(requestInfo));
        }
        else {
            return next();
        }
    };
};
exports.default = Query;
