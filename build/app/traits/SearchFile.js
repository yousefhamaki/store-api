"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const SearchFile = (path) => {
    try {
        if (fs_1.default.existsSync(path)) {
            return true;
        }
        else {
            return false;
        }
    }
    catch (err) {
        return false;
    }
};
exports.default = SearchFile;
