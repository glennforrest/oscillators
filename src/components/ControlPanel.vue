<template>
  <div class="flex flex-col">
    <div class="flex flex-col md:flex-row justify-between">
      <div class="flex">
        <button-primary @click="start" class="mr-4">
          Start Oscillators
        </button-primary>

        <button-secondary @click="stop">
          Stop Oscillators
        </button-secondary>
      </div>

      <div class="flex mt-4 md:mt-0">
        <button-primary @click="addOscillator">Add Oscillator +</button-primary>
      </div>
    </div>

    <div class="flex flex-wrap mt-16 -mx-5">
      <oscillator-controller
        v-for="(oscillator, index) in oscillators"
        :key="index"
        :index="index"
        :oscillator="oscillator"
        @frequencyChange="updateOscillatorFrequency(oscillator)"
        @volumeChange="updateOscillatorVolume(oscillator)"
        @removeOscillator="removeOscillator(oscillator, index)"
        @changeWaveType="changeWaveType(oscillator)"
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
      playing: false,
      oscillators: [
        {
          type: 'Sine',
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
    addOscillator() {
      this.oscillators.push({
        type: 'Sine',
        frequency: 160,
        volume: 0.15,
        instance: null,
        gainNode: null,
      });

      // If we're making noise, instantiate this new oscillator
      if (this.playing) {
        this.createOscillator(this.oscillators[this.oscillators.length - 1]);
      }
    },

    changeWaveType(oscillator) {
      if (oscillator.instance === null) {
        return;
      }

      oscillator.instance.type = oscillator.type.toLowerCase();
    },

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

    removeOscillator(oscillator, index) {
      // Stop it playing if it is already
      if (oscillator.instance !== null) {
        this.stopOscillator(oscillator);
      }

      this.oscillators.splice(index, 1);
    },

    start() {
      if (! this.audioInitiated) {
        this.initiateAudioContext();
      }

      this.playing = true;

      this.oscillators.filter(oscillator => oscillator.instance === null)
        .forEach(oscillator => this.createOscillator(oscillator));
    },

    stop() {
      this.connectedOscillators.forEach(oscillator => this.stopOscillator(oscillator));

      this.playing = false;
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
      oscillator.instance.frequency.setTargetAtTime(
        oscillator.frequency,
        this.context.currentTime,
        0.015
      );
    },

    updateOscillatorVolume(oscillator) {
      // Don't update anything if there isn't an instance running
      if (oscillator.instance === null) {
        return;
      }

      // Update the volume on the gain node.
      oscillator.gainNode.gain.setTargetAtTime(
        oscillator.volume,
        this.context.currentTime,
        0.015
      );
    }
  },
};
</script>
