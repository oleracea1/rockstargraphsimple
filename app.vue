<template>
  <div class="app">
    <!-- Artist list -->
    <div class="section">
      <h2>Artists</h2>
      <div class="list">
        <div v-for="artist in artists" :key="artist.id" :class="{ 'item': true, 'selected': artist === selectedArtist }" @click="selectArtist(artist)">
          <span>{{ artist.name }}</span>
          <button @click="deleteArtist(artist)">Delete</button>
        </div>
      </div>
      <div class="form">
        <input type="text" v-model="newArtistName" placeholder="Enter artist name" />
        <button @click="createArtist">Add Artist</button>
      </div>
    </div>

    <!-- Detail view -->
    <div v-if="selectedArtist" class="section">
      <h2>Selected Artist: {{ selectedArtist.name }}</h2>

      <!-- Albums -->
      <div>
        <h3>Albums</h3>
        <div v-for="album in albums" :key="album.id" :class="{ 'item': true, 'selected': album === selectedAlbum }" @click="selectAlbum(album)">
          <span>{{ album.title }}</span>
          <button @click="deleteAlbum(album)">Delete</button>
        </div>
        <div class="form">
          <input type="text" v-model="newAlbumTitle" placeholder="Enter album title" />
          <button @click="addAlbum">Add Album</button>
        </div>
      </div>

      <!-- Songs -->
      <div v-if="selectedAlbum">
        <h3>Songs for {{ selectedAlbum.title }}</h3>
        <div v-for="song in selectedAlbum.songs" :key="song.id" :class="{ 'item': true}">
          <span>{{ song.title }}</span>
          <button @click="deleteSong(song)">Delete</button>
        </div>
        <div class="form">
          <input type="text" v-model="newSongTitle" placeholder="Enter song title" />
          <button @click="addSong">Add Song</button>
        </div>
      </div>
    </div>
    <!--IT-Rockstar Logo Fading Up-->
    <div class="logo-container">
      <img src="/itrlogo_transp_flo.png" alt="IT Rockstars Logo" class="logo" />
    </div>
  </div>
</template>

<script>
import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/api';
import config from './src/amplifyconfiguration.json';

// Configure Amplify with the provided configuration
Amplify.configure(config);

// Import our GraphQL Queries and Mutations
import { createArtist, deleteArtist, createAlbum, createSong, deleteSong, deleteAlbum } from './src/graphql/mutations';
import { listArtists, listAlbums, listSongs } from "./src/graphql/queries"

// Generate GraphQL client
const client = generateClient();

