var express = require("express");
var router = express.Router();

/* GET home page. */
router.use("/products", require("./products"));
router.use("/carts", require("./carts"));
router.use("/users", require("./users"));
router.use("/reviews", require("./reviews"));
router.use("/auth", require("./auth"));
module.exports = router;
