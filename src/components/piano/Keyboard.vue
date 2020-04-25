<template>
  <div class="py-5 px-8 bg-blue-900 rounded-lg">
    <div class="flex flex-col w-64 space-y-2">
      <div class="flex justify-around w-full">
        <div class="flex space-x-1">
          <key colour="black" :note="getNoteByName('Db')" :key-code="87" @play-note="playNote" @stop-note="stopNote" />
          <key colour="black" :note="getNoteByName('Eb')" :key-code="69" @play-note="playNote" @stop-note="stopNote" />
        </div>

        <div class="flex space-x-1">
          <key colour="black" :note="getNoteByName('Gb')" :key-code="84" @play-note="playNote" @stop-note="stopNote" />
          <key colour="black" :note="getNoteByName('Ab')" :key-code="89" @play-note="playNote" @stop-note="stopNote" />
          <key colour="black" :note="getNoteByName('Bb')" :key-code="85" @play-note="playNote" @stop-note="stopNote" />
        </div>
      </div>

      <div class="flex w-full space-x-1">
        <key colour="white" :note="getNoteByName('C')" :key-code="65" @play-note="playNote" @stop-note="stopNote" />
        <key colour="white" :note="getNoteByName('D')" :key-code="83" @play-note="playNote" @stop-note="stopNote" />
        <key colour="white" :note="getNoteByName('E')" :key-code="68" @play-note="playNote" @stop-note="stopNote" />
        <key colour="white" :note="getNoteByName('F')" :key-code="70" @play-note="playNote" @stop-note="stopNote" />
        <key colour="white" :note="getNoteByName('G')" :key-code="71" @play-note="playNote" @stop-note="stopNote" />
        <key colour="white" :note="getNoteByName('A')" :key-code="72" @play-note="playNote" @stop-note="stopNote" />
        <key colour="white" :note="getNoteByName('B')" :key-code="74" @play-note="playNote" @stop-note="stopNote" />
      </div>
    </div>
  </div>
</template>

<script>
  import noteFrequencies from '@/data/note-frequencies.json';
  import Key from './Key';

  export default {
    components: {
      Key,
    },

    data() {
      return {
        volume: 0.15,
        noteFrequencies,
        context: null,
        gainNode: null,
        oscillators: [],
        octave: 4,
      }
    },

    computed: {
      notes() {
        let notes = [];

        Object.keys(this.noteFrequencies)
          .forEach(note => {
            notes.push({
              noteName: note,
              frequency: this.noteFrequencies[note][this.octave],
            });
          });

        return notes;
      },
    },

    mounted() {
      this.context = new window.AudioContext();

      this.setupGainNode();
    },

    methods: {
      getNoteByName(noteName) {
        return this.notes.find(note => note.noteName == noteName);
      },

      setupGainNode() {
        const gainNode = this.context.createGain();

        gainNode.connect(this.context.destination);
        gainNode.gain.value = this.volume;

        this.gainNode = gainNode;
      },

      playNote(frequency) {
        let osc = this.context.createOscillator();

        osc.gainNode = this.createGainNode();

        // Connect to the gain node
        osc.connect(osc.gainNode);

        //TODO make this configurable
        let type = 'sine';

        osc.type = type;
        osc.frequency.value = frequency;

        // Set initial value to 0
        osc.gainNode.gain.value = 0;

        // Start up the oscillator
        osc.start();

        // Introduce volume to gain node
        osc.gainNode.gain.setTargetAtTime(this.volume, this.context.currentTime, 0.0015);

        this.oscillators[frequency] = osc;
      },

      createGainNode() {
        const gainNode = this.context.createGain();

        gainNode.connect(this.context.destination);

        return gainNode;
      },

      stopNote(frequency) {
        let osc = this.oscillators[frequency]

        if (! osc) {
          return;
        }

        osc.gainNode.gain.setTargetAtTime(0, this.context.currentTime, 0.0015);
      }
    },
  }
</script>
