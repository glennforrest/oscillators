<template>
  <div class="flex flex-col w-full">
    <div class="flex flex-col items-start w-full">
      <span class="mb-2">Frequency</span>

      <vue-slider
        v-model="oscillator.frequency"
        :min="0"
        :max="880"
        :dot-options="dotOptions"
        :bg-style="sliderStyle"
        :process-style="sliderStyle"
        @change="updateFrequency"
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
    updateFrequency(val) {
      this.$emit('frequencyChange');
    },
  },
}
</script>

<style scoped lang="scss">
.vue-slider {
  width: 100% !important;
}
</style>
