<template>
    <div class="search">
搜索
      <search-box :placeholder="placeholder"></search-box>
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
    components:{
      searchBox
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
