"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config = {
    dbHost: process.env.DB_HOST || "localhost",
    dbUser: process.env.DB_USER || "backendtest",
    dbPassword: process.env.DB_PASSWORD || "backendtest",
    dbDatabase: process.env.DB_DATABASE || "mifostenant-default",
    dbPort: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3367,
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
};
exports.default = config;
