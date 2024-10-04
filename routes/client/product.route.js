const express = require("express");
const router = express.Router();

const controller = require("../../controllers/client/product.controller");

router.get("/", controller.product);

// vd:

// router.get("/delete", (req, res) => {
//   res.render("client/pages/products/index.pug");
// });
// router.get("/edit", (req, res) => {
//   res.render("client/pages/products/index.pug");
// });

module.exports = router;
