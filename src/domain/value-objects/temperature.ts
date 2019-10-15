import { TemperatureUnits } from '../../enums/temperature-units';

export class Temperature {
  constructor(
    public value: number,
    public unit: TemperatureUnits,
  ) { }
}
