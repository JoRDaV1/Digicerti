import express from "express";
import {validationResult } from "express-validator";
import blockinfo from "../models/blockinfo";

const router = express.Router();

router.post("/blockinfo", async (req, res) => {
  try {
    const blockdetails = req.body.blockdetails;
    const id = req.body.studentarr._id;

    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const block = new blockinfo({
      id: id,
      transhash: blockdetails.hash,
      chainId: blockdetails.chainId,
      from: blockdetails.from,
      to: blockdetails.to,
    });
    console.log(block);

    const savedblock = await block.save();

    res.json(savedblock);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/blockinfo2", async (req, res) => {
  try {
    const blockdetails = req.body.blockdetails;
    console.log(req.body.studentarr);

    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id = req.header("certificateid");
    const block = new blockinfo({
      id,
      transhash: blockdetails.hash,
      chainId: blockdetails.chainId,
      from: blockdetails.from,
      to: blockdetails.to,
    });
    console.log(block);

    const savedblock = await block.save();

    res.json(savedblock);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/blockinfo", async (req, res) => {
  try {
    const Id = req.header("certificateId");
    const cdetails = await blockinfo.find({ id: Id });

    res.json(cdetails);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

export default router