const { Schema, model } = require("mongoose");

const orderSchema = new Schema({
  buyerId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "buyerId is required"],
  },
  products: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: { type: Number, min: 1 },
      price: {
        type: Number,
        required: [true, "Price is required"],
        min: [0, "Price is required"],
      },
    },
    {
      timestamps: true,
    },
  ],
});

const Order = model("Order", orderSchema);
module.exports = Order;
