<template>
  <div class="wrapper">
    <div class="audio-wrapper">
      <audio src="" controls class="audio" ref="audio"></audio>
    </div>

    <div class="toolbar">
      <button class="button button--start text-16" ref="start">Start</button>
      <button class="button button--stop text-16" ref="stop">Stop</button>
    </div>
  </div>
</template>

<script scoped>
export default {
  name: 'Audio',
  data () {
    return {
      chunks: [],
      recorder: null,
      audioElement: null,
      startButton: null,
      stopButton: null
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.audioElement = this.$refs.audio
      this.startButton = this.$refs.start
      this.stopButton = this.$refs.stop

      console.log(this.audioElement)
      
      // We'll get the user's audio input here.
      navigator.mediaDevices.getUserMedia({
        audio: true
      }).then(stream => {
        // Create a new MediaRecorder instance, and provide the audio-stream.
        this.recorder = new MediaRecorder(stream)

        // Set the recorder's eventhandlers
        this.recorder.ondataavailable = this.saveChunkToRecording
        this.recorder.onstop = this.processAudio
      })

      // Add event listeners to the start and stop button
      this.startButton.addEventListener('click', this.startRecording)
      this.stopButton.addEventListener('click', this.stopRecording)
    },
    startRecording () {
      this.chunks = []
      this.recorder.start()
    },
    stopRecording () {
      this.recorder.stop()
    },
    saveChunkToRecording (event) {
      this.chunks.push(event.data)
    },
    processAudio () {
      const blob = new Blob(this.chunks, {
        type: 'audio/mp4; codecs=opus'
      })

      const url = URL.createObjectURL(blob)
      this.audioElement.setAttribute('src', url)
      this.$emit('getAudio', blob)
    }
  },
}
</script>

<style lang="scss" scoped>
@import '~@/scss/variables';
@import '~@/scss/base/mixins/rem';

$green: #6ABB5C;
$red: #CC0000;

.wrapper {
  width: 100%;
  padding: 2rem;
}

.audio-wrapper {
  margin: 0 0 2rem 0;
}

.audio {
  width: 100%;
  
  &::-webkit-media-controls-panel {
    background: white;
  }
}

.toolbar {
  text-align: center
}

.button {
  transition: all .3s ease-in-out;
  position: inline-block;
  padding: rem(8px) rem(60px);
  border-radius: 50px;
  background: $light-blue;
  outline: none;
  font-weight: 700;
  color: $white;
  
  &--start:hover {
    background: $green;    
  }
    
  &--stop:hover {
    background: $red;
  }

  &:first-of-type {
    margin-right: rem(16px);
  }
}
</style>