const express = require("express");
const router = express.Router();
const Cart = require("../schemas/cart");

// Route để lấy thông tin giỏ hàng của người dùng
router.get("/", async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.product"
    );
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route để thêm sản phẩm vào giỏ hàng của người dùng
router.post("/", async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = new Cart({
        user: req.user._id,
        items: [{ product: productId, quantity }],
      });
    } else {
      const existingItem = cart.items.find(
        (item) => String(item.product) === String(productId)
      );
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ product: productId, quantity });
      }
    }

    await cart.save();
    res.status(201).json(cart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route để xóa sản phẩm khỏi giỏ hàng của người dùng
router.delete("/:id", async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter(
      (item) => String(item.product) !== req.params.id
    );
    await cart.save();

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
