import { scrollButton } from "../constants.js";


export const scrollButtonFn = () => {
    if (window.scrollY >= 300) {
      scrollButton.classList.add("active");
    } else {
      scrollButton.classList.remove("active");
    }
    scrollButton.onclick = function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    };
  }
 