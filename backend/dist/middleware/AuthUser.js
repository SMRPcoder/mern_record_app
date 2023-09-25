"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createJwt_1 = require("../function/createJwt");
const AuthUser = (req, res, next) => {
    const { authorization } = req.headers;
    if (authorization) {
        const token = authorization.split(" ")[1];
        const userData = (0, createJwt_1.verifyJwt)(token);
        if (typeof userData == "object" && "id" in userData) {
            req.userId = userData.id;
            next();
        }
        else {
            res.status(401).json({ message: "UnAuthorized Token Provided", status: false });
        }
    }
    else {
        res.status(401).json({ message: "Token Not Provided", status: false });
    }
};
exports.default = AuthUser;
