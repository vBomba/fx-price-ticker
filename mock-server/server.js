const express = require("express");

const app = express();

const startingPrices = [
  {
    id: 1,
    instrument: "EUR/USD",
    bid: 1.1,
    ask: 1.2,
    timestamp: "01-06-2020 12:01:01:001",
  },
  {
    id: 2,
    instrument: "EUR/JPY",
    bid: 119.6,
    ask: 119.9,
    timestamp: "01-06-2020 12:01:02:001",
  },
  {
    id: 3,
    instrument: "GBP/USD",
    bid: 1.25,
    ask: 1.256,
    timestamp: "01-06-2020 12:01:02:001",
  },
];

const prices = [
  ...startingPrices,
  {
    id: 4,
    instrument: "GBP/USD",
    bid: 1.25,
    ask: 1.256,
    timestamp: "01-06-2020 12:01:02:100",
  },
];
const latestPrices = {};

// endpoint to get all prices
app.get("/api/prices", (_, res) => {
  res.send(startingPrices);
});

// endpoint to get latest price for a specific instrument
app.get("/api/price", (req, res) => {
  res.send(latestPrices[req.query.instrument]);
});

// simulate a stream of prices by adding a new price to the array every second
setInterval(() => {
  const id = prices[prices.length - 1].id + 1;
  const instrument =
    startingPrices[Math.floor(Math.random() * startingPrices.length)]
      .instrument;
  const bid = Math.round(Math.random() * 1000000) / 10000;
  const ask = Math.round((bid + Math.random() * 10) * 10000) / 10000;
  const timestamp = new Date().toISOString();

  latestPrices[instrument] = {
    id,
    instrument,
    bid,
    ask,
    timestamp,
  };

  prices.push(latestPrices[instrument]);
}, 333);

app.listen(3000, () => {
  console.log("Mock price service listening on port 3000");
});
