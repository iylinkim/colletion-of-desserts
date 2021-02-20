import Dessert from "./dessert.js";
const h2 = document.querySelector("h2");
const get_btn = document.querySelector(".js-getRandom");
const searchInput = document.querySelector(".searchInput");
const searchBtn = document.querySelector(".searchBtn");
const searchForm = document.querySelector(".searchForm");
const list = document.querySelector(".js-list");
const random = document.querySelector(".js-random");
const keywords = document.querySelector(".js-keywords");
const pictures = new Dessert();
const keywordsList = [];

const QUERY = "dessert";
const PICTURES = "pictures";
const RANDOM_SLIDE = "random_slide";
const KEYWORDS = "keywords";
let ls_pictures = JSON.parse(localStorage.getItem(PICTURES));

function loadPictures(obj) {
  if (obj) {
    obj.forEach((pic) => {
      const li = document.createElement("li");
      li.className = QUERY;
      const img = document.createElement("img");
      img.dataSrc = pic.urls.small;
      li.append(img);
      list.append(li);
    });
  } else {
    getPictures();
  }
}

function savePictures(pics) {
  localStorage.setItem(PICTURES, JSON.stringify(pics));
}

async function onSubmit(event) {
  event.preventDefault();
  await pictures.search(searchInput.value).then((data) => {
    localStorage.setItem(PICTURES, JSON.stringify(data.results));
    loadPictures(data.results);
  });
  //   handleList();

  console.log(keywordsList.length);
  if (keywordsList.length >= 5) {
    keywordsList.shift();
    saveKeywords();
  } else {
    paintKeywords(searchInput.value);
    saveKeywords();
  }
  //   searchInput.value = "";
}

async function getPictures() {
  let pics;
  await pictures.getRandom(QUERY).then((result) => {
    pics = result;
  });
  savePictures(pics);
  // loadPictures(pics);
}

function handleList() {
  let dessert_item = Array.from(document.getElementsByClassName("dessert"));
  //'30' items per page
  if (dessert_item.length > 30) {
    for (let i = 0; i < 30; i++) {
      list.removeChild(dessert_item[i]);
    }
  }
}

async function loadSlides() {
  let pics;
  await pictures.getRandom(QUERY).then((result) => {
    pics = result;
  });

  pics.forEach((pic) => {
    const li = document.createElement("li");
    const img = document.createElement("img");
    li.className = RANDOM_SLIDE;
    img.src = pic.urls.small;
    li.append(img);
    random.append(li);
  });
}

function saveKeywords() {
  localStorage.setItem(KEYWORDS, JSON.stringify(keywordsList));
}

function paintKeywords(text) {
  const li = document.createElement("li");
  li.innerText = text;
  keywords.append(li);

  if (keywordsList.length > 5) {
    keywordsList.shift();
  } else {
    keywordsList.push(text);
  }
  saveKeywords();
}

function loadKeywords() {
  const ls_keywords = JSON.parse(localStorage.getItem(KEYWORDS));
  if (ls_keywords !== null) {
    ls_keywords.forEach((text) => paintKeywords(text));
  }
}

async function handleScroll(event) {
  const scrollHeight = document.documentElement.scrollHeight;
  const scrollTop = document.documentElement.scrollTop;
  const clientHeight = document.documentElement.clientHeight;

  if (scrollHeight === scrollTop + clientHeight) {
    h2.innerText = "scroll Bottom!";
    // await pictures.search(searchInput.value).then((data) => {
    // //   localStorage.setItem(PICTURES, JSON.stringify(data.results));
    // //   loadPictures(data.results);
    // console.log([...data.results, ...data.results]);
    // });
  }
}

function init() {
  searchForm.addEventListener("submit", onSubmit);

  if (!ls_pictures) {
    getPictures(ls_pictures);
  }
  loadPictures(ls_pictures);
  loadKeywords();
  loadSlides();
  window.addEventListener("scroll", handleScroll);
  get_btn.addEventListener("click", loadSlides)
}
init();
