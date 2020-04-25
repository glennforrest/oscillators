export default {
  methods: {
    playNote(frequency) {
      this.$emit('play-note', frequency);
    },

    stopNote(frequency) {
      this.$emit('stop-note', frequency);
    },
  },
}
