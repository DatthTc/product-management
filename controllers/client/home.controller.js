// nói cung thằng controller này dùng để phân chia nhỏ vì sau này có rất nhiều logic viết như cũ thì thằng router làm luôn nhiệm vụ của thằng controller rồi.
//liên kết tới thằng router/home.router.js
//Nhớ thằng controller nó có nhiệm vụ trả về thằng views
module.exports.home = (req, res) => {
  res.render("client/pages/home/index.pug", {
    pageTitle: "Trang Chủ",
  });
};
