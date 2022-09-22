"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HandleUnauthError = (next) => {
    const err = new Error("error Auth: please try again");
    err.status = 401;
    next(err);
};
exports.default = HandleUnauthError;
