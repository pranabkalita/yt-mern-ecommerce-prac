import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import colors from "colors";

import products from "./data/products.js";
import connectDB from "./config/db.js";
import productRoutes from "./routes/product.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();
connectDB();

const app = express();

app.get("/", (req, res) => {
  res.send("API IS RUNNING !");
});

app.use("/api/products", productRoutes);

app.use(notFound);
app.use(errorHandler);

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
