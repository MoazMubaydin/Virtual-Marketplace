const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    description: String,
    price: { type: Number, Required: true, min: 0 },
    category: {
      type: String,
      enum: ["food", "pottery", "jewelry, clothing", "art"],
      required: true,
    },
    images: [strings],
    stock: { type: Number, min: 0 },
  },
  {
    timestamps: true, // add creation time and update time automaticlly
  }
);
const Product = model("Product", productSchema);
module.exports = Product;
