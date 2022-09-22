"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const Error_middleware_1 = __importDefault(require("./app/middleware/Error.middleware"));
const config_1 = __importDefault(require("./app/config"));
const index_1 = __importDefault(require("./app/routes/index"));
const cache_1 = __importDefault(require("./app/database/cache"));
const Handler_controller_1 = __importDefault(require("./app/controller/Handler.controller"));
const PORT = config_1.default.port || 5000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, morgan_1.default)("common"));
app.use((0, helmet_1.default)());
app.use((0, express_rate_limit_1.default)({
    windowMs: config_1.default.TimeLimit * (60 * 1000),
    max: config_1.default.RequestLimit,
    standardHeaders: true,
    legacyHeaders: false,
    message: config_1.default.MessageLimit,
}));
if (config_1.default.ActiveHome) {
    app.get("/", Handler_controller_1.default.Home);
}
if (config_1.default.activeMongo) {
    (0, cache_1.default)();
}
app.use("/api", index_1.default);
app.use(Error_middleware_1.default);
app.use(Handler_controller_1.default.Error404);
app.listen(PORT, () => console.log(`server is listening on port ${PORT}`));
exports.default = app;
