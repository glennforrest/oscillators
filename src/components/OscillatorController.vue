<template>
  <div class="flex flex-col w-1/2 px-5 mb-10">
    <div class="px-5 flex justify-between items-center pb-2 border-b-2 border-green border-solid bg-black">
      <h2>
        Oscillator #{{ index + 1 }}
      </h2>

      <span class="cursor-pointer text-xl hover:text-red-light" @click="removeOscillator">
        X
      </span>
    </div>

    <div class="bg-grey-darkest flex flex-col p-5">
      <div class="flex flex-col mb-6">
        <span class="mb-3 text-left font-bold">Wave Type</span>

        <div class="flex flex-row">
          <radio
            v-for="(waveType, index) in waveTypes"
            class="mr-6"
            :key="index"
            :value="waveType"
            v-model="oscillator.type"
            @input="changeWaveType"
          >
            {{ waveType }}
          </radio>
        </div>
      </div>

      <div class="flex flex-col items-start w-full">
        <span class="mb-2 font-bold">Frequency</span>

        <vue-slider
          v-model="oscillator.frequency"
          :min="0"
          :max="600"
          :dot-options="dotOptions"
          :bg-style="sliderStyle"
          :process-style="sliderStyle"
          @change="updateFrequency"
        />
      </div>

      <div class="flex flex-col items-start w-full mt-4">
        <span class="mb-2 font-bold">Volume</span>

        <vue-slider
          v-model="oscillator.volume"
          :min="0"
          :max="1"
          :interval="0.01"
          :dot-options="dotOptions"
          :bg-style="sliderStyle"
          :process-style="sliderStyle"
          @change="updateVolume"
        />
      </div>
    </div>
  </div>
</template>

<script>
import VueSlider from 'vue-slider-component';
import 'vue-slider-component/theme/antd.css';

import { Radio } from 'vue-checkbox-radio';

export default {
  components: {
    Radio,
    VueSlider,
  },

  props: {
    index: {
      required: true,
      type: Number,
    },

    oscillator: {
      required: true,
      type: Object,
    },
  },

  data() {
    return {
      dotOptions: {
        style: {
          borderColor: '#51d88a',
        },

        focusStyle: {
          boxShadow: '0 0 0 5px rgba(81, 216, 138, 0.2)',
        },
      },

      sliderStyle: {
        background: '#38c172',
      },

      waveTypes: [
        'sine',
        'sawtooth',
        'triangle',
        'square',
      ],
    };
  },

  methods: {
    changeWaveType() {
      this.$emit('changeWaveType');
    },

    removeOscillator() {
      this.$emit('removeOscillator');
    },

    updateFrequency(val) {
      this.$emit('frequencyChange');
    },

    updateVolume(val) {
      this.$emit('volumeChange');
    },
  },
}
</script>

<style scoped lang="scss">
.vue-slider {
  width: 100% !important;
}
</style>

