"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("mysql"));
// import config from '../config/config1';
const config1_1 = __importDefault(require("../config/config1"));
const connection = () => {
    const conect = mysql_1.default.createConnection({
        host: config1_1.default.dbHost,
        user: config1_1.default.dbUser,
        password: config1_1.default.dbPassword,
        database: config1_1.default.dbDatabase,
        port: config1_1.default.dbPort,
    });
    conect.connect((err) => {
        if (err) {
            console.log('Error connecting to Db ' + err);
            process.exit(1);
        }
        console.log('Connection MYSQL DATABASE');
    });
    return conect;
};
exports.default = connection;
