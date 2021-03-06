<template>
  <div class="flex flex-col w-full md:w-1/2 px-5 mb-10">
    <div class="px-5 flex justify-between items-center pb-2 border-b-2 border-green-500 border-solid bg-grey-900">
      <h2>
        Oscillator #{{ index + 1 }}
      </h2>

      <span class="cursor-pointer text-xl hover:text-red-300" @click="removeOscillator">
        X
      </span>
    </div>

    <div class="bg-gray-800 flex flex-col p-5">
      <div class="flex flex-col mb-6">
        <span class="mb-3 text-left font-bold">Wave Type</span>

        <wave-types v-model="oscillator.type" />
      </div>

      <div class="flex flex-col items-start w-full">
        <span class="mb-2 font-bold flex justify-between w-full items-end">
          Frequency

          <small
            class="text-xs cursor-pointer transition duration-150 hover:text-green-500"
            @click="toggleFrequencyControl"
          >Toggle control</small>
        </span>

        <transition name="fade" mode="out-in">
          <vue-slider
            v-model="oscillator.frequency"
            :min="0"
            :max="600"
            :dot-options="dotOptions"
            :bg-style="sliderStyle"
            :process-style="sliderStyle"
            @change="updateFrequency"
            v-if="frequencyControl === 'slider'"
          />

          <input v-else
            class="text-black py-2 px-4 w-32 text-center"
            type="number"
            min="0"
            max="600"
            v-model="oscillator.frequency"
            @input="updateFrequency"
          />
        </transition>
      </div>

      <div class="mt-4">
        <div class="flex flex-col">
          <div class="w-full mb-3" v-for="(note, index) in notes" :key="index">
            <h4 class="text-2xl text-left mb-2">{{ note.name }}</h4>

            <div class="flex md:flex-row md:flex-wrap md:-mx-1">
              <div
                v-for="(frequency, frequencyIndex) in note.frequencies"
                :key="`${note.name}-${frequencyIndex}`"
                class="md:px-1 mb-2"
              >
                <button-secondary @click="changeFrequency(frequency)">
                  {{ note.name }}{{ frequencyIndex }}
                </button-secondary>
              </div>
            </div>
          </div>
        </div>
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
  import noteFrequencies from '../data/note-frequencies.json';

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
        frequencyControl: 'slider',
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

        noteFrequencies,
      };
    },

    computed: {
      notes() {
        let notes = [];

        Object.keys(this.noteFrequencies).forEach(note => {
          notes.push({
            name: note,
            frequencies: this.noteFrequencies[note],
          });
        });

        return notes;
      },
    },

    watch: {
      'oscillator.type': {
        handler() {
          this.$emit('changeWaveType');
        },
      },
    },

    methods: {
      changeFrequency(frequency) {
        this.oscillator.frequency = frequency;

        this.$emit('frequencyChange');
      },

      toggleFrequencyControl() {
        if (this.frequencyControl === 'slider') {
          this.frequencyControl = 'input';
        } else {
          this.frequencyControl = 'slider';
        }
      },

      removeOscillator() {
        this.$emit('removeOscillator');
      },

      updateFrequency() {
        this.$emit('frequencyChange');
      },

      updateVolume() {
        this.$emit('volumeChange');
      },
    },
  };
</script>

<style lang="scss">
  .vue-slider {
    width: 100% !important;
  }
</style>
