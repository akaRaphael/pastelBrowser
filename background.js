const body = document.querySelector("body");

const IMG_NUMBER = 7;

// function handleImgLoad() {
//   console.log("loading finished");
// }

function paintImage(imgNumber) {
  const image = new Image();
  image.src = `images/${imgNumber}.jpg`;
  image.classList.add("bgImage");
  body.prepend(image); // prepend = 앞쪽에 붙이는거, append = 뒤쪽에 붙이는거
  //image.addEventListener("loadend", handleImgLoad); //나중에 API 사용할 때 필요할거임
}

function genRandom() {
  const number = Math.floor(Math.random() * 9) + 1;
  console.log(number);
  return number;
  // floor = 버림, ceil = 올림
  // random 최대범위 = 곱하기, random 최소값 = 더하기
}
function init() {
  const randomNumber = genRandom();
  paintImage(randomNumber);
}

init();