export default {
  data() {
    return {
      // Data properties
      newArtistName: '',
      newAlbumTitle: '',
      newSongTitle: '',
      selectedArtist: null,
      selectedAlbum: null,
      artists: [], // Initialize the artists array
      albums: [], // Initialize the albums array
      songs: [] // Initialize the songs array
    };
  },

  async created() {
    // Fetch artists when the component is created
    await this.fetchArtists();
  },

  methods: {
    // Method to fetch artists
    async fetchArtists() {
      try {
        // Run the listArtists-Query to fetch all artists
        const result = await client.graphql({ query: listArtists });
        this.artists = result.data.listArtists.items;
      } catch (error) {
        console.error('Error fetching artists:', error);
      }
    },

    // Method to create a new artist
    async createArtist() {
      try {
        // Run the createArtist-Mutation to create a new artist
        const result = await client.graphql({
          query: createArtist,
          variables: {
            input: {
              name: this.newArtistName,
            },
          },
        });
        console.log('New artist created:', result.data.createArtist);
        this.newArtistName = '';
        await this.fetchArtists(); // Fetch artists after creating a new one
      } catch (error) {
        console.error('Error creating artist:', error);
      }
    },

    // Method to delete an artist
    async deleteArtist(artist) {
      try {
        await client.graphql({
          query: deleteArtist,
          variables: {
            input: {
              id: artist.id
            }
          }
        });
        console.log('Artist deleted:', artist);
        await this.fetchArtists(); // Fetch artists after deleting one
      } catch (error) {
        console.error('Error deleting artist:', error);
      }
    },

    // Method to add a new album
    async addAlbum() {
      try {
        const result = await client.graphql({
          query: createAlbum,
          variables: {
            input: {
              title: this.newAlbumTitle,
              artistId: this.selectedArtist.id
            }
          }
        });
        console.log('New album created:', result.data.createAlbum);
        this.newAlbumTitle = '';
        await this.fetchAlbums(); // Fetch albums after adding a new one
      } catch (error) {
        console.error('Error creating album:', error);
      }
    },

    // Method to add a new song
    async addSong() {
      try {
        if (!this.selectedAlbum) {
          console.error('No album selected.');
          return;
        }

        const result = await client.graphql({
          query: createSong,
          variables: {
            input: {
              title: this.newSongTitle,
              albumId: this.selectedAlbum.id
            }
          }
        });
        console.log('New song created:', result.data.createSong);
        this.newSongTitle = '';
        await this.fetchSongs(); // Fetch songs after adding a new one
      } catch (error) {
        console.error('Error creating song:', error);
      }
    },

    // Method to delete an album
    async deleteAlbum(album) {
      try {
        await client.graphql({
          query: deleteAlbum,
          variables: {
            input: {
              id: album.id
            }
          }
        });
        console.log('Album deleted:', album);
        await this.fetchAlbums(); // Fetch albums after deleting one
      } catch (error) {
        console.error('Error deleting album:', error);
      }
    },

    // Method to delete a song
    async deleteSong(song) {
      try {
        await client.graphql({
          query: deleteSong,
          variables: {
            input: {
              id: song.id
            }
          }
        });
        console.log('Song deleted:', song);
        await this.fetchSongs(); // Fetch songs after deleting one
      } catch (error) {
        console.error('Error deleting song:', error);
      }
    },

    // Method to select an artist
    selectArtist(artist) {
      this.selectedArtist = artist;
      this.selectedAlbum = null; // Reset selected album
      this.fetchAlbums(); // Fetch albums for the selected artist
    },

    // Method to fetch albums for the selected artist
    async fetchAlbums() {
      try {
        const result = await client.graphql({
          query: listAlbums,
          variables: {
            filter: {
              artistId: { eq: this.selectedArtist.id }
            }
          }
        });
        this.albums = result.data.listAlbums.items;
      } catch (error) {
        console.error('Error fetching albums:', error);
      }
    },

    // Method to select an album
    selectAlbum(album) {
      this.selectedAlbum = album;
      this.fetchSongs(); // Fetch songs for the selected album
    },
    
    // Method to fetch songs for the selected album
    async fetchSongs() {
      try {
        const result = await client.graphql({
          query: listSongs,
          variables: {
            filter: {
              albumId: { eq: this.selectedAlbum.id }
            }
          }
        });
        this.selectedAlbum.songs = result.data.listSongs.items; // Assign fetched songs to selected album
      } catch (error) {
        console.error('Error fetching songs:', error);
      }
    }
  }
};
</script>


<style scoped>
.app {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  background-color: #0e75ab; /* Set the background color */
}

.section {
  flex: 1;
  margin: 20px;
  padding: 20px;
  background-color: #e8eaf7;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.section h2 {
  margin-bottom: 20px;
  font-size: 24px;
}

.list {
  margin-bottom: 20px;
}

.item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  background-color: #ffffff;
  border-radius: 4px;
  margin-bottom: 2px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.item span {
  margin-right: 10px;
}

.form {
  display: flex;
  align-items: center;
}

.form input,
.form select {
  flex: 1;
  margin-right: 10px;
  padding: 8px;
}

.form button {
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.item.selected {
  background-color: lightblue; /* Change the background color for selected items */
}

.logo-container {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100px; /* Adjust width as needed */
  height: auto; /* Allow height to adjust based on image */
  z-index: -1; /* Ensure the logo is behind other content */
}

.logo {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 20%; /* Adjust width as needed */
  opacity: 1; /* Adjust opacity for fading effect */
  animation: fadeInUp 3s ease forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>