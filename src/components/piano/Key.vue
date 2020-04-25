<template>
  <div @mousedown="clickPlayNote" @mouseup="clickStopNote" @mouseleave="clickStopNote" class="key group flex items-center justify-center text-center cursor-pointer shadow-2xl rounded-lg shadow-xl transition duration-75 hover:shadow border-b-4 hover:border-b-2" :class="keyClass">
    <span class="text-sm select-none opacity-0 transition duration-500 group-hover:opacity-100">
      {{ note.noteName }}
    </span>
  </div>
</template>

<script>
  export default {
    props: {
      colour: {
        type: String,
        required: true,
      },

      keyCode: {
        type: Number,
        required: true,
      },

      note: {
        required: true,
        validator: function (value) {
          if (typeof value != 'object') {
            return false;
          }

          // Check that we have a note name and frequency
          return value.hasOwnProperty('noteName') && value.hasOwnProperty('frequency');
        }
      },
    },

    data() {
      return {
        playing: false,
      }
    },

    computed: {
      keyClass() {
        return {
          'bg-gray-300 hover:bg-gray-400 border-gray-600 text-black': this.colour == 'white',
          'bg-gray-900 hover:bg-gray-1000 border-gray-1100 text-white': this.colour == 'black',
          'bg-gray-500': this.colour == 'white' && this.playing,
          'bg-gray-1100': this.colour == 'black' && this.playing,
        };
      },
    },

    watch: {
      playing(isPlaying) {
        if (isPlaying) {
          this.playNote();

          return;
        }

        this.stopNote();
      },
    },

    mounted() {
      this.setupKeyListener();
    },

    methods: {
      playNote() {
        this.$emit('play-note', this.note.frequency);
      },

      stopNote() {
        this.$emit('stop-note', this.note.frequency);
      },

      clickPlayNote() {
        this.playing = true;
      },

      clickStopNote() {
        this.playing = false;
      },

      setupKeyListener() {
        window.addEventListener('keydown', e => {
          //TODO - Look into using this https://github.com/jeremyckahn/keydrown
          // if latency becomes an issue?

          if (e.keyCode == this.keyCode & ! this.playing) {
            this.playing = true;
          }
        });

        window.addEventListener('keyup', e => {
          if (e.keyCode == this.keyCode) {
            this.playing = false;
          }
        });
      }
    }
  }
</script>

<style>
  .key {
    height: 70px;
    width: 33px;
    transition: border-width 0.1s ease, color .75s ease;
  }
</style>
