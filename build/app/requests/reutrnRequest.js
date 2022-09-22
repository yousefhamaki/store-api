"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validReturn = (errors) => {
    return {
        status: "failed",
        message: "validation error",
        data: errors,
    };
};
exports.default = validReturn;
