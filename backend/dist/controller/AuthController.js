"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const User_1 = __importDefault(require("../models/User"));
const createJwt_1 = require("../function/createJwt");
const login = (req, res) => {
    try {
        const { name, email } = req.body;
        User_1.default.where({ email }).findOne().then(data => {
            if (data) {
                // jwt
                var token = (0, createJwt_1.createJwt)({ name, email, id: data._id });
                res.status(200).json({ message: "Logged in successfully", token, status: true });
            }
            else {
                const newUser = new User_1.default({ email, name });
                newUser.save().then(sdata => {
                    // jwt
                    var token = (0, createJwt_1.createJwt)({ name, email, id: sdata._id });
                    res.status(200).json({ message: "User created Successfully", token, status: true });
                }).catch(err => {
                    console.log("Error while saving the User: ", err);
                    res.status(200).json({ message: "Error User Not Saved And Logged in", status: false });
                });
            }
        });
    }
    catch (error) {
        console.log(`Error while Logging in the User: ${error}`);
        res.status(500).json({ message: "Error while Logging in the User" });
    }
};
exports.login = login;
