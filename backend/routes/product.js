import express from "express";
import asyncHandler from "express-async-handler";

import Product from "./../models/Product.js";

const router = express.Router();

/**
 * @desc Fetch all products
 * @route /api/products
 * @access Public
 */
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const products = await Product.find({});

    res.json(products);
  })
);

/**
 * @desc Fetch one product
 * @route /api/products/:id
 * @access Public
 */
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
      res.status(404);

      throw new Error("Product not found.");
    }

    res.json(product);
  })
);

export default router;
