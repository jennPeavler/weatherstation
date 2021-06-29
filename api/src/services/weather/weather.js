import fetch from 'node-fetch';

export const getWeather = async ({ city }) => {
  const response = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${city},US&appid=3fda9b85976f152071e5581670eaf891&units=imperial`
  )
  const json = await response.json()

	if(json.message && json.message === 'city not found') {
		return {
			city: 'city not found',
			conditions: [],
			temp: 0,
			humidity: 0,
			descriptions: []
		}
	};

  return {
    city,
    conditions: json.weather.map(w => w.main),
    temp: Math.round(json.main.temp),
		humidity: json.main.humidity,
		descriptions: json.weather.map(w => w.description)
  };
};

