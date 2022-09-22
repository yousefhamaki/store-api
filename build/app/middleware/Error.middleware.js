"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorMiddleware = (err, _req, res, _next) => {
    const status = err.status || 500;
    const message = err.message || "oops! some thing went wrong";
    res.status(status).json({ status, message });
};
exports.default = errorMiddleware;
