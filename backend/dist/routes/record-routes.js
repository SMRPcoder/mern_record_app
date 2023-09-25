"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthUser_1 = __importDefault(require("../middleware/AuthUser"));
const RecordController_1 = require("../controller/RecordController");
const RecordRouter = (0, express_1.Router)();
RecordRouter.post("/start", AuthUser_1.default, RecordController_1.startRecording);
RecordRouter.post("/stop", AuthUser_1.default, RecordController_1.stopRecording);
exports.default = RecordRouter;
