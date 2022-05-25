const { Schema, model } = require("mongoose");

const AvatarSchema = new Schema(
  {
    filename: { type: String },
    ext: { type: String },
    url: { type: String },
    product: { type: Schema.Types.ObjectId, ref: "ProductCard" },
    user: { type: Schema.Types.ObjectId, ref: "User" }
  },
  { timestamps: true }
);

module.exports = AvatarModel = model("Avatar", AvatarSchema);
