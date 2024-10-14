const mongoose = require("mongoose");
//cái này là để
//nhớ là . connect là hàm tự định nghĩa
module.exports.connect = async () => {
  try {
    //mongose connect and bảo mật link mongodb .env
    await mongoose.connect(process.env.MONGO_URL);
    console.log("connect success");
  } catch (error) {
    console.log("connect Error");
  }
};
