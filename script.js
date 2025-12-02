document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#result").innerHTML = "<h1>made by 69rem</h1>";

  const getWeather = () => {
    const city = document.getElementById("cityInput").value;
    const result = document.getElementById("result");

    const API_KEY = "3b29decf0884c4362549677210e698a5";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=ru`;

    if (!city.trim()) {
      document.querySelector("#result").classList.remove("weather-result");
      result.innerHTML = "Введите город";
      return;
    }

    fetch(url)
      .then((responce) => responce.json())
      .then((data) => {
        if (data.cod == 404) {
          document.querySelector("#result").classList.remove("weather-result");
          result.innerHTML = "Город не найден";
          return;
        } else if (data.cod !== 200) {
          document.querySelector("#result").classList.remove("weather-result");
          result.innerHTML = "Ошибка, причина в консоли браузера";
          return;
        }

        const icon = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

        document.getElementById("result").innerHTML = `
        <img src="${iconUrl}" alt="icon">
        <h3>Погода в ${data.name}, ${data.sys.country}</h3>
        <p>Температура: <b>${Math.round(data.main.temp)}°C</b></p>
        <p>Ощущается как: <b>${Math.round(data.main.feels_like)}°C</b></p>
        <p>Погода: <b>${data.weather[0].description}</b></p>
        <p>Влажность: <b>${data.main.humidity}%</b></p>
        <p>Ветер: <b>${data.wind.speed} м/с</b></p>
        <p>Восход: <b>${new Date(data.sys.sunrise * 1000).toLocaleTimeString(
          "ru-RU"
        )}</b></p>
        <p>Закат: <b>${new Date(data.sys.sunset * 1000).toLocaleTimeString(
          "ru-RU"
        )}</b></p>
        `;
      })
      .catch((e) => {
        console.log(`Ошибка: ${e}`);
      });
  };

  document.getElementById("btn").addEventListener("click", () => {
    document.querySelector("#result").classList.add("weather-result");
    getWeather();
  });

  document.getElementById("cityInput").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      document.querySelector("#result").classList.add("weather-result");
      getWeather();
    }
  });

  document.getElementById("btn").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      document.querySelector("#result").classList.add("weather-result");
      getWeather();
    }
  });
});
