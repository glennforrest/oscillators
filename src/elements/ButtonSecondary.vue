<template>
  <button class="button button-secondary" @click="$emit('click', $event)">
    <slot />
  </button>
</template>