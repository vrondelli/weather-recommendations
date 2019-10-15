// tslint:disable-next-line: no-var-requires
require('dotenv').config();

export default {
  openWeather: {
    baseUrl: process.env.OPEN_WEATHER_BASE_URL,
    apiKey: process.env.OPEN_WEATHER_API_KEY,
  },
  spotify: {
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  },
};
