"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, "../../.env") });
const username = process.env.MONGO_USERNAME;
const password = process.env.MONGO_PASSWORD;
const clustername = process.env.MONGO_CLUSTER;
const dbname = process.env.MONGO_DBNAME;
const uri = `mongodb+srv://${username}:${password}@${clustername}/${dbname}?retryWrites=true&w=majority`;
const connection = () => mongoose_1.default.connect(uri).then(() => {
    console.log("connection established successfully");
}).catch(err => {
    console.error(`Error while connecting to mongodb: ${err}`);
});
exports.default = connection;
