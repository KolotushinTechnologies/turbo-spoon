const UserModel = require("../models/User");
const RoleModel = require("../models/Role");
const ProductCardModel = require("../models/ProductCard");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("config");
const { validationResult } = require("express-validator");

// @route    POST http://localhost:5000/api/users/registration
// @desc     Register user
// @access   Public
const registration = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { login, fullName, email, phoneNumber, address, password } = req.body;

  try {
    const userCandidate = await UserModel.findOne({ email: email });

    if (userCandidate) {
      return res.status(400).json({
        statusCode: 400,
        stringStatus: "Error",
        message: "Пользователь с таким email уже существует!"
      });
    }
    // Находим роль "USER", которая явялется базовой для всех пользователей,
    // чтобы присвоить ее нвоому пользователю
    const userRoleCustomerUSER = await RoleModel.findOne({ value: "USER" });

    if (!userRoleCustomerUSER) {
      await RoleModel.create({
        value: "USER"
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // Создаем нового пользователя, записываем его введеный email в теле запроса,
    // записываем базовую для всех пользователей роль, которую мы нашли в Базе Данных ролей пользователей
    const newUserCustomer = await UserModel.create({
      login: login,
      fullName: fullName,
      email: email,
      phoneNumber: `+7${phoneNumber}`,
      address: address,
      password: hashPassword,
      roles: [userRoleCustomerUSER.value]
    });

    const payloadCustomer = {
      user: {
        id: newUserCustomer.id
      }
    };

    // Возвращаем успешный статус с ответом от сервера и данными о пользователе
    jwt.sign(
      payloadCustomer,
      config.get("jwtSecret"),
      { expiresIn: "5 days" },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @route    POST http://localhost:5000/api/users/login
// @desc     Authenticate user & get token(Login User)
// @access   Public
const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { login, password } = req.body;

  try {
    // Находим пользователя по login из тела запроса,
    // чтобы установить правильность ввода данных
    const user = await UserModel.findOne({
      login: login
    });

    if (!user) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }

    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload,
      config.get("jwtSecret"),
      { expiresIn: "5 days" },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @route    GET http://localhost:5000/api/users
// @desc     Get user by token(Get My Profile)
// @access   Private
const getMyProfile = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.id)
      .populate("avatar")
      .select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @route    PUT http://localhost:5000/api/users/settings
// @desc     User settings
// @access   Private
const mySettings = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await UserModel.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({
        statusCode: 404,
        stringStatus: "Not Found",
        message: "User Not Found!"
      });
    }

    const { login, fullName, email, phoneNumber, address, password } = req.body;

    if (login) {
      user.login = login;
    }

    if (fullName) {
      user.fullName = fullName;
    }

    if (email) {
      user.email = email;
    }

    if (phoneNumber) {
      user.phoneNumber = phoneNumber;
    }

    if (address) {
      user.address = address;
    }

    if (password) {
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);
    }

    user.save();

    const updatedUser = await UserModel.findOne({ _id: userId });

    return res.status(200).json(updatedUser);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @route    GET http://localhost:5000/api/users/my-basket
// @desc     Get my basket
// @access   Private
const getMyBasket = async (req, res) => {
  try {
    const myUserBasket = await UserModel.findOne({ _id: req.user.id }).select(
      "basket"
    );

    if (!myUserBasket) {
      return res.status(404).json({
        msg: "User Not Found!"
      });
    }

    return res.status(200).json(myUserBasket);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @route    POST http://localhost:5000/api/users/add-product-to-basket/:product_card
// @desc     Add product card to my basket
// @access   Private
const addProductCardToMyBasket = async (req, res) => {
  try {
    const userId = req.user.id;
    const productCardId = req.params.product_card;

    const user = await UserModel.findOne({ _id: userId });
    const productCard = await ProductCardModel.findOne({
      _id: productCardId
    });

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

    if (
      user.basket.some(
        (basketProduct) =>
          basketProduct.product.toString() === productCard._id.toString()
      )
    ) {
      return res.status(400).json({
        msg: "Вы уже добавили этот товар в корзину!"
      });
    }

    const newBasketProductCard = {
      product: productCard._id,
      nameProduct: productCard.nameProduct,
      price: productCard.price,
      countProducts: 1
    };

    user.basket.unshift(newBasketProductCard);

    await user.save();

    return res.status(200).json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @route    PUT http://localhost:5000/api/users/remove-product-to-basket/:product_card
// @desc     Remove product card from my basket
// @access   Private
const removeProductCardToMyBasket = async (req, res) => {
  try {
    const userId = req.user.id;
    const productCardId = req.params.product_card;

    const user = await UserModel.findOne({ _id: userId });
    const productCard = await ProductCardModel.findOne({
      _id: productCardId
    });

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

    if (
      !user.basket.some(
        (basketProduct) =>
          basketProduct.product.toString() === productCard._id.toString()
      )
    ) {
      return res.status(404).json({
        msg: "Вы уже убрали данный товар из корзины!"
      });
    }

    user.basket = user.basket.filter(
      (basketProduct) =>
        basketProduct.product.toString() !== productCard._id.toString()
    );

    user.save();

    return res.status(200).json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @route    POST http://localhost:5000/api/users/create-order
// @desc     Create order(Send Email Message)
// @access   Private
const createOrder = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await UserModel.findOne({ _id: userId });

    const { price } = req.body;

    if (!user) {
      return res.status(404).json({
        msg: "User Not Found!"
      });
    }

    if (user.basket.length <= 0) {
      return res.status(404).json({
        msg: "Корзина пуста!"
      });
    }

    const newOrder = {
      nameOrder: `Заказ от пользователя ${user.login}`,
      products: user.basket.map((basketProduct) => basketProduct.product),
      price: price,
      countProducts: user.basket.length
    };

    user.orders.unshift(newOrder);
    user.basket = [];

    await user.save();

    return res.status(200).json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @route    GET http://localhost:5000/api/users/my-favorites
// @desc     Get my favorites
// @access   Private
const getMyFavorites = async (req, res) => {
  try {
    const myUserFavorites = await UserModel.findOne({
      _id: req.user.id
    }).select("favorites");

    if (!myUserFavorites) {
      return res.status(404).json({
        msg: "User Not Found!"
      });
    }

    return res.status(200).json(myUserFavorites);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @route    POST http://localhost:5000/api/users/add-product-to-favorites/:product_card
// @desc     Add product card to my favorites
// @access   Private
const addProductCardToMyFavorites = async (req, res) => {
  try {
    const userId = req.user.id;
    const productCardId = req.params.product_card;

    const user = await UserModel.findOne({ _id: userId });
    const productCard = await ProductCardModel.findOne({
      _id: productCardId
    });

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

    if (
      user.favorites.some(
        (favoriteProduct) =>
          favoriteProduct.product.toString() === productCard._id.toString()
      )
    ) {
      return res.status(400).json({
        msg: "Вы уже добавили этот товар в избранное!"
      });
    }

    const newFavoriteProductCard = {
      product: productCard._id,
      nameProduct: productCard.nameProduct,
      price: productCard.price
    };

    user.favorites.unshift(newFavoriteProductCard);

    await user.save();

    return res.status(200).json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @route    PUT http://localhost:5000/api/users/remove-product-to-favorites/:product_card
// @desc     Remove product card from my favorites
// @access   Private
const removeProductCardToMyFavorites = async (req, res) => {
  try {
    const userId = req.user.id;
    const productCardId = req.params.product_card;

    const user = await UserModel.findOne({ _id: userId });
    const productCard = await ProductCardModel.findOne({
      _id: productCardId
    });

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

    if (
      !user.favorites.some(
        (favoriteProduct) =>
          favoriteProduct.product.toString() === productCard._id.toString()
      )
    ) {
      return res.status(404).json({
        msg: "Вы уже убрали данный товар из избранного!"
      });
    }

    user.favorites = user.favorites.filter(
      (favoriteProduct) =>
        favoriteProduct.product.toString() !== productCard._id.toString()
    );

    user.save();

    return res.status(200).json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = {
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
};
