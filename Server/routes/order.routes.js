const router = require("express").Router();
const Order = require("../models/Order.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");

//create an Order

router.post("/orders", isAuthenticated, async (req, res) => {
  const { products } = req.body;
  if (!products) {
    return res
      .status(400)
      .json({ error: "All required fields must be entered." });
  }
  try {
    const newOrder = await Order.create({ buyerId: req.payload._id, products });
    res.status(201).json(newOrder);
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
      .populate("products.productId", "name description price")
      .sort({ createdAt: -1 });
    if (orders.length === 0) {
      return res.status(200).json({ error: "user does not have any orders" });
    }
    res.json(orders);
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
