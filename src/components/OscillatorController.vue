<template>
  <div class="flex flex-col w-1/2 px-5 mb-10">
    <div class="mb-6 flex justify-between items-center">
      <h2>Oscillator #{{ index + 1 }}</h2>

      <span class="cursor-pointer text-xl hover:text-red-light" @click="removeOscillator">X</span>
    </div>

    <div class="flex flex-col items-start w-full">
      <span class="mb-2">Frequency</span>

      <vue-slider
        v-model="oscillator.frequency"
        :min="20"
        :max="600"
        :dot-options="dotOptions"
        :bg-style="sliderStyle"
        :process-style="sliderStyle"
        @change="updateFrequency"
      />
    </div>

    <div class="flex flex-col items-start w-full mt-4">
      <span class="mb-2">Volume</span>

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
</template>

<script>
import VueSlider from 'vue-slider-component';
import 'vue-slider-component/theme/antd.css';

export default {
  components: {
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
    };
  },

  methods: {
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
