module.exports.creatPosst = (req, res, next) => {
  if (!req.body.title) {
    //req.body.title truy cập vào trường title trong đối tượng req.body
    // req.body là 1 phương thức trong express.js chứa tất acr các dữ liệu gửi từ client đến server
    req.flash("error", `Vui lòng nhập tiêu đề`); // hiển thị nhanh 1 thông báo pupup và trả về một messege print in mixins
    res.redirect("back"); // điều hướng về trang vừa nhập
    return; // return ở đây là không cho các chương trình bên dưới thực thi
  }
  next(); // chuyển đến bươc tiếp, next() la midderware là môt hàm hình như được built-in chỉ cần gọi ra
};
