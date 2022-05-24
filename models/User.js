const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    login: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    fullName: { type: String, required: true },
    address: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    avatar: { type: Schema.Types.ObjectId, ref: "Avatar" },
    //   ========================
    basket: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "ProductCard",
          required: true
        },
        nameProduct: { type: String, required: true },
        photo: { type: String },
        price: Number,
        countProducts: Number
      }
    ],
    favorites: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "ProductCard",
          required: true
        },
        nameProduct: { type: String, required: true },
        photo: { type: String },
        price: Number
      }
    ],
    orders: [
      {
        fullNameUser: { type: String },
        nameOrder: { type: String, required: true },
        products: [{ type: Schema.Types.ObjectId, ref: "ProductCard" }],
        numberOrder: { type: String, required: true },
        statusOrder: { type: Boolean, default: false },
        methodDelivery: { type: String, required: true },
        price: Number,
        countProducts: Number
      }
    ],
    roles: [{ type: String, ref: "Role" }]
  },
  {
    timestamps: true
  }
);

module.exports = UserModel = model("User", UserSchema);
