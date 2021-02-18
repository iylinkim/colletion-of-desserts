const random = document.querySelector(".js-random");
const btns = document.querySelector(".js-btns");
const btn = document.querySelectorAll(".js-btn");
const randomSlide = Array.from(document.querySelectorAll(".random_slide"));
const PREV = "prev";
const NEXT = "next";

let count = 0;

function moveSlide(event) {
  const {
    target: { name },
  } = event;
  if (name === "prev") {
    count += 100;
    random.style.marginLeft = `${count}px`;
  } else if (name === "next") {
    count -= 100;
    random.style.marginLeft = `${count}px`;

    // random.append(randomSlide[randomSlide.length - 1]);
  }
}

function handleSlide() {
  const btnGroup = Array.from(btn);
  btnGroup.forEach((btn) => btn.addEventListener("click", moveSlide));
}

function init() {
  handleSlide();
}
init();
