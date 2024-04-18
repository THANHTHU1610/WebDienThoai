const express = require("express");
const router = express.Router();
const Review = require("../schemas/review");

// Route GET '/reviews' (Lấy danh sách đánh giá)
router.get("/", async (req, res) => {
  try {
    const reviews = await Review.find().exec();
    res.status(200).send(reviews);
  } catch (error) {
    res.status(404).send(error);
  }
});

// Route POST '/reviews' (Tạo mới đánh giá)
router.post("/", async (req, res) => {
  try {
    const { userId, productId, rating, comment } = req.body;

    // Tạo đánh giá mới
    const newReview = new Review({
      user: userId,
      product: productId,
      rating,
      comment,
    });

    // Lưu đánh giá mới vào cơ sở dữ liệu
    const savedReview = await newReview.save();
    res.status(200).send(savedReview);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
