<template>
  <button class="button button-secondary" @click="$emit('click', $event)">
    <slot />
  </button>
</template>

<script>
export default {

};
</script>
