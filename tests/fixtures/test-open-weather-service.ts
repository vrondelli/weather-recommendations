import { IOpenWeatherCityWeatherResponse } from '../../src/interfaces';
import { OpenWeatherService } from '../../src/app/services/open-weather.service';

export const testOpenWeatherResponse = ({
  main: {
    temp: 25,
  },
} as IOpenWeatherCityWeatherResponse);

const getCityWeatherInfo = async () => testOpenWeatherResponse;

export const testOpenWeatherService = (({
  getCityWeatherInfo,
} as any) as OpenWeatherService);
