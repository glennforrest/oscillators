<template>
  <div class="flex flex-row justify-around mb-2">
    <div
      v-for="(waveType, index) in waveTypes"
      :key="index"
      class="cursor-pointer hover:opacity-75"
      @click="setWaveType(waveType)"
    >
      <div class="flex flex-col">
        <component class="-my-2 h-16 w-16" :is="getWaveIcon(waveType)" />

        <span>{{ waveType }}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import SineWave from '../assets/icons/sine-wave.svg';
  import TriangleWave from '../assets/icons/triangle-wave.svg';
  import SawtoothWave from '../assets/icons/sawtooth-wave.svg';
  import SquareWave from '../assets/icons/square-wave.svg';

  export default {
    components: {
      SineWave,
      TriangleWave,
      SawtoothWave,
      SquareWave,
    },

    data() {
      return {
        waveTypes: [
          'Sine',
          'Sawtooth',
          'Triangle',
          'Square',
        ],
      }
    },

    methods: {
      getWaveIcon(type) {
        return `${type}Wave`;
      },

      setWaveType(type) {
        alert(type);
      }
    }
  };
</script>