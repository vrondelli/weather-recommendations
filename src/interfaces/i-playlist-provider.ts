import { MusicGenres } from '../enums';
import { PlayList } from '../domain/entities/playlist';

export const IPlaylistProvider = Symbol('IPlaylistProvider');
export interface IPlaylistProvider {
  getPlaylistByGenre(genre: MusicGenres): Promise<PlayList>;
}
