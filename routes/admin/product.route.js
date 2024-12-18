const express = require("express");

const multer = require("multer");
const router = express.Router();
// multer image
// const multilStorage = require("../../helpers/multer.helper");
const upload = multer({
  dest: "./public/uploads/" /* storage: multilStorage() */,
});

const controller = require("../../controllers/admin/product.controller");
const validate = require("../../validates/admin/product.validate");

router.get("/", controller.index);

router.patch("/change-status/:status/:id", controller.changeStatus);

router.patch("/change-multi", controller.changeMulti);

router.delete("/delete/:id", controller.deleteItem);

router.get("/create", controller.create);

router.post(
  "/create",
  upload.single("thumbnail"), // multer upload image
  validate.creatPosst, // mục đích là khi người dùng truy cập vào /create thì phải đi qua th validate (middleWare) trước để kiểm tra điều kiện, rồi mới đền thằng controller
  controller.createPost
);

router.get("/edit/:id", controller.edit); // mothod get chỉ để lấy ra giao diện

router.patch(
  "/edit/:id",
  upload.single("thumbnail"), // multer upload image
  validate.creatPosst, // mục đích là khi người dùng truy cập vào /create thì phải đi qua th validate (middleWare) trước để kiểm tra điều kiện, rồi mới đền thằng controller
  controller.editPatch
);

router.get("/detail/:id", controller.detail); // mothod get chỉ để lấy ra giao diện

module.exports = router;
