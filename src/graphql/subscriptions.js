/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateArtist = /* GraphQL */ `
  subscription OnCreateArtist($filter: ModelSubscriptionArtistFilterInput) {
    onCreateArtist(filter: $filter) {
      id
      name
      albums {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateArtist = /* GraphQL */ `
  subscription OnUpdateArtist($filter: ModelSubscriptionArtistFilterInput) {
    onUpdateArtist(filter: $filter) {
      id
      name
      albums {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteArtist = /* GraphQL */ `
  subscription OnDeleteArtist($filter: ModelSubscriptionArtistFilterInput) {
    onDeleteArtist(filter: $filter) {
      id
      name
      albums {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateAlbum = /* GraphQL */ `
  subscription OnCreateAlbum($filter: ModelSubscriptionAlbumFilterInput) {
    onCreateAlbum(filter: $filter) {
      id
      title
      artistId
      artist {
        id
        name
        createdAt
        updatedAt
        __typename
      }
      songs {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      artistAlbumsId
      __typename
    }
  }
`;
export const onUpdateAlbum = /* GraphQL */ `
  subscription OnUpdateAlbum($filter: ModelSubscriptionAlbumFilterInput) {
    onUpdateAlbum(filter: $filter) {
      id
      title
      artistId
      artist {
        id
        name
        createdAt
        updatedAt
        __typename
      }
      songs {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      artistAlbumsId
      __typename
    }
  }
`;
export const onDeleteAlbum = /* GraphQL */ `
  subscription OnDeleteAlbum($filter: ModelSubscriptionAlbumFilterInput) {
    onDeleteAlbum(filter: $filter) {
      id
      title
      artistId
      artist {
        id
        name
        createdAt
        updatedAt
        __typename
      }
      songs {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      artistAlbumsId
      __typename
    }
  }
`;
export const onCreateSong = /* GraphQL */ `
  subscription OnCreateSong($filter: ModelSubscriptionSongFilterInput) {
    onCreateSong(filter: $filter) {
      id
      title
      albumId
      album {
        id
        title
        artistId
        createdAt
        updatedAt
        artistAlbumsId
        __typename
      }
      createdAt
      updatedAt
      albumSongsId
      __typename
    }
  }
`;
export const onUpdateSong = /* GraphQL */ `
  subscription OnUpdateSong($filter: ModelSubscriptionSongFilterInput) {
    onUpdateSong(filter: $filter) {
      id
      title
      albumId
      album {
        id
        title
        artistId
        createdAt
        updatedAt
        artistAlbumsId
        __typename
      }
      createdAt
      updatedAt
      albumSongsId
      __typename
    }
  }
`;
export const onDeleteSong = /* GraphQL */ `
  subscription OnDeleteSong($filter: ModelSubscriptionSongFilterInput) {
    onDeleteSong(filter: $filter) {
      id
      title
      albumId
      album {
        id
        title
        artistId
        createdAt
        updatedAt
        artistAlbumsId
        __typename
      }
      createdAt
      updatedAt
      albumSongsId
      __typename
    }
  }
`;
