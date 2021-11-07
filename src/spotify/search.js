import axios from 'axios'
import store from '@/store/index'

const search = {
  methods: {
    searchData (query) {  
      return axios.get(
        `https://api.spotify.com/v1/search?q=${query}&type=track,artist`, {
            headers: store.getters.getHeaders,
        }).then(res => {
          // console.log(res.data.tracks.items)
          return {
            songs: res.data.tracks.items.map(song => {
              return {
                id: song.id,
                name: song.name,
                albumCover: {
                  small: song.album.images.length > 2 ? song.album.images[2].url : null,
                  medium:  song.album.images.length > 1 ? song.album.images[1].url : null,
                  large: song.album.images.length > 0 ? song.album.images[0].url : null
                },
                artists: song.artists.map(artist => {
                  return {
                    id: artist.id,
                    name: artist.name
                  }
                }),
                url: song.external_urls.spotify,
                duration: song.duration_ms
              }
            }),
            artists: res.data.artists.items.map(artist => {
              return {
                id: artist.id,
                name: artist.name,
                albumCover: {
                  small: artist.images.length > 2 ? artist.images[2].url : null,
                  medium:  artist.images.length > 1 ? artist.images[1].url : null,
                  large: artist.images.length > 0 ? artist.images[0].url : null
                }
              }
            })
          }
        })
        .catch(err => {
          console.log('error ', err.response)
        })
    }
  }
}

export default search