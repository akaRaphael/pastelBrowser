const form = document.querySelector(".js-form");
// 쿼리셀렉터는 첫번째로 검색된 엘리먼트를 가져온다.
const input = form.querySelector("input");
const greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser";
const SHOWING_CN = "showing";

function saveName(text) {
  localStorage.setItem(USER_LS, text);
}

function handleSubmit(event) {
  event.preventDefault(); // 1. 기존의 event가 수행하는 동작을 금지함(막음)
  // 원래 form태그 내부에 존재하는 input태그에 무언가 입력 후 엔터를 치면
  // 다른 곳으로 보내려하는 동작이 default인데 그것을 막음
  const currentValue = input.value; // 2. 이미 만들어 놓은 input 변수의 value를 받아와서 저장 후
  paintGreeting(currentValue); // 3. input값을 받아서 출력하도록 만듬
  // 4. 그런데 여기서 문제점은 브라우저를 새로고침하면 정보가 다 날아간다는 것.
  saveName(currentValue); // 5. 그러므로 이걸 Local Storage에 저장함
  // * 추가적으로 Local Storage는 웹사이트의 URL에 의해 지정된다.
  // * 동일한 페이지여도 URL이 다르면 Local Storage가 달라지는 것이다.
}

function askForName() {
  form.classList.add(SHOWING_CN);
  form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text) {
  form.classList.remove(SHOWING_CN);
  greeting.classList.add(SHOWING_CN);
  greeting.innerHTML = `Hello, ${text}. What is your plan today?`;
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  //USER_LS 변수에 담긴 값을 key로 하는 값을 지역저장소에서 찾아내는 함수
  if (currentUser === null) {
    // currentUser에 아무것도 값도 없는 경우 실행
    askForName(); // askForName() 함수는 input태그가 출력되도록 한다.
  } else {
    paintGreeting(currentUser);
  }
}

function init() {
  loadName();
}

init();
