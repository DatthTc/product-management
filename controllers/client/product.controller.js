module.exports.product = (req, res) => {
  res.render("client/pages/products/index.pug", {
    pageTitle: "Products",
  });
};
