module.exports = (hehe) => {
  // chức năng function of search
  let objectSearh = {
    keyword: "",
  };

  if (hehe.keyword) {
    objectSearh.keyword = hehe.keyword;

    const regex = new RegExp(objectSearh.keyword, "i");
    //title trong database lấy tên sp tạo một key title vào trong hàm find có giá trị = keyword mà ng dùng nhập vào
    objectSearh.regex = regex;
  }

  return objectSearh;
};
