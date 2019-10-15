import { Injectable, Inject } from '@nestjs/common';
import { OpenWeatherService } from '../../app/services/open-weather.service';
import { Temperature } from '../value-objects/temperature';
import { TemperatureUnits } from '../../enums/temperature-units';
import { City } from '../entities/city';
import { PlaylistRecommendation } from '../entities/playlist-recommendation';
import { IPlaylistProvider } from '../../interfaces/i-playlist-provider';

@Injectable()
export class PlaylistRecommendationService {
  constructor(
    private readonly openWeatherService: OpenWeatherService,
    @Inject(IPlaylistProvider) private readonly playlistProvider: IPlaylistProvider,
  ) { }

  public async getRecommentationByCityName(cityName: string) {
    const cityWeather = await this.openWeatherService.getCityWeatherInfo(cityName);
    const temperature = new Temperature(
      cityWeather.main.temp,
      TemperatureUnits.Celsius,
    );

    const city = new City(cityName, temperature);
    const playlistRecommendation = new PlaylistRecommendation(
      city,
    );

    const recommendedMusicGenre = playlistRecommendation.getMusicGenreByCityWeather();
    const playlist = await this.playlistProvider.getPlaylistByGenre(recommendedMusicGenre);

    return playlistRecommendation.updatePlaylistRecommendation(playlist);
  }

}
