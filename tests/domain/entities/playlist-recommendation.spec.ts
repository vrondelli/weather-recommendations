import { PlaylistRecommendation } from '../../../src/domain/entities/playlist-recommendation';
import { testCityAbove25, testCityBetween10And25, testCityBelow10 } from '../../fixtures/test-city';
import { MusicGenres } from '../../../src/enums';
import { testPlaylist } from '../../fixtures/test-playlist';

describe('PlaylistRecommendation Entity', () => {
  describe('getMusicGenreByCityWeather()', () => {
    describe('returns a music genre based on city weather', () => {
      describe('when temperature is above 25', () => {
        test('returns pop genre', () => {
          const playlistRecommendation = new PlaylistRecommendation(testCityAbove25);

          const musicGenre = playlistRecommendation.getMusicGenreByCityWeather();

          expect(musicGenre).toBe(MusicGenres.Pop);
        });
      });

      describe('when temperature is between 10 and 25', () => {
        test('returns rock genre', () => {
          const playlistRecommendation = new PlaylistRecommendation(testCityBetween10And25);

          const musicGenre = playlistRecommendation.getMusicGenreByCityWeather();

          expect(musicGenre).toBe(MusicGenres.Rock);
        });
      });

      describe('when temperature is below 10', () => {
        test('returns classical genre', () => {
          const playlistRecommendation = new PlaylistRecommendation(testCityBelow10);

          const musicGenre = playlistRecommendation.getMusicGenreByCityWeather();

          expect(musicGenre).toBe(MusicGenres.Classical);
        });
      });
    });
  });

  describe('updatePlaylistRecommendation()', () => {
    test('returns playlist recomendation plain object', () => {
      const expectedResult = {
        city: testCityAbove25,
        genre: undefined,
        playlist: testPlaylist,
      };

      const playlistRecommendation = new PlaylistRecommendation(testCityAbove25);

      const result = playlistRecommendation.updatePlaylistRecommendation(testPlaylist);

      expect(result).toStrictEqual(expectedResult);
    });
  });
});
