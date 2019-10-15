const cities = require('all-the-cities');

import { Controller, Get, Query, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { PlaylistRecommendationService } from '../../domain/services/playlist-recommendation.service';

@Controller('recommendations')
export class RecommendationController {
  constructor(private readonly playlistRecommendationService: PlaylistRecommendationService) { }

  @Get('music')
  public async getMusicRecommendation(@Query('cityName') cityName: string) {
    if (this.isValidCityName(cityName)) {
      try {
        return this.playlistRecommendationService.getRecommentationByCityName(cityName);
      } catch (error) {
        throw new InternalServerErrorException(error);
      }
    }

    throw new NotFoundException('City not found');
  }

  private isValidCityName(cityName: string) {
    return cities
      .filter(city => city.name.toUpperCase() === cityName.toUpperCase())
      .length > 0;
  }
}
