import { Module } from '@nestjs/common';
import SpotifyApi from 'spotify-web-api-node';

import { RecommendationController } from './app/controllers/recomendation.controller';
import { OpenWeatherService } from './app/services/open-weather.service';
import { SpotifyService } from './app/services/spotify.service';
import spotifyApi from './spotify-api';
import { PlaylistRecommendationService } from './domain/services/playlist-recommendation.service';
import { IPlaylistProvider } from './interfaces';

@Module({
  imports: [],
  controllers: [RecommendationController],
  providers: [
    OpenWeatherService,
    {
      provide: IPlaylistProvider,
      useClass: SpotifyService,
    },
    {
      provide: SpotifyApi,
      useValue: spotifyApi,
    },
    PlaylistRecommendationService,
  ],
})
export class AppModule { }
