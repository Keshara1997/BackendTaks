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
const accounting_1 = require("../controllers/accounting");
const router = express_1.default.Router();
router.get('/getAccounting', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accounting = yield (0, accounting_1.getAccounting)();
        res.status(200).json({ massage: "success", data: accounting });
    }
    catch (err) {
        res.status(400).json({ massage: "error", data: err });
    }
}));
router.get('/getAccountingById/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accounting = yield (0, accounting_1.getAccountingById)(req.params.id);
        res.status(200).json({ massage: "success", data: accounting });
    }
    catch (err) {
        res.status(400).json({ massage: "error", data: err });
    }
}));
router.post('/addAccounting', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accounting = yield (0, accounting_1.addAccounting)(req.body);
        res.status(200).json({ massage: "success", data: accounting });
    }
    catch (err) {
        res.status(400).json({ massage: "error", data: err });
    }
}));
router.put('/updateAccounting/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accounting = yield (0, accounting_1.updateAccounting)(req.params.id, req.body);
        res.status(200).json({ massage: "success", data: accounting });
    }
    catch (err) {
        res.status(400).json({ massage: "error", data: err });
    }
}));
router.delete('/deleteAccounting/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accounting = yield (0, accounting_1.deleteAccounting)(req.params.id);
        res.status(200).json({ massage: "success", data: accounting });
    }
    catch (err) {
        res.status(400).json({ massage: "error", data: err });
    }
}));
exports.default = router;
