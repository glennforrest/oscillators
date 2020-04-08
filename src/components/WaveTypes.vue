<template>
  <div class="flex flex-row justify-around mb-2">
    <div
      v-for="(waveType, index) in waveTypes"
      :key="index"
      class="flex flex-col p-2 rounded-sm cursor-pointer transition duration-300 hover:bg-gray-700 hover:text-green-500"
      :class="activeClass(waveType)"
      @click="setWaveType(waveType)"
    >
      <component class="-my-2 h-16 w-16" :is="getWaveIcon(waveType)" />

      {{ waveType }}
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

    props: {
      value: {},
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
      activeClass(type) {
        return {
          'bg-gray-700 text-green-500': type === this.value
        }
      },

      getWaveIcon(type) {
        return `${type}Wave`;
      },

      setWaveType(type) {
        this.$emit('input', type)
      }
    }
  };
</script>