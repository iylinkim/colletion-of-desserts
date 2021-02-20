const random = document.querySelector(".js-random");
const btns = document.querySelector(".js-btns");
const btn = document.querySelectorAll(".js-btn");
const randomSlide = Array.from(document.querySelectorAll(".random_slide"));
const PREV = "prev";
const NEXT = "next";
const NONE = "none";
const BLOCK = "block";

let count = 0;

function moveSlide(event) {
  const {
    target: { name, previousElementSibling, nextElementSibling },
  } = event;
  if (name === "prev") {
    if (count === 0) {
    } else {
      count += 100;
      random.style.marginLeft = `${count}px`;
    }
  } else if (name === "next") {
    if (count !== -500) {
      count -= 100;
      random.style.marginLeft = `${count}px`;
    }
  }
  handleBtn(count);
}

function handleSlide() {
  const btnGroup = Array.from(btn);
  btnGroup.forEach((btn) => btn.addEventListener("click", moveSlide));
}

function handleBtn(count) {
  const prev = document.querySelector(".prev");
  const next = document.querySelector(".next");

  if (count !== 0) {
    //슬라이드 오른쪽으로 이동
    prev.classList.remove(NONE);
    prev.classList.add(BLOCK);
  } else if (count === 0) {
    //슬라이드의 왼쪽 끝
    prev.classList.add(NONE);
    prev.classList.remove(BLOCK);
  }
  if (count === -500) {
    //슬라이드의 오른쪽 끝
    next.classList.add(NONE);
    next.classList.remove(BLOCK);
  } else {
    next.classList.add(BLOCK);
  }
}

function init() {
  handleSlide();
  // handleBtn();
  
}
init();
