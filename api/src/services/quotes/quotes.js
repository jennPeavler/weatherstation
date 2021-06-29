import fetch from 'node-fetch';

export const getQuote = async ({ city }) => {
	const response = await fetch(
    `http://quotes.stormconsultancy.co.uk/random.json`
  );
  const json = await response.json();

  return {
    text: json.quote
  };
};