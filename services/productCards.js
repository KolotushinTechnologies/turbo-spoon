const ProductCardModel = require("../models/ProductCard");
const UserModel = require("../models/User");

// @route    POST http://localhost:5000/api/product-cards/create?nameProduct=name&compound=compound&description=description&category=category
// @desc     Create New Product Card
// @access   Public
const createNewProductCard = async (req, res) => {
  try {
    const { nameProduct, compound, description, category } = req.query;

    const newProductCard = await ProductCardModel.create({
      nameProduct: nameProduct,
      price: req.body.price,
      compound: compound,
      description: description,
      category: category
    });

    return res.status(200).json(newProductCard);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @route    GET http://localhost:5000/api/product-cards/all?category=categoryName
// @desc     Get all product cards
// @access   Public
const getAllProductCards = async (req, res) => {
  try {
    const categoryName = req.query.category;

    const productCards = await ProductCardModel.find({});

    const productCardsByCategoryName = await ProductCardModel.find({
      category: categoryName
    });

    if (!productCards) {
      return res.status(404).json({
        msg: "Product Cards Not Found!"
      });
    } else if (productCards) {
      if (req.query.category) {
        return res.status(200).json(productCardsByCategoryName);
      } else if (!req.query.category) {
        return res.status(200).json(productCards);
      }
    } else {
      return res.status(400).json({
        msg: "Bad Request"
      });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @route    GET http://localhost:5000/api/product-cards/:product_card
// @desc     Get product card by ID(Populate reviews and description)
// @access   Public
const getProductCardById = async (req, res) => {
  try {
    const productCardId = req.params.product_card;

    const productCard = await ProductCardModel.findOne({
      _id: productCardId
    });

    if (!productCard) {
      return res.status(404).json({
        msg: "Product Card Not Found!"
      });
    }

    return res.status(200).json(productCard);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @route    POST http://localhost:5000/api/product-cards/create-review/:product_card
// @desc     Create review for product card
// @access   Private
const createReviewForProductCard = async (req, res) => {
  try {
    const userId = req.user.id;
    const productCardId = req.params.product_card;

    const user = await UserModel.findOne({ _id: userId });
    const productCard = await ProductCardModel.findOne({
      _id: productCardId
    });

    const { text } = req.body;

    if (!user) {
      return res.status(404).json({
        msg: "User Not Found!"
      });
    }

    if (!productCard) {
      return res.status(404).json({
        msg: "Product Card Not Found!"
      });
    }

    const newReview = {
      user: userId,
      name: user.fullName,
      text: text
    };

    productCard.reviews.unshift(newReview);

    await productCard.save();

    return res.status(200).json(productCard);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  createNewProductCard,
  getAllProductCards,
  getProductCardById,
  createReviewForProductCard
};
