import { testPlaylist } from './test-playlist';
import { IPlaylistProvider } from '../../src/interfaces/i-playlist-provider';

const getPlaylistByGenre = async () => testPlaylist;

export const testPlaylistProvider = ({
  getPlaylistByGenre,
} as IPlaylistProvider);
