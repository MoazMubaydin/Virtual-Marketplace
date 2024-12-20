const router = require("express").Router();
const Order = require("../models/Order.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");

//create an Order

router.post("/orders", isAuthenticated, async (req, res) => {
  const { products } = req.body;
  if (!Array.isArray(products) || products.length === 0) {
    return res
      .status(400)
      .json({ error: "Products must be a non empty array." });
  }
  for (const product of products) {
    if (!product.productId || !product.quantity || !product.price) {
      return res.status(400).json({
        error: "Each product must have productId, quantity, and price.",
      });
    }
  }
  try {
    const newOrder = await Order.create({ buyerId: req.payload._id, products });
    const populatedOrder = await newOrder.populate("buyerId", "name email");
    res.status(201).json(populatedOrder);
  } catch (error) {
    console.log("Error creating order.", error);
    res
      .status(500)
      .json({ error: error.message || "Failed to create the order." });
  }
});

// get order depending on the user

router.get("/orders", isAuthenticated, async (req, res) => {
  try {
    const orders = await Order.find({ buyerId: req.payload._id })
      .populate("buyerId", "name email")
      .populate("products.productId", "name description price ")
      .sort({ createdAt: -1 });
    if (orders.length === 0) {
      return res.status(200).json([]);
    }
    res.json(orders);
  } catch (error) {
    console.log("error in GET / orders/userid", error);
    res
      .status(500)
      .json({ error: error.message || "error getting users orders" });
  }
});
//get order by id
router.get("/orders/:orderId", isAuthenticated, async (req, res) => {
  const { orderId } = req.params;
  try {
    const order = await Order.findById(orderId)
      .populate("buyerId", "name email")
      .populate("products.productId", "name description price image");
    if (!order) {
      return res.status(200).json({ message: "No order with that Id" });
    }
    // if (order.buyerId.toString() !== req.payload._id) {
    // return res
    //.status(401)
    // .json({ error: "You are not authorized to view the order" });
    //}
    res.json(order);
  } catch (error) {
    console.log("error in GET / orders/userid", error);
    res
      .status(500)
      .json({ error: error.message || "error getting users orders" });
  }
});
//update an order
router.patch("/orders/:orderId", isAuthenticated, async (req, res) => {
  const { orderId } = req.params;
  const updatedOrder = req.body;
  if (!updatedOrder || Object.keys(updatedOrder).length === 0) {
    return res
      .status(400)
      .json({ error: "Order body must have at least one value to update." });
  }

  try {
    const orderFromDB = await Order.findById(orderId);

    if (!orderFromDB) {
      return res.status(400).json({ error: "No order with that Id found" });
    }

    if (orderFromDB.buyerId.toString() !== req.payload._id) {
      return res
        .status(403)
        .json({ error: "You are not authorized to update this order" });
    }

    const updatedOrderFromDB = await Order.findByIdAndUpdate(
      orderId,
      updatedOrder,
      { new: true, runValidators: true }
    );

    res.json(updatedOrderFromDB);
  } catch (error) {
    console.log("error in patch / orders/orderid", error);
    res
      .status(500)
      .json({ error: error.message || "error updating users orders" });
  }
});
// delete an order
router.delete("/orders/:orderId", isAuthenticated, async (req, res) => {
  const { orderId } = req.params;
  try {
    const orderFromDB = await Order.findById(orderId);
    if (!orderFromDB) {
      return res.status(400).json({ error: "No order with that Id found" });
    }
    if (orderFromDB.buyerId.toString() !== req.payload._id.toString()) {
      return res
        .status(403)
        .json({ error: "You are not authorized to delete this order" });
    }
    const deletedOrder = await Order.findByIdAndDelete(orderId);

    res.status(200).json(deletedOrder);
  } catch (error) {
    console.log("Error in DELETE // orders/orderid", error);
    res
      .status(500)
      .json({ error: error.message || "Error deleting order from server" });
  }
});
module.exports = router;
