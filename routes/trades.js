const express = require("express");
const router = express.Router();
const Trade = require("../models/trades"); // new

// post request to /trades
router.post("/", async (req, res) => {
  const trade = new Trade({
    type: req.body.type,
    user_id: req.body.user_id,
    symbol: req.body.symbol,
    shares: req.body.shares,
    price: req.body.price,
    timestamp: req.body.timestamp,
  });

  trade
    .save()
    .then((response) => {
      console.log(res);
      res.status(201).json(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({
        error: error,
      });
    });
});

router.get("/:id", async (req, res) => {
  Trade.findOne({
    _id: req.params.id,
  })
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
});

router.get("/", async (req, res) => {
  const { type, user_id } = req.query;
  if (type) {
    Trade.find({
      type,
    })
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((error) => {
        res.status(404).json({
          error: error,
        });
      });
  } else if (user_id) {
    Trade.find({
      user_id,
    })
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((error) => {
        res.status(404).json({
          error: error,
        });
      });
  } else {
    Trade.find()
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((error) => {
        res.status(404).json({
          error: error,
        });
      });
  }
});

router.delete("/:id", async (req, res) => {
  res.status(405);
});

module.exports = router;
