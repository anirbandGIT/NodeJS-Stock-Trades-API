const express = require("express");
const router = express.Router();
const Trade = require("../models/trades");

// http://localhost:8000/trades
router.post("/", async (req, res) => {
  try {
    const initialId = 0;
    const trade = new Trade({
      id: initialId,
      type: req.body.type,
      user_id: req.body.user_id,
      symbol: req.body.symbol,
      shares: req.body.shares,
      price: req.body.price,
      timestamp: req.body.timestamp,
    });
    const acceptedTypes = ["buy", "sell"];
    if (req.body.type && acceptedTypes.indexOf(req.body.type) === -1) {
      res.status(400).json({
        error: "Bad request",
      });
      return;
    } else if (req.body.shares < 1 || req.body.shares > 100) {
      res.status(400).json({
        error: "Bad request",
      });
      return;
    }
    let createdTradeEntry = await trade.save();
    const allTradeEntries = await Trade.find({});

    createdTradeEntry.id = allTradeEntries.length;

    const modifiedTradeEntry = await createdTradeEntry.save();

    res.status(201).json({
      id: modifiedTradeEntry.id,
      type: modifiedTradeEntry.type,
      user_id: modifiedTradeEntry.user_id,
      symbol: modifiedTradeEntry.symbol,
      shares: modifiedTradeEntry.shares,
      price: modifiedTradeEntry.price,
      timestamp: modifiedTradeEntry.timestamp,
    });
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// http://localhost:8000/trades/...
router.get("/:id", async (req, res) => {
  try {
    const retrievedTrade = await Trade.findOne({
      id: req.params.id,
    });
    if (retrievedTrade === null) {
      res.status(404).send("ID not found");
      return;
    }
    console.log(retrievedTrade);

    res.status(200).json({
      id: retrievedTrade.id,
      type: retrievedTrade.type,
      user_id: retrievedTrade.user_id,
      symbol: retrievedTrade.symbol,
      shares: retrievedTrade.shares,
      price: retrievedTrade.price,
      timestamp: retrievedTrade.timestamp,
    });
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// http://localhost:8000/trades
router.get("/", async (req, res) => {
  try {
    const { type, user_id } = req.query;

    let query = {};
    type ? (query.type = type) : null;
    user_id ? (query.user_id = user_id) : null;

    let retrievedTradesArr;

    retrievedTradesArr = await Trade.find({ ...query }, { _id: 0 }).select(
      "id type user_id symbol shares price timestamp"
    );

    res.status(200).json(retrievedTradesArr);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// http://localhost:8000/trades/...
router.delete("/:id", async (req, res) => {
  res.status(405).send("Oeperation not allowed");
});

// http://localhost:8000/trades/...
router.put("/:id", async (req, res) => {
  res.status(405).send("Oeperation not allowed");
});

// http://localhost:8000/trades/...
router.patch("/:id", async (req, res) => {
  res.status(405).send("Oeperation not allowed");
});

module.exports = router;
