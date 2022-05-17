const { Schema, model } = require("mongoose");

const OrderSchema = new Schema(
  {
    nameOrder: { type: String, required: true },
    priceOrder: { type: String, required: true },
    product: { type: Schema.Types.ObjectId, required: true }
  },
  {
    timestamps: true
  }
);

module.exports = OrderModel = model("Order", OrderSchema);
