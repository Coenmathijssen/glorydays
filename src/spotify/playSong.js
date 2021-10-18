import store from '@/store/index'

const playSong = {
  methods: {
    start (songId) {
      const play = ({
        context_uri,
        playerInstance: {
          _options: { getOAuthToken },
        },
      }) => {
        getOAuthToken((access_token) => {
          fetch(
            `https://api.spotify.com/v1/me/player/play?device_id=${store.state.deviceId}`,
            {
              method: 'PUT',
              body: JSON.stringify({ uris: [context_uri] }),
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${access_token}`,
              }
            }
          )
        })
      }

      play({
        playerInstance: store.state.player,
        context_uri: `spotify:track:${songId}`
      })
    }
  }
}

export default playSong