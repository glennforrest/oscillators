<template>
  <div class="flex flex-col">
    <div class="flex">
      <button-primary @click="start" class="mr-4">
        Start Oscillator
      </button-primary>

      <button-secondary @click="stop">
        Stop Oscillator
      </button-secondary>
    </div>

    <div class="flex mt-16">
      <oscillator-controller
        v-for="(oscillator, index) in oscillators"
        :key="index"
        :oscillator="oscillator"
        @frequencyChange="updateOscillatorFrequency(oscillator)"
      />
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
          volume: 0.15,
          instance: null,
          gainNode: null,
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
    createGainNode(volume) {
      const gainNode = this.context.createGain();

      gainNode.connect(this.context.destination);

      return gainNode;
    },

    createOscillator(oscillator) {
      const osc = oscillator.instance = this.context.createOscillator();

      oscillator.gainNode = this.createGainNode();

      // Connect to the gain node
      osc.connect(oscillator.gainNode);

      // Set wave type
      osc.type = oscillator.type;

      // Set frequency
      osc.frequency.value = oscillator.frequency;

      // Set initial value to 0
      oscillator.gainNode.gain.value = 0;

      // Start up the oscillator
      osc.start();

      // Introduce volume to gain node
      oscillator.gainNode.gain.setTargetAtTime(oscillator.volume, this.context.currentTime, 0.015);
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
      // Removes the click when stopping the oscillator
      oscillator.gainNode.gain.setTargetAtTime(0, this.context.currentTime, 0.015);

      // Reset the instance so that we can create another one
      oscillator.instance = null;
      oscillator.gainNode = null
    },

    updateOscillatorFrequency(oscillator) {
      // Don't update anything if there isn't an instance running
      if (oscillator.instance === null) {
        return;
      }

      // Set new frequency
      oscillator.instance.frequency.setValueAtTime(
        oscillator.frequency,
        this.context.currentTime
      );
    }
  },
};
</script>
