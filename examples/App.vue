<template>
  <div id="app">
    <my-rate style="height: 100px;width: 500px;" :value="5"/>
  </div>
</template>

<script>
  require('../lib/MyRate/style.css')
export default {
  name: 'App',
  components: {
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
