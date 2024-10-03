// nói cung thằng controller này dùng để phân chia nhỏ vì sau này có rất nhiều logic viết như cũ thì thằng router làm luôn nhiệm vụ của thằng controller rồi.
//liên kết tới thằng router/home.router.js
module.exports.home = (req, res) => {
  res.render("client/pages/home/index.pug");
};
