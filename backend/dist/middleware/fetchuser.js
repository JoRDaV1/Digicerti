"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_TOKEN = process.env.JWT_TOKEN;
const fetchuser = (req, res, next) => {
    const token = req.header("auth-token");
    if (!token) {
        return res.status(401).send({ error: "Please authenticate using a valid token" });
    }
    try {
        if (!JWT_TOKEN) {
            throw new Error("JWT token is not defined");
        }
        const rawdata = jsonwebtoken_1.default.verify(token || "", JWT_TOKEN);
        req.user = rawdata.user;
        next();
    }
    catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token" });
    }
};
exports.default = fetchuser;
