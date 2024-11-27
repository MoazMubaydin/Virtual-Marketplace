const router = require("express").Router();
const { isAuthenticated } = require("../middleware/jwt.middleware.js");
const Product = require("../models/Product.model.js");
const imageUploader = require("../config/cloudinary.config");

//Creating a new product

router.post("/products", isAuthenticated, async (req, res) => {
  const { name, price, category, stock, image, description } = req.body;

  if (!name || !price || !category || !stock) {
    return res
      .status(400)
      .json({ error: "All required fields must be entered." });
  }

  try {
    //const image = req.file?.path;
    const productFromDB = await Product.create({
      name,
      price,
      description,
      category,
      image: image,
      stock,
      owner: req.payload._id,
    });
    res.status(201).json(productFromDB);
  } catch (error) {
    console.log("Error creating product.", error);
    res
      .status(500)
      .json({ error: error.message || "Failed to create the Product." });
  }
});

//Upload image

router.post("/upload", imageUploader.single("image"), async (req, res) => {
  try {
    if (req.file.path) {
      return res.status(201).json({ imageUrl: req.file.path });
    } else {
      return res.status(500).json({ msg: "No image was uploaded" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "error while uploading image", error });
  }
});
//Getting the product list

router.get("/products", async (req, res) => {
  try {
    const productsFromDB = await Product.find().populate("owner", "name email");
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

//get product by user
router.get("/user/products/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const productsFromDB = await Product.find({ owner: userId });
    if (productsFromDB.length === 0) {
      return res.status(200).json({ error: "User does not have any products" });
    }
    res.status(200).json({ products: productsFromDB });
  } catch (error) {
    console.log("error in GET /products/:userId");
    res
      .status(500)
      .json({ error: error.message || "Failed to get products from database" });
  }
});

//Getting a product by its ID

router.get("/products/:productId", async (req, res) => {
  const { productId } = req.params;

  try {
    const productFromDB = await Product.findById(productId).populate(
      "owner",
      "name email"
    );

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
    const checkUser = await Product.findById(productId);
    if (!checkUser) {
      return res.status(404).json({ error: "No product with that id found" });
    }
    //if (checkUser.owner !== req.payload._id) {
    //return res
    //.status(403)
    //.json({ error: "You are not authroized to update this product" });
    // }
    const updatedProductFromDB = await Product.findByIdAndUpdate(
      productId,
      updatedProduct,
      { new: true, runValidators: true } // validates the updatedproduct with the schema
    );

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
    const checkUser = await Product.findById(productId);

    //if (checkUser.owner !== req.payload._id) {
    //return res
    //.status(403)
    //.json({ error: "You are not authroized to delete this product" });
    //}
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
