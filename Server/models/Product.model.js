const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    name: { type: String, required: [true, "name is required"] },
    description: String,
    price: { type: Number, Required: [true, "price is required"], min: 0 },
    category: {
      type: String,
      enum: ["food", "pottery", "jewelry, clothing", "art"],
      required: [true, "category is required"],
    },
    images: [strings],
    stock: { type: Number, min: [0, "Has to be over 0"] },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "owner is required"],
    },
  },
  {
    timestamps: true, // add creation time and update time automaticlly
  }
);
const Product = model("Product", productSchema);
module.exports = Product;
