"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const blockinfo_1 = __importDefault(require("../models/blockinfo"));
const router = express_1.default.Router();
router.post("/blockinfo", async (req, res) => {
    try {
        const blockdetails = req.body.blockdetails;
        const id = req.body.studentarr._id;
        // If there are errors, return Bad request and the errors
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const block = new blockinfo_1.default({
            id: id,
            transhash: blockdetails.hash,
            chainId: blockdetails.chainId,
            from: blockdetails.from,
            to: blockdetails.to,
        });
        console.log(block);
        const savedblock = await block.save();
        res.json(savedblock);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});
router.post("/blockinfo2", async (req, res) => {
    try {
        const blockdetails = req.body.blockdetails;
        console.log(req.body.studentarr);
        // If there are errors, return Bad request and the errors
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const id = req.header("certificateid");
        const block = new blockinfo_1.default({
            id,
            transhash: blockdetails.hash,
            chainId: blockdetails.chainId,
            from: blockdetails.from,
            to: blockdetails.to,
        });
        console.log(block);
        const savedblock = await block.save();
        res.json(savedblock);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});
router.get("/blockinfo", async (req, res) => {
    try {
        const Id = req.header("certificateId");
        const cdetails = await blockinfo_1.default.find({ id: Id });
        res.json(cdetails);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});
exports.default = router;
