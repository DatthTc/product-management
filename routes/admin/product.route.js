const express = require("express");

const multer = require("multer");
const router = express.Router();
// multer image
// const multilStorage = require("../../helpers/multer.helper");
const upload = multer({
  dest: "./public/uploads/" /* storage: multilStorage() */,
});

const controller = require("../../controllers/admin/product.controller");

router.get("/", controller.index);

router.patch("/change-status/:status/:id", controller.changeStatus);

router.patch("/change-multi", controller.changeMulti);

router.delete("/delete/:id", controller.deleteItem);

router.get("/create", controller.create);

router.post("/create", upload.single("thumbnail"), controller.createPost);

module.exports = router;
