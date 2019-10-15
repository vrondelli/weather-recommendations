import SpotifyApi from 'spotify-web-api-node';
import config from './config';

const { spotify: { clientId, clientSecret } } = config;

const spotifyApi = new SpotifyApi({
  clientId,
  clientSecret,
});

spotifyApi.clientCredentialsGrant().then(data => {
  spotifyApi.setAccessToken(data.body.access_token);
});

const refreshAccessTokenTime = 3000000;

setInterval(() => {
  spotifyApi.refreshAccessToken().then(data => {
    spotifyApi.setAccessToken(data.body.access_token);
  });
}, refreshAccessTokenTime);

export default spotifyApi;
