const { Schema, model } = require("mongoose");

const ProductCardSchema = new Schema(
  {
    nameProduct: { type: String, required: true },
    price: { tyep: String },
    photo: { type: String },
    compound: { type: String },
    description: { type: String },
    category: { type: String, required: true },
    reviews: [
      {
        user: { type: Schema.Types.ObjectId },
        name: { type: String },
        text: { type: String, required: true },
        avatar: { type: String }
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = ProductCardModel = model("ProductCard", ProductCardSchema);
