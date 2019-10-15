import { City } from '../../src/domain/entities/city';
import { Temperature } from '../../src/domain/value-objects/temperature';
import { TemperatureUnits } from '../../src/enums/temperature-units';

const temperatureAbove25 = new Temperature(
  30,
  TemperatureUnits.Celsius,
);

const temperatureBetween10And25 = new Temperature(
  24,
  TemperatureUnits.Celsius,
);

const temperatureBelow10 = new Temperature(
  8,
  TemperatureUnits.Celsius,
);

export const testCityAbove25 = new City('Rio de Janeiro', temperatureAbove25);

export const testCityBetween10And25 = new City('Rio de Janeiro', temperatureBetween10And25);

export const testCityBelow10 = new City('Rio de Janeiro', temperatureBelow10);
