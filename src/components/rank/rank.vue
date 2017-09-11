<template>
  <div class="rank">
    <div class="rank-wrapper">

    </div>
  </div>
</template>

<script>

  export default {
    beforeRouteEnter(to, from, next){
      next(true)
      window.document.location = "js://webview?network=1"
    }
  }
</script>

<style>
.rank{
  position: fixed;
  top: 0;
  bottom: 60px;
  width: 100%;
}
  .rank-wrapper{

  }
</style>
