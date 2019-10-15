import * as request from 'request-promise-native';
import { Injectable, HttpStatus, NotFoundException } from '@nestjs/common';
import Joi from '@hapi/joi';
import config from '../../config';
import { IOpenWeatherCityWeatherResponse } from '../../interfaces';

const { openWeather: { baseUrl, apiKey } } = config;

@Injectable()
export class OpenWeatherService {
  private readonly schema = Joi.object().keys(
    {
      id: Joi.number().required(),
      name: Joi.string().required(),
      coord: Joi.object().keys({
        lat: Joi.number(),
        lon: Joi.number(),
      }),
      main: Joi.object().keys({
        temp: Joi.number().required(),
        pressure: Joi.number().required(),
        humidity: Joi.number().required(),
        temp_min: Joi.number().required(),
        temp_max: Joi.number().required(),
      }).required(),
      dt: Joi.number(),
      wind: Joi.object().keys({
        speed: Joi.number(),
        deg: Joi.number(),
      }),
      sys: Joi.object().keys({
        type: Joi.number(),
        country: Joi.string(),
        id: Joi.number(),
        message: Joi.number(),
        sunrise: Joi.number(),
        sunset: Joi.number(),
      }),
      clouds: Joi.object().keys({
        all: Joi.number(),
      }),
      weather: Joi.array().items(Joi.object().keys({
        id: Joi.number(),
        main: Joi.string(),
        description: Joi.string(),
        icon: Joi.string(),
      })),
      base: Joi.string(),
      visibility: Joi.number(),
      timezone: Joi.number(),
      cod: Joi.number(),
      rain: Joi.any(),
    },
  );

  public async getCityWeatherInfo(cityName: string) {
    const url = this.getCityWeatherInfoUrl(cityName);

    return request.get(url, { json: true }).then(response => {
      const { error } = this.schema.validate(response);

      if (error) {
        throw new Error(error.stack);
      }

      return response as IOpenWeatherCityWeatherResponse;
    }).catch(error => {
      if (error.statusCode === HttpStatus.NOT_FOUND) {
        throw new NotFoundException(error.message);
      }

      throw new Error(error.message);
    });
  }

  private getCityWeatherInfoUrl(cityName: string): string {
    return `${baseUrl}q=${cityName}&units=metric&appid=${apiKey}`;
  }

}
