import { PlaylistRecommendationService } from '../../../src/domain/services/playlist-recommendation.service';
import { testOpenWeatherService, testOpenWeatherResponse } from '../../fixtures/test-open-weather-service';
import { testPlaylistProvider } from '../../fixtures/test-spotify-service';
import { testPlaylist } from '../../fixtures/test-playlist';
import { MusicGenres } from '../../../src/enums';
import { City } from '../../../src/domain/entities/city';
import { Temperature } from '../../../src/domain/value-objects/temperature';
import { TemperatureUnits } from '../../../src/enums/temperature-units';

describe('PlaylistRecommendationService', () => {
  describe('getRecommentationByCityName', () => {
    test('returns PlaylistRecommendation by city name', async () => {
      const playlistRecommendationService = new PlaylistRecommendationService(
        testOpenWeatherService,
        testPlaylistProvider,
      );

      const cityName = 'Rio de Janeiro';

      const expectedTemperature = new Temperature(
        testOpenWeatherResponse.main.temp,
        TemperatureUnits.Celsius,
      );
      const expectedCity = new City(cityName, expectedTemperature);

      const expectedResult = {
        city: expectedCity,
        genre: MusicGenres.Rock,
        playlist: testPlaylist,
      };

      const result = await playlistRecommendationService.getRecommentationByCityName(cityName);

      expect(result).toStrictEqual(expectedResult);
    });
  });
});
