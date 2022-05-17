const express = require("express");
const router = express.Router();

// Import Middlewares
const auth = require("../../middleware/auth");

// Import Controllers
const {
  createNewProductCard,
  getAllProductCards,
  getProductCardById,
  createReviewForProductCard
} = require("../../services/productCards");

// @route    POST http://localhost:5000/api/product-cards/create?nameProduct=name&price=price&compound=compound&description=description&category=category
// @desc     Create New Product Card
// @access   Public
router.post("/create", createNewProductCard);

// @route    GET http://localhost:5000/api/product-cards/all?category=categoryName
// @desc     Get all product cards
// @access   Public
router.get("/all", getAllProductCards);

// @route    GET http://localhost:5000/api/product-cards/:product_card
// @desc     Get product card by ID(Populate reviews and description)
// @access   Public
router.get("/:product_card", getProductCardById);

// @route    POST http://localhost:5000/api/product-cards/create-review/:product_card
// @desc     Create review for product card
// @access   Private
router.post("/create-review/:product_card", auth, createReviewForProductCard);

module.exports = router;
