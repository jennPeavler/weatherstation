import { useQuery } from '@redwoodjs/web'
import { useState } from 'react'
require('./Homepage.css');

const HomePage = () => {
  const [city, setCity] = useState('Aurora');
  const [cityInput, setCityInput] = useState();

  const WEATHER_QUERY = gql`
  query($city: String!) {
    weather: getWeather(city: $city) {
      city
      conditions
      temp,
      humidity,
      descriptions
    }
  }
`
  const QUOTE_QUERY = gql`
    query($city: String!) {
      quote: getQuote(city: $city) {
        text
      }
    }
  `


  // console.log(useQuery(QUOTE_QUERY, { variables: { city }}))
  const quoteData = useQuery(QUOTE_QUERY, { variables: { city }}).data;

  const { data, loading, error } = useQuery(WEATHER_QUERY, { variables: { city }});

  if(loading) return <div>Loading...</div>;
  if(error) return <div>{error}</div>;

  const weather = data.weather;

  let quote;
  if(quoteData) {
    quote = quoteData.quote.text;
  } else {
    quote = 'I have only one heart.  I will not hide it from the world';
  }

  console.log({ weather });

  let weatherClass = 'clear';
  if(weather.conditions.some(condition => condition.toLowerCase() === 'rain'  ||  condition.toLowerCase() === 'mist')) {
    weatherClass = 'rain';
  }
  if(weather.conditions.some(condition => condition.toLowerCase() === 'snow')) {
    weatherClass = 'snow';
  }
  if(weather.conditions.some(condition => condition.toLowerCase() === 'clouds')) {
    weatherClass = 'clouds';
  }

  const submitCity = (e) => {
		if(e.keyCode === 13) {
			const inputEl = document.querySelector('.weather__city');
			if(inputEl) {
				inputEl.blur();
			}
      setCity(cityInput)
    }
	}

  const getRepeatingBackgroundText = (quote) => {
		let text = quote;
		for(let i=0; i < 50; i++) {
			text += quote;
			text += ' ';
		}

		return <div className='weather__background-text'>{text}</div>;
	}

  return (
    <main className={`weather weather--${weatherClass}`}>
      {getRepeatingBackgroundText(quote)}
      <div className={`weather__container weather__container--${weatherClass}`}>
        <section className={`weather__information weather__information`}>
          <div>
            <input className={`weather__city weather__city--${weatherClass}`} placeholder={weather.city} onChange={(e) => setCityInput(e.target.value)} onKeyDown={(e) => submitCity(e)} title='Enter City'/>
            <div className={`weather__temp weather__temp--${weatherClass}`}>{Math.round(weather.temp)}&deg;</div>
          </div>
          <div className={`weather__description-text weather__description-text--${weatherClass}`}>{weather.descriptions.map(description => description)}</div>
        </section>
      </div>
    </main>
  );
}

export default HomePage
