import { Track } from './track';

export class PlayList {
  constructor(
    public name: string,
    public url: string,
    public imageUrl: string,
    public tracks: Track[],
  ) { }

  public getTrackByName(name: string) {
    return this.tracks.find(track => track.name.toUpperCase() === name.toUpperCase());
  }
}
