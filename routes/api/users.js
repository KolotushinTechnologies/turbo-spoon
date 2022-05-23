const express = require("express");
const router = express.Router();

// Import Validate
const { check } = require("express-validator");

// Import Middlewares
const auth = require("../../middleware/auth");

// Import Multer
const multer = require("../../utils/multer");

// Import Controllers
const {
  registration,
  login,
  getMyProfile,
  mySettings,
  getMyBasket,
  addProductCardToMyBasket,
  removeProductCardToMyBasket,
  createOrder,
  getMyFavorites,
  addProductCardToMyFavorites,
  removeProductCardToMyFavorites
} = require("../../services/users");

// @route    POST http://localhost:5000/api/users/registration
// @desc     Register user
// @access   Public
router.post(
  "/registration",
  multer.single("file"),
  check("email", "Please include a valid email").isEmail(),
  check(
    "password",
    "Please enter a password with 6 or more characters"
  ).isLength({ min: 6 }),
  registration
);

// @route    POST http://localhost:5000/api/users/login
// @desc     Authenticate user & get token(Login User)
// @access   Public
router.post(
  "/login",
  check("password", "Password is required").exists(),
  login
);

// @route    GET http://localhost:5000/api/users
// @desc     Get user by token(Get My Profile)
// @access   Private
router.get("/", auth, getMyProfile);

// @route    PUT http://localhost:5000/api/users/settings
// @desc     User settings
// @access   Private
router.put("/settings", auth, mySettings);

// @route    GET http://localhost:5000/api/users/my-basket
// @desc     Get my basket
// @access   Private
router.get("/my-basket", auth, getMyBasket);

// @route    POST http://localhost:5000/api/users/add-product-to-basket/:product_card
// @desc     Add product card to my basket
// @access   Private
router.post(
  "/add-product-to-basket/:product_card",
  auth,
  addProductCardToMyBasket
);

// @route    PUT http://localhost:5000/api/users/remove-product-to-basket/:product_card
// @desc     Remove product card from my basket
// @access   Private
router.put(
  "/remove-product-to-basket/:product_card",
  auth,
  removeProductCardToMyBasket
);

// @route    POST http://localhost:5000/api/users/create-order
// @desc     Create order(Send Email Message)
// @access   Private
router.post("/create-order", auth, createOrder);

// @route    GET http://localhost:5000/api/users/my-favorites
// @desc     Get my favorites
// @access   Private
router.get("/my-favorites", auth, getMyFavorites);

// @route    POST http://localhost:5000/api/users/add-product-to-favorites/:product_card
// @desc     Add product card to my favorites
// @access   Private
router.post(
  "/add-product-to-favorites/:product_card",
  auth,
  addProductCardToMyFavorites
);

// @route    PUT http://localhost:5000/api/users/remove-product-to-favorites/:product_card
// @desc     Remove product card from my favorites
// @access   Private
router.put(
  "/remove-product-to-favorites/:product_card",
  auth,
  removeProductCardToMyFavorites
);

module.exports = router;
