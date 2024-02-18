import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection, AsyncItem } from "@aws-amplify/datastore";





type EagerArtist = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Artist, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly albums?: (Album | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyArtist = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Artist, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly albums: AsyncCollection<Album>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Artist = LazyLoading extends LazyLoadingDisabled ? EagerArtist : LazyArtist

export declare const Artist: (new (init: ModelInit<Artist>) => Artist) & {
  copyOf(source: Artist, mutator: (draft: MutableModel<Artist>) => MutableModel<Artist> | void): Artist;
}

type EagerAlbum = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Album, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly title: string;
  readonly artist: Artist;
  readonly songs?: (Song | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly artistAlbumsId?: string | null;
}

type LazyAlbum = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Album, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly title: string;
  readonly artist: AsyncItem<Artist>;
  readonly songs: AsyncCollection<Song>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly artistAlbumsId?: string | null;
}

export declare type Album = LazyLoading extends LazyLoadingDisabled ? EagerAlbum : LazyAlbum

export declare const Album: (new (init: ModelInit<Album>) => Album) & {
  copyOf(source: Album, mutator: (draft: MutableModel<Album>) => MutableModel<Album> | void): Album;
}

type EagerSong = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Song, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly title: string;
  readonly album: Album;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly albumSongsId?: string | null;
}

type LazySong = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Song, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly title: string;
  readonly album: AsyncItem<Album>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly albumSongsId?: string | null;
}

export declare type Song = LazyLoading extends LazyLoadingDisabled ? EagerSong : LazySong

export declare const Song: (new (init: ModelInit<Song>) => Song) & {
  copyOf(source: Song, mutator: (draft: MutableModel<Song>) => MutableModel<Song> | void): Song;
}