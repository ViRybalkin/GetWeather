const city = document.querySelector('.town-name');
const clouds = document.querySelector('.clouds');
const max = document.querySelector('.max');
const min = document.querySelector('.min');
const weather = document.querySelector('.weather');
const wind = document.querySelector('.wind');
const windDeg = document.querySelector('.wind-deg');
const pressure = document.querySelector('.pressure');
const visibility = document.querySelector('.visibility');
let error = document.querySelector('.error');

const param = {
  "url" : "https://api.openweathermap.org/data/2.5/",
	"appid" : "6f7780293fa69142d07a58d755ea1913"
};

function getWeather() {
  const town = document.querySelector('.town');
  const choiceCity = town.value;
  const weather2 = document.querySelector('.weather');
  choiceCity.toLowerCase();

  fetch(`${param.url}weather?q=${choiceCity}&appid=${param.appid}`)
	.then(weather => {
    if (weather.status === 404) {
      error.innerHTML = `This town is not found<br>Choose other town`
      city.textContent = '';
      clouds.innerHTML = '';
      weather2.innerHTML  = '';
      max.innerHTML = '';
      min.innerHTML = '';
      wind.textContent = '';
      windDeg.innerHTML = '';
      pressure.textContent = '';
      visibility.textContent = '';;
    } else{
      error.innerHTML = ``;
      return weather.json();
    }
	}).then(showWeather);
};
document.querySelector('.town').onchange = getWeather;

function showWeather(data) {
  city.textContent = data.name;
	clouds.innerHTML = `${data.weather[0].description}<img class="weather__img" src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"> `;
	weather.innerHTML = `${Math.round(data.main.temp - 273.15)} &#8451;`;
	max.innerHTML = `Макс	${Math.round(data.main.temp_max - 273.15)} &#8451;`;
	min.innerHTML = `Мин ${Math.round(data.main.temp_min - 273.15	)} &#8451;`;
	wind.textContent = `Скорость ветра ${data.wind.speed} m/s`;
	windDeg.innerHTML = `Направелние ветра ${data.wind.deg} &deg;`;
	pressure.textContent = `Давление ${data.main.pressure} mm Hg`;
	visibility.textContent = `Видимость ${data.visibility / 1000} km`;
};
