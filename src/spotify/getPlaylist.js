import axios from 'axios'
import store from '@/store/index'
import defaultParams from './defaultParams'

/* eslint-disable no-unused-vars */

const getPlaylist = {
  methods: {
    playlist (id, storeLocation) {
      return axios.get(
        `https://api.spotify.com/v1/playlists/${id}`, {
            headers: store.getters.getHeaders,
        }).then(res => {
          const playlist = res.data
          return {
            id: playlist.id,
            externalUrl: playlist.external_urls.spotify,
            albumCover: playlist.images[0].url,
            title: playlist.name,
            tracksUrl: playlist.tracks.href,
            firstTrack: playlist.tracks.items[0].track.id,
            madeBy: {
              name: playlist.owner.display_name,
              url: playlist.owner.external_urls.spotify
            },
            totalTracks: playlist.tracks.total
          }
        })
        .catch(err => {
          console.log('error ', err.response)
        })
    },
    getPlaylistTracks (playlistId, params = defaultParams) {  
      return axios.get(
        `https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
            params,
            headers: store.getters.getHeaders,
        }).then(res => {
          const playlist = res.data
          return {
            url: playlist.href,
            songs: playlist.items.map(song => {
              return {
                id: song.track.id,
                addedBy: song.added_by.id,
                url: song.added_by.external_urls.spotify,
                name: song.track.name,
                artists: song.track.artists.map(artist => {
                  return {
                    id: artist.id,
                    name: artist.name,
                    url: artist.url
                  }
                }),
                duration: song.track.duration_ms
              }
            })
          }
          // console.log(playlistClean)
          // return playlistClean
        })
        .catch(err => {
          console.log('error ', err.response)
        })
    }
  }
}

export default getPlaylist