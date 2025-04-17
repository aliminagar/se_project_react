export const APIkey = "5874fcf6d5b890113c7aa2f97b90ea01";

export const getWeather = ({ longitude, latitude }) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
  ).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error: ${res.status}`);
    }
  });
};
export const filterWeatherData = (data) => {
  const tempF = data.main.temp;
  const tempC = ((tempF - 32) * 5) / 9;

  const result = {};
  result.city = data.name;
  result.temp = {
    F: tempF,
    C: tempC,
  };
  result.type = getWeatherType(tempF);
  result.condition = data.weather[0].main.toLowerCase();
  result.isDay = isDay(data.sys, Date.now());

  return result;
};

const isDay = ({ sunrise, sunset }, now) => {
  return sunrise * 1000 < now && now < sunset * 1000;
};

const getWeatherType = (temperature) => {
  if (temperature >= 86) {
    return "hot";
  } else if (temperature >= 66 && temperature < 86) {
    return "warm";
  } else {
    return "cold";
  }
};
