const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = []; // toDo를 저장할 리스트 생성

function saveToDos() {
  // 저장할 때, object를 string으로 형변환
  // JSON.stringify()를 이용하면 object를 string으로 형변환할 수 있다.
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function deleteToDo(event) {
  // 삭제 버튼이 클릭되면 li태그가 지워지는 기능을 구현한다.
  // 하지만, 어떤 버튼이 클릭되었는지 알지 못한다. 이를 해결하기 위해 target을 사용한다.
  // 또 다른 문제점은 해당 삭제버튼이 들어있는 li태그(부모)를 찾아야 한다는 것이다.
  // console.dir(event.target)을 실행하면 해당 이벤트가 실행된 엘리먼트의 속성정보를 볼 수 있다.
  // 속성정보 중 parentNode 라는 속성값을 사용하면 부모 엘리먼트를 찾을 수 있다.
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li); // removeChild(): 특정 엘리먼트의 자식 엘리먼트를 삭제하는 함수
  // 아직 완벽하게 지워진 것이 아니다. HTML 상에서만 삭제될 뿐 지역저장소에는 기록이 남아있기때문에
  // 새로고침을 하면 지웠던 리스트가 다시 생성된다. 그러므로 로컬 저장소에 있는 정보도 삭제해줘야 한다.

  const cleanToDos = toDos.filter(function filterFn(toDo) {
    // filterFn(): 삭제 버튼을 작동으로 어떤 li태그가 삭제되었는지 확인하기위한 함수
    return toDo.id !== parseInt(li.id);
    // id를 비교하여 없는 삭제된 id를 찾아 반환한다
    // parseInt(): 엘리먼트의 속성값은 string이고 toDo.id는 정수형이므로 문자를 정수로 형변환한다.
  });
  // filter(): filterFn()에서 반환된 데이터를 toDos 리스트에서 걸러내는 함수
  toDos = cleanToDos;
  // 초기에 선언할 때, toDos는 const타입으로 값을 변경할 수 없었다.
  // 그러나 삭제기능 구현을 위해서 let타입으로 변경한다. (toDos = cleanToDos; 이걸 하기 위해서)
  saveToDos();
}

function paintToDo(text) {
  const li = document.createElement("li"); // li 생성(엘리먼트를 생성시키는 함수 )
  const delBtn = document.createElement("button"); //버튼 생성
  const span = document.createElement("span");
  const newId = toDos.length + 1;

  delBtn.innerText = "❌";
  delBtn.addEventListener("click", deleteToDo);
  span.innerText = text;

  li.appendChild(span); // li 태그 내부에 자식태그를 생성하는 함수
  li.appendChild(delBtn);
  toDoList.appendChild(li);
  li.id = newId; // li태그를 삭제할 때, 어떤 li태그를 삭제할 것인지 구분하기 위해 id속성값을 부여

  const toDoObj = {
    // toDos 배열안에 넣을 정보를 setup
    text: text,
    id: newId,
  };
  toDos.push(toDoObj); // setup된 정보를 배열에 push
  saveToDos(); // toDos를 지역저장소에 저장하는 함수를 호출
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    // 스트링으로 바뀌어 저장되어있는 value를 불러와서 사용해야 하므로
    // JSON을 활용하여 string을 다시 object로 형변환 시켜준다.
    parsedToDos.forEach(function (toDo) {
      // parsedToDos에 들어있는 각 데이터를 toDo라는 매개변수에 넣어서 아래 명령문을 실행힌다.
      paintToDo(toDo.text);
    });
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
