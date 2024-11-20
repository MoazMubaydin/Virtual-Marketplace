const router = require("express").Router();
const { isAuthenticated } = require("../middleware/jwt.middleware.js");
const Product = require("../models/Product.model.js");

router.post("/products", isAuthenticated, async (req, res) => {
  const { name, price, category, images, stock, owner } = req.body;

  //Creating a new product
  if (!name || !price || !category || !images || !stock || !owner) {
    return res
      .status(400)
      .json({ error: "All required fields must be entered." });
  }

  try {
    const productFromDB = await Product.create({
      name,
      price,
      category,
      images,
      stock,
      owner,
    });
    res.status(201).json(productFromDB);
  } catch (error) {
    console.log("Error creating product.", error);
    res
      .status(500)
      .json({ error: error.message || "Failed to create the Product." });
  }
});

//Getting the product list

router.get("/products", async (req, res) => {
  try {
    const productsFromDB = await Product.find();
    if (productsFromDB.length === 0) {
      return res
        .status(404)
        .json({ message: "No products found in the database." });
    }
    res.json(productsFromDB);
  } catch (error) {
    console.log("error in GET /products", error);
    res.status(500).json({
      error: error.message || "Failed to get products from database.",
    });
  }
});

//Getting a product by its ID

router.get("/products/:productId", async (req, res) => {
  const { productId } = req.params;

  try {
    const productFromDB = await Product.findById(productId);

    if (!productFromDB) {
      return res.status(404).json({ error: "No product with that id found" });
    }
    res.status(200).json(productFromDB);
  } catch (error) {
    console.log("error in GET /products/:productId");
    res
      .status(500)
      .json({ error: error.message || "Failed to get product from database" });
  }
});

//Updating a product

router.patch("/products/:productId", async (req, res) => {
  const { productId } = req.params;
  const updatedProduct = req.body;

  //checks if the req body is empty or if it has no values to update
  if (!updatedProduct || Object.keys(updatedProduct).length === 0) {
    return res
      .status(400)
      .json({ error: "Product body must have at least one value to update." });
  }

  try {
    const updatedProductFromDB = await Product.findByIdAndUpdate(
      productId,
      updatedProduct,
      { new: true, runValidators: true } // validates the updatedproduct with the schema
    );
    if (!updatedProductFromDB) {
      return res.status(404).json({ error: "No product with that id found" });
    }
    res.status(200).json(updatedProductFromDB);
  } catch (error) {
    console.log("Error on PATCH /products/:productId", error);
    res.status(500).json({ error: error.message || "error updating product" });
  }
});

//Delete product

router.delete("/products/:productId", async (req, res) => {
  const { productId } = req.params;

  try {
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return res.status(404).json({ error: "No product with that id found" });
    }
    res.status(200).json(deletedProduct);
  } catch (error) {
    console.log("error in DELETE /products/productId", error);
    res
      .status(500)
      .json({ error: error.message || "Failed to delete product" });
  }
});
module.exports = router;
