"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mainbranch_controller_1 = __importDefault(require("../../controller/mainbranch.controller"));
const ValidateToken_middleware_1 = __importDefault(require("../../middleware/ValidateToken.middleware"));
const Authorization_middleware_1 = require("../../middleware/Authorization.middleware");
const branch_router_1 = __importDefault(require("./admin/branch.router"));
const controller = new mainbranch_controller_1.default();
const router = (0, express_1.Router)();
router.get("/menu", controller.getMenu);
router.use("/admin", ValidateToken_middleware_1.default, Authorization_middleware_1.isAdmin, branch_router_1.default);
exports.default = router;
