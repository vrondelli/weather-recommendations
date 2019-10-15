import { City } from './city';
import { PlayList } from './playlist';
import { MusicGenres } from '../../enums';

export class PlaylistRecommendation {
  public get city(): City {
    return this._city;
  }
  private _city: City;

  public get playlist(): PlayList {
    return this._playlist;
  }
  private _playlist: PlayList;

  public get genre(): MusicGenres {
    return this._genre;
  }
  private _genre: MusicGenres;

  constructor(city: City) {
    this._city = city;
  }

  public getMusicGenreByCityWeather() {
    const temperatureValue = this._city.temperature.value;

    if (temperatureValue < 10) {
      return this._genre = MusicGenres.Classical;
    }

    if (temperatureValue >= 10 && temperatureValue <= 25) {
      return this._genre = MusicGenres.Rock;
    }

    return this._genre = MusicGenres.Pop;
  }

  public updatePlaylistRecommendation(playlist: PlayList) {
    this._playlist = playlist;

    return this.getPlainObject();
  }

  public getPlainObject() {
    return {
      city: this._city,
      genre: this._genre,
      playlist: this._playlist,
    };
  }
}
