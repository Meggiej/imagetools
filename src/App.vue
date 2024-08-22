<template>
  <div id="app">
    <NavMenu/>
  </div>
</template>

<script>
import NavMenu from '@/components/NavMenu.vue'

export default {
  name: 'App',
  components: {
    // Header,
    NavMenu
  },
};
</script>

<style>
#app {
  flex-direction: column;
  display: flex;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  height: 100%; /* 100% 的视口高度 */
  margin: 0;
  padding: 0;

}

html {

  background-color: #f2f2f2; /* 浅灰色背景 */
  margin: 0;
  padding: 0;
  //overflow-x: hidden;
}
html,body {
      margin: 0;
      height: 100%;
    }

.el-footer {
  margin-top: auto;
}

</style>

