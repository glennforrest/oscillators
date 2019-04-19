<template>
  <div id="app">
    <div id="nav" class="flex py-8 container">
      <router-link to="/">Home</router-link>
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
      // color: #2c3e50;
      &.router-link-exact-active {
        // color: #42b983;
      }
    }
  }
</style>
