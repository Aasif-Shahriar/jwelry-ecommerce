const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");
const { protect } = require("../middleware/auth.middleware");
const { adminOnly } = require("../middleware/admin.middleware");

router.get("/", productController.getProducts);
router.get("/:slug", productController.getSingleProduct);

// admin route
router.post("/", protect, adminOnly, productController.createProduct);
router.put("/:id", protect, adminOnly, productController.updateProduct);
router.delete("/:id", protect, adminOnly, productController.deleteProduct);

module.exports = router;
