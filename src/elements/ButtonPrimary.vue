<template>
  <button class="text-white button button-primary" @click="$emit('click', $event)">
    <slot />
  </button>
</template>
