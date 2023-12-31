"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config1_1 = __importDefault(require("./config/config1"));
const database_1 = __importDefault(require("./db/database"));
(0, database_1.default)();
const app = (0, express_1.default)();
const port = config1_1.default.port;
app.get('/', (req, res) => {
    res.send('Hello World!');
});
const server = () => __awaiter(void 0, void 0, void 0, function* () {
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
});
server();
