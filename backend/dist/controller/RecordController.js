"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stopRecording = exports.startRecording = void 0;
const Media_1 = __importDefault(require("../models/Media"));
const startRecording = (req, res) => {
    try {
        const { type, status } = req.body;
        // we want userId so get it from middleware
        const userId = req.userId;
        const newMedia = new Media_1.default({
            status, type, userId
        });
        newMedia.save().then(data => {
            res.status(200).json({ message: "Started Recording", status: true, data });
        }).catch(err => {
            console.error(`Error Happend While Saving Record: ${err}`);
            res.status(500).json({ message: "Error Happend While Saving Record", status: false });
        });
    }
    catch (error) {
        console.error(`Error Happend While Start Recording: ${Error}`);
        res.status(500).json({ message: "Error Happend While Start Recording", status: false });
    }
};
exports.startRecording = startRecording;
const stopRecording = (req, res) => {
    try {
        const { mediaId, path, status } = req.body;
        Media_1.default.findByIdAndUpdate(mediaId, { path, status }).then(data => {
            if (data) {
                res.status(200).json({ message: "Stopped Recording", data, status: true });
            }
            else {
                res.status(200).json({ message: "Record Data is not found", status: true });
            }
        }).catch(err => {
            console.error(`Error Happend While Updating Record: ${err}`);
            res.status(500).json({ message: "Error Happend While Updating Record", status: false });
        });
    }
    catch (error) {
        console.error(`Error Happend While Stop Recording: ${Error}`);
        res.status(500).json({ message: "Error Happend While Stop Recording", status: false });
    }
};
exports.stopRecording = stopRecording;
