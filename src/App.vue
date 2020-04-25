<template>
  <div id="app">
    <div id="nav" class="text-white flex py-8 space-x-4 container">
      <router-link to="/">Home</router-link>
      <router-link to="/keyboard">Keyboard</router-link>
    </div>

    <router-view class="container" />
  </div>
</template>

<style lang="scss">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  #nav {
    a {
      font-weight: bold;

      &.router-link-exact-active {
        color: theme('colors.green.500')
      }
    }
  }
</style>
