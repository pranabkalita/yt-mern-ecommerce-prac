import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import colors from "colors";

import products from "./data/products.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const app = express();

app.get("/", (req, res) => {
  res.send("API IS RUNNING !");
});

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p._id === req.params.id);
  res.json(product);
});

const PORT = process.env.PORT || 5000;

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB".cyan.underline);
  app.listen(
    PORT,
    console.log(
      `Server running in ${process.env.NODE_ENV} mode on PORT ${PORT}`.yellow
        .underline
    )
  );
});

mongoose.connection.on("error", (err) => {
  console.error(err);
});
