import spotifyAuth from '@/js/spotifyAuth/spotify_auth'
import axios from 'axios'
import defaultParams from './defaultParams'

/* eslint-disable no-unused-vars */

const getUserData = {
  methods: {
    getPlaylists (params = defaultParams) {
      return spotifyAuth.then(headers => {
        return axios.get(
          'https://api.spotify.com/v1/me/playlists', {
              params: defaultParams,
              headers: headers,
          }).then(res => {
            const playlistsClean = res.data.items.map(playlist => {
              return {
                id: playlist.id,
                externalUrl: playlist.external_urls.spotify,
                albumCover: playlist.images[0].url,
                title: playlist.name,
                tracksUrl: playlist.tracks.id
              }
            })
            return playlistsClean
          })
      })
    },
    getSongs (params = defaultParams) {
      return spotifyAuth.then(headers => {
        console.log(headers)
        return axios.get(
          'https://api.spotify.com/v1/me/tracks', {
              params: params,
              headers: headers,
          }).then(res => {
            const cleanedData = res.data.items.map(item => {
              return {
                  id: item.track.id,
                  name: item.track.name,
                  artists: item.track.artists.map(artist => {
                    return {
                      id: artist.id,
                      name: artist.name,
                      externalUrl: artist.external_urls.spotify
                    }
                  }),
                  albumCover: {
                    small: item.track.album.images.length > 2 ? item.track.album.images[2].url : null,
                    medium:  item.track.album.images.length > 1 ? item.track.album.images[1].url : null,
                    large: item.track.album.images.length > 0 ? item.track.album.images[0].url : null
                  }
              }
           })
            return cleanedData
          })
          .catch(err => {
            console.log('error: ', err)
          })
      })
    },
  }
}

export default getUserData