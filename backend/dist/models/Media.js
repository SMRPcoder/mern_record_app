"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const MediaSchema = new mongoose_1.Schema({
    userId: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    path: {
        type: String
    },
});
const Media = (0, mongoose_1.model)("Media", MediaSchema);
exports.default = Media;
