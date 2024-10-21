module.exports.dashboard = (req, res) => {
  res.render("admin/pages/dashboad/index.pug", {
    pageTitle: "Trang Tổng Quan",
  });
};
