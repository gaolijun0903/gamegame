<template>
    <div class="search">
搜索
      <search-box :placeholder="placeholder"></search-box>
      <!--TODO-->
    </div>
</template>

<script>
  import searchBox from 'base/search-box/search-box'
  export default {
    data() {
        return {
          placeholder:'搜索游戏'
        }
    },
    beforeRouteEnter(to, from, next){
    	next(true)
    	window.document.location = "js://webview?network=1"
    },
    components:{
      searchBox
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
