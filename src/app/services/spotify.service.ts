import { Injectable } from '@nestjs/common';
import SpotifyApi from 'spotify-web-api-node';

import { IPlaylistProvider } from '../../interfaces/i-playlist-provider';
import { MusicGenres } from '../../enums';
import { PlayList } from '../../domain/entities/playlist';
import { Track } from '../../domain/entities/track';

export enum SpotifyCategoriesIds {
  Rock = 'rock',
  Pop = 'pop',
  Classical = 'classical',
}

@Injectable()
export class SpotifyService implements IPlaylistProvider {
  constructor(private readonly spotifyApi: SpotifyApi) {
  }

  public async getPlaylistByGenre(genre: MusicGenres): Promise<PlayList> {
    const categoryId = this.getCategoryIdForMusicGenre(genre);

    let spotifyPlaylist: SpotifyApi.PlaylistObjectSimplified;

    return this.spotifyApi.getPlaylistsForCategory(categoryId).then(data => {
      spotifyPlaylist = this.getRandomPlaylist(data.body.playlists.items);

      return this.spotifyApi.getPlaylistTracks(spotifyPlaylist.id);
    }).then(data => {
      const tracks = this.getTracksFromSpotifyTrackResponse(data.body.items);

      return new PlayList(
        spotifyPlaylist.name,
        spotifyPlaylist.external_urls.spotify,
        spotifyPlaylist.images[0].url,
        tracks,
      );
    }).catch(error => {
      throw new Error(error);
    });
  }

  private getCategoryIdForMusicGenre(genre: MusicGenres) {
    const MusicGenreCategoryIdMap = {
      [MusicGenres.Rock]: SpotifyCategoriesIds.Rock,
      [MusicGenres.Pop]: SpotifyCategoriesIds.Pop,
      [MusicGenres.Classical]: SpotifyCategoriesIds.Classical,
    };

    return MusicGenreCategoryIdMap[genre];
  }

  private getRandomPlaylist(playlists: SpotifyApi.PlaylistObjectSimplified[]) {
    const randomNumber = Math.floor(Math.random() * playlists.length);

    return playlists[randomNumber];
  }

  private getTracksFromSpotifyTrackResponse(spotifyTracks: SpotifyApi.PlaylistTrackObject[]) {
    return spotifyTracks.map(trackItem => {
      const { track } = trackItem;
      const artists = track.artists.map(artist => artist.name);

      return new Track(
        track.name,
        track.external_urls.spotify,
        artists,
        track.album.images[0].url,
        track.album.name,
      );
    });
  }
}
