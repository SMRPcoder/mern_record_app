"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthController_1 = require("../controller/AuthController");
const AuthRouter = (0, express_1.Router)();
AuthRouter.post("/login", AuthController_1.login);
exports.default = AuthRouter;
