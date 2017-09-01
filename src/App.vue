<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <footer-tab></footer-tab>
  </div>
</template>

<script>
import footerTab from 'components/footer-tab/footer-tab.vue'

export default {
  components:{
    footerTab
  }
}
</script>

<style>

</style>
