const express = require("express");
const router = express.Router();

const controller = require("../../controllers/admin/storage.controller");

router.get("/", controller.cart);

router.patch("/change-status/:status/:id", controller.changeStatus);

router.patch("/change-multi", controller.changeMulti);

router.delete("/updateDeleted/:id", controller.updateDeleted);

module.exports = router;
