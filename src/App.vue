<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  position: relative;
  min-height: 800px;
}
body {
  margin:0;
  padding:0;background: #655C5C 0% 0% no-repeat padding-box;
  opacity: 1;
}
html, body {
    height: 100%;
    overflow: hidden;
}
</style>
