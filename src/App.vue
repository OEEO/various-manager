<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
  $mainFontColor: #2c3e50;
  #app {
    font-family: 'Avenir', Microsoft YaHei ,Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: $mainFontColor;
    min-width: 600px;
    max-width: 1200px;
    margin: auto;
  }
</style>
