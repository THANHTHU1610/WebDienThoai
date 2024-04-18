var express = require("express");
var router = express.Router();
var Product = require("../schemas/product");

// Route GET '/products' (Lấy danh sách sản phẩm)
router.get("/", async function (req, res, next) {
  try {
    let limit = req.query.limit ? parseInt(req.query.limit) : 5;
    let page = req.query.page ? parseInt(req.query.page) : 1;
    let queries = {};

    // Xử lý các yêu cầu lọc
    if (req.query.category) {
      queries.category = req.query.category;
    }
    // Xử lý phân trang
    let skip = (page - 1) * limit;

    // Tìm các sản phẩm dựa trên các yêu cầu và thực hiện phân trang
    const products = await Product.find(queries).skip(skip).limit(limit).exec();

    res.status(200).send(products);
  } catch (error) {
    res.status(404).send(error);
  }
});

// Route GET '/products/:id' (Lấy thông tin sản phẩm theo ID)
router.get("/:id", async function (req, res, next) {
  try {
    var product = await productModel.findById(req.params.id).exec();
    res.status(200).send(product);
  } catch (error) {
    res.status(404).send(error);
  }
});

// Route POST '/products' (Tạo mới sản phẩm)
router.post("/", async function (req, res, next) {
  try {
    let newProduct = new Product({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      image: req.body.image,
      brand: req.body.branch,
      category: req.body.category,
      quantity: req.body.quantity,
      display: req.body.display,
      camera: req.body.camera,
      processor: req.body.processor,
      memory: req.body.memory,
      battery: req.body.battery,
      connectivity: req.body.connectivity,
      operatingSystem: req.body.operatingSystem,
    });
    await newProduct.save();
    res.status(200).send(newProduct);
  } catch (error) {
    res.status(404).send(error);
  }
});

// Route PUT '/products/:id' (Cập nhật thông tin sản phẩm)
router.put("/:id", async function (req, res, next) {
  try {
    var product = await productModel
      .findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      })
      .exec();
    res.status(200).send(product);
  } catch (error) {
    res.status(404).send(error);
  }
});

// Route DELETE '/products/:id' (Xóa sản phẩm)
router.delete("/:id", async function (req, res, next) {
  try {
    var product = await productModel
      .findByIdAndUpdate(
        req.params.id,
        {
          isDeleted: true,
        },
        {
          new: true,
        }
      )
      .exec();
    res.status(200).send(product);
  } catch (error) {
    res.status(404).send(error);
  }
});

module.exports = router;
