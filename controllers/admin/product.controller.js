module.exports.index = (req, res) => {
    res.render("admin/pages/products/index.pug", {
        pageTitle: "Danh Sách Sản Phẩm ",
      });
};
