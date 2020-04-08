<template>
  <button class="button button-primary" @click="$emit('click', $event)">
    <slot />
  </button>
</template>
