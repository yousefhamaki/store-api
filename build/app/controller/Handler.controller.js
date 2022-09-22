"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Error404 = (_req, res) => {
    res.status(404).json({
        status: "error",
        message: "ohh you are lost, read the documentation to find your way",
    });
};
exports.Home = (_, res) => {
    return res.status(200).json({
        status: "success",
        message: "Welcome to store App",
    });
};
exports.default = exports;
