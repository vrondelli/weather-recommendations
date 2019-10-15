import { Track } from '../../src/domain/entities/track';
import { PlayList } from '../../src/domain/entities/playlist';

const track = new Track('teste', 'http://teste.com', ['teste'], 'http://teste.com', 'teste');

export const testPlaylist = new PlayList('teste', 'http://teste.com', 'http://teste.com', [track]);
