<template>
  <div class="flex">
    <div class="flex">
      <button-primary @click="start" class="mr-4">
        Start Oscillator
      </button-primary>

      <button-secondary @click="stop">
        Stop Oscillator
      </button-secondary>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      context: null,
      audioInitiated: false,
      oscillators: [
        {
          type: 'sine',
          frequency: 160,
          instance: null,
          volume: 0.15,
        },
      ],
    };
  },

  computed: {
    connectedOscillators() {
      return this.oscillators.filter(oscillator => oscillator.instance != null);
    },
  },

  mounted() {
    this.context = new window.AudioContext();
  },

  methods: {
    createGain(volume) {
      const gain = this.context.createGain();

      gain.connect(this.context.destination);
      gain.gain.value = volume;

      return gain;
    },

    createOscillator(oscillator) {
      const osc = oscillator.instance = this.context.createOscillator();

      // Connect to the gain node
      osc.connect(
        this.createGain(oscillator.volume)
      );

      // Set wave type
      osc.type = oscillator.type;

      // Set frequency
      osc.frequency.value = oscillator.frequency;

      // Start it up
      osc.start();
    },

    initiateAudioContext() {
      this.context.resume();
    },

    start() {
      if (! this.audioInitiated) {
        this.initiateAudioContext();
      }

      this.oscillators.filter(oscillator => oscillator.instance === null)
        .forEach(oscillator => this.createOscillator(oscillator));
    },

    stop() {
      this.connectedOscillators.forEach(oscillator => this.stopOscillator(oscillator));
    },

    stopOscillator(oscillator) {
      // Stop the oscillator from generating output.
      oscillator.instance.stop();

      // Reset the instance so that we can create another one
      oscillator.instance = null;
    },
  },
};
</script>
