const weather = document.querySelector(".js-weather");
const COORDS = "coords";
const API_KEY = "68a1ed56171947f481c3d64742e73c06";
// API(Application Programming Interface): 다른 서버의 데이터를 쉽게 가져올 수 있는 방법

// URL을 이용한 Request
function getWeather(lat, long) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      const temperature = Math.floor(json.main.temp);
      const place = json.name;
      weather.innerHTML = `Currently ${temperature}°C in ${place}`;
    });
  // then(): 앞서 호출한 함수가 수행을 완료한 다음에 호출할 함수를 기입함.
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude, // key와 value가 같은 변수이름으로 되어있다면 A : B 형식이 아니라 그냥 key값만 정해주면 된다.
    longitude,
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function handleGeoError() {
  console.log("Can't access geo location");
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
  // 위치정보를 불러오는 함수 (성공했을 때 작동함수, 실패했을 때 작동함수)
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords();
  } else {
    const parsedCoords = JSON.parse(loadedCoords);
    getWeather(parsedCoords.latitude, parsedCoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();
