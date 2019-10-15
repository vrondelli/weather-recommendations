import { Temperature } from '../value-objects/temperature';

export class City {
  constructor(
    public name: string,
    public temperature: Temperature,
  ) { }
}
