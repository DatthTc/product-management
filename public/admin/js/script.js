// button-status
const buttonStatus = document.querySelectorAll("[button-status]");
// new URL cần để dùng các hàm hỗ trợ như searchParam bên dưới
const url = new URL(window.location.href);

if (buttonStatus.length > 0) {
  buttonStatus.forEach((button) => {
    button.addEventListener("click", () => {
      //getAttribute : để lấy giá trị của thuộc tính
      const status = button.getAttribute("button-status");

      if (status) {
        url.searchParams.set("status", status);
      } else {
        url.searchParams.set("status");
      }

      window.location.href = url.href;
    });
  });
}

// end button-status
